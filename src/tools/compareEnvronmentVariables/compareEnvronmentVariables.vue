<template>
  <div class="compare-env-root" flex flex-col gap-4>
    <div flex gap-4>
      <c-card flex-1 title="File 1">
        <c-file-upload title="Drag and drop your first .env file here, or click to select" @file-upload="onFile1Upload" />
        <div v-if="file1Name" mt-2 text-sm op-70>
          {{ file1Name }}
        </div>
        <n-divider>or paste content directly</n-divider>
        <c-input-text
          v-model:value="file1Content"
          label="File 1 content"
          placeholder="Paste your YAML / env content here..."
          multiline
          rows="6"
          raw-text
        />
      </c-card>

      <c-card flex-1 title="File 2">
        <c-file-upload title="Drag and drop your second .env file here, or click to select" @file-upload="onFile2Upload" />
        <div v-if="file2Name" mt-2 text-sm op-70>
          {{ file2Name }}
        </div>
        <n-divider>or paste content directly</n-divider>
        <c-input-text
          v-model:value="file2Content"
          label="File 2 content"
          placeholder="Paste your YAML / env content here..."
          multiline
          rows="6"
          raw-text
        />
      </c-card>
    </div>

    <div flex justify-center>
      <c-button type="primary" :disabled="!file1Content || !file2Content" @click="onSubmit">
        Compare
      </c-button>
    </div>

    <div v-if="hasResults" flex flex-col gap-4>
      <c-card v-if="file1Missing" title="Only preset in File 1">
        <c-markdown :markdown="file1MissingMd" />
      </c-card>

      <c-card v-if="file2Missing" title="Only preset in File 2">
        <c-markdown :markdown="file2MissingMd" />
      </c-card>

      <c-card v-if="keysWithDifferentValues" title="Keys with different values">
        <c-markdown :markdown="diffKeysMd" />
      </c-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const file1Name = ref('');
const file2Name = ref('');
const file1Content = ref('');
const file2Content = ref('');
const loading = ref(false);
const file1Missing = ref('');
const file2Missing = ref('');
const keysWithDifferentValues = ref('');
const hasResults = ref(false);

const file1MissingMd = computed(() => file1Missing.value ? `\`\`\`\n${decodeURIComponent(escape(atob(file1Missing.value)))}\n\`\`\`` : '');
const file2MissingMd = computed(() => file2Missing.value ? `\`\`\`\n${decodeURIComponent(escape(atob(file2Missing.value)))}\n\`\`\`` : '');
const diffKeysMd = computed(() => keysWithDifferentValues.value ? `\`\`\`\n${decodeURIComponent(escape(atob(keysWithDifferentValues.value)))}\n\`\`\`` : '');

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function onFile1Upload(file: File) {
  file1Name.value = file.name;
  file1Content.value = await readFileAsText(file);
}

async function onFile2Upload(file: File) {
  file2Name.value = file.name;
  file2Content.value = await readFileAsText(file);
}

async function onSubmit() {
  if (!file1Content.value || !file2Content.value) {
    return;
  }

  loading.value = true;

  try {
    const response = await fetch('https://n8n.tools.lendinglabs.io/webhook/7b6b536c-8e22-4e91-8617-1dc7c9bbd058', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          { fileName: 'file1', yamlString: btoa(unescape(encodeURIComponent(file1Content.value))) },
          { fileName: 'file2', yamlString: btoa(unescape(encodeURIComponent(file2Content.value))) },
        ],
        encoded: true,
      }),
    });

    const result = await response.json();
    file1Missing.value = result.file1missing ?? '';
    file2Missing.value = result.file2missing ?? '';
    keysWithDifferentValues.value = result.keysWithDifferentValues ?? '';
    hasResults.value = true;
  }
  catch (e) {
    console.error('Compare failed:', e);
  }
  finally {
    loading.value = false;
  }
}
</script>

<style lang="less">
.tool-content > .compare-env-root {
  flex: 0 1 1200px;
}
</style>
