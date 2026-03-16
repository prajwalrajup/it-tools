<script setup lang="ts">
import Jasypt from 'jasypt';

const mode = ref<'encrypt' | 'decrypt'>('encrypt');
const password = ref('');
const inputText = ref('');
const outputRaw = ref('');
const error = ref('');

const outputEncSyntax = computed(() =>
  outputRaw.value ? `ENC(${outputRaw.value})` : '',
);

const isEncryptMode = computed(() => mode.value === 'encrypt');

function run() {
  error.value = '';
  try {
    const jasypt = new Jasypt();
    jasypt.setPassword(password.value);

    if (isEncryptMode.value) {
      outputRaw.value = jasypt.encrypt(inputText.value);
    }
    else {
      outputRaw.value = jasypt.decrypt(inputText.value.trim().replace(/^ENC\(|\)$/g, ''));
    }
  }
  catch (err: any) {
    outputRaw.value = '';
    error.value = err.toString();
  }
}
</script>

<template>
  <div>
    <NForm label-placement="left" label-width="160px">
      <NFormItem label="Mode:">
        <NRadioGroup v-model:value="mode" size="small">
          <NRadioButton value="encrypt">
            Encrypt
          </NRadioButton>
          <NRadioButton value="decrypt">
            Decrypt
          </NRadioButton>
        </NRadioGroup>
      </NFormItem>

      <NFormItem label="Password (Secret Key):">
        <NInput
          v-model:value="password"
          type="password"
          show-password-on="click"
          placeholder="Enter Jasypt password (salt / secret key)"
        />
      </NFormItem>

      <NFormItem :label="isEncryptMode ? 'Plain Text:' : 'Jasypt Encrypted String:'">
        <NInput
          v-model:value="inputText"
          type="textarea"
          rows="6"
          :placeholder="isEncryptMode
            ? 'Text to encrypt (e.g. DB password)'
            : 'Encrypted value (e.g. ENC(...)) or raw Jasypt string'"
        />
      </NFormItem>

      <NSpace justify="center" mb-2>
        <NButton type="primary" :disabled="!password || !inputText" @click="run">
          {{ isEncryptMode ? 'Encrypt' : 'Decrypt' }}
        </NButton>
      </NSpace>

      <c-alert v-if="error" mb-1>
        {{ error }}
      </c-alert>

      <NCard v-if="outputRaw" title="Results">
        <input-copyable label="Decoded:" label-position="left" :value="outputRaw" mb-1 />
        <input-copyable v-if="isEncryptMode" label="Raw:" label-position="left" :value="outputRaw" mb-1 />
        <input-copyable v-if="isEncryptMode" label="ENC Form:" label-position="left" :value="outputEncSyntax" />
      </NCard>
    </NForm>
  </div>
</template>
