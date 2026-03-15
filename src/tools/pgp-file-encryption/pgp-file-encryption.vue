<script setup lang="ts">
import * as openpgp from 'openpgp';

const message = useMessage();

const file = ref<File | null>(null);
const publicKeyArmored = ref('');
const privateKeyArmored = ref('');
const passphrase = ref('');

const error = ref('');

const encryptedBlob = ref<Blob | null>(null);
const decryptedBlob = ref<Blob | null>(null);

const encryptProgress = ref(0);
const decryptProgress = ref(0);

const loadingEncrypt = ref(false);
const loadingDecrypt = ref(false);

function onUpload(uploadedFile: File) {
  file.value = uploadedFile ?? null;
  encryptedBlob.value = null;
  decryptedBlob.value = null;
  encryptProgress.value = 0;
  decryptProgress.value = 0;
}

async function encryptStream() {
  if (!file.value) {
    return message.error('Select a file first.');
  }
  if (!publicKeyArmored.value.trim()) {
    return message.error('Public key required.');
  }

  loadingEncrypt.value = true;
  encryptProgress.value = 0;
  encryptedBlob.value = null;
  error.value = '';

  try {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored.value });

    const fileStream = file.value.stream(); // native browser stream
    const messageObj = await openpgp.createMessage({ binary: fileStream });

    const encryptedStream = await openpgp.encrypt({
      message: messageObj,
      encryptionKeys: publicKey,
      format: 'binary',
    });

    const reader = encryptedStream.getReader();
    const chunks: Uint8Array[] = [];
    let processed = 0;
    const total = file.value.size;

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      chunks.push(value);
      processed += value.length;
      encryptProgress.value = Math.round((processed / total) * 100);
    }

    encryptedBlob.value = new Blob(chunks, { type: 'application/octet-stream' });
    message.success('File encrypted.');
  }
  catch (err: any) {
    error.value = err.toString();
    message.error('Encryption failed.');
  }
  finally {
    loadingEncrypt.value = false;
  }
}

async function decryptStream() {
  if (!file.value && !encryptedBlob.value) {
    return message.error('Select an encrypted file first.');
  }

  if (!privateKeyArmored.value.trim()) {
    return message.error('Private key required.');
  }

  loadingDecrypt.value = true;
  decryptProgress.value = 0;
  decryptedBlob.value = null;
  error.value = '';

  try {
    const privateKey = await openpgp.readPrivateKey({
      armoredKey: privateKeyArmored.value,
    });

    const unlockedKey = passphrase.value
      ? await openpgp.decryptKey({
        privateKey,
        passphrase: passphrase.value,
      })
      : privateKey;

    const source = encryptedBlob.value ?? file.value!;
    const encryptedStream = source.stream();

    const messageObj = await openpgp.readMessage({
      binaryMessage: encryptedStream,
    });

    const { data: decryptedStream } = await openpgp.decrypt({
      message: messageObj,
      decryptionKeys: unlockedKey,
      format: 'binary',
    });

    const reader = decryptedStream.getReader();
    const chunks: Uint8Array[] = [];
    let processed = 0;
    const total = source.size;

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      chunks.push(value);
      processed += value.length;
      decryptProgress.value = Math.round((processed / total) * 100);
    }

    decryptedBlob.value = new Blob(chunks, { type: 'application/octet-stream' });
    message.success('File decrypted.');
  }
  catch (err: any) {
    error.value = err.toString();
    message.error('Decryption failed.');
  }
  finally {
    loadingDecrypt.value = false;
  }
}

function downloadBlob(blob: Blob | null, filename: string) {
  if (!blob) {
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div>
    <NCard title="1. Select a file" mb-1>
      <c-file-upload
        title="Drag and drop a file or click to select"
        mb-1
        @file-upload="onUpload"
      />
      <NSpace v-if="file" justify="center">
        <NText>Selected file:</NText>
        <NText strong>
          {{ file?.name }}
        </NText>
      </NSpace>
    </NCard>

    <NCard title="2. Public key (for encryption)" mb-1>
      <c-input-text v-model:value="publicKeyArmored" multiline rows="6" />
    </NCard>

    <NCard title="3. Private key + passphrase (for decryption)">
      <c-input-text v-model:value="privateKeyArmored" multiline rows="6" mb-1 />
      <NFormItem label="Passphrase:" label-placement="left">
        <NInput v-model:value="passphrase" type="password" show-password-on="click" placeholder="Passphrase" />
      </NFormItem>
    </NCard>

    <!-- Actions -->
    <NSpace justify="center" mb-1>
      <NButton :disabled="!file || !publicKeyArmored" type="primary" :loading="loadingEncrypt" mr-2 @click="encryptStream">
        Encrypt (stream)
      </NButton>

      <NButton :disabled="!file || !privateKeyArmored" type="primary" :loading="loadingDecrypt" @click="decryptStream">
        Decrypt (stream)
      </NButton>
    </NSpace>

    <!-- Progress -->
    <div v-if="loadingEncrypt" mb-1 text-center>
      <NText>Encrypting…</NText>
      <NProgress type="line" :percentage="encryptProgress" />
    </div>

    <div v-if="loadingDecrypt" mb-1 text-center>
      <NText>Decrypting…</NText>
      <NProgress type="line" :percentage="decryptProgress" />
    </div>

    <c-alert v-if="error" mb-1>
      {{ error }}
    </c-alert>

    <div v-if="encryptedBlob">
      <NAlert type="success" mb-1>
        Encrypted file ready.
      </NAlert>
      <NSpace justify="center">
        <NButton size="small" @click="downloadBlob(encryptedBlob, `${file?.name || 'file'}.pgp`)">
          Download encrypted
        </NButton>
      </NSpace>
    </div>

    <div v-if="decryptedBlob">
      <NAlert type="success" mb-1>
        Decrypted file ready.
      </NAlert>
      <NSpace justify="center">
        <NButton size="small" @click="downloadBlob(decryptedBlob, `decrypted-${((file?.name || 'file').replace(/\.pgp$/, ''))}`)">
          Download decrypted
        </NButton>
      </NSpace>
    </div>
  </div>
</template>
