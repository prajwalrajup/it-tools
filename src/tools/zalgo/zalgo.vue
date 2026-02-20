<script setup lang="ts">
import { useCopy } from '@/composable/copy';
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { lunicode } from '@/utils/lunicode';

const textInput = ref('');
const intensity = useQueryParamOrStorage({ name: 'intensity', storageName: 'zalgo:i', defaultValue: 8 });
watch(intensity, () => {
  if (textInput.value) {
    doZalgo();
  }
});
const zalgoOutput = ref('');
function doZalgo() {
  lunicode.tools.creepify.options.maxHeight = intensity.value;
  zalgoOutput.value = lunicode.tools.creepify.encode(textInput.value);
}
const { copy: copyZalgoOutput } = useCopy({ source: zalgoOutput, text: 'Zalgo text copied!' });

const zalgoInput = ref('');
const textOutput = ref('');
function unZalgo() {
  textOutput.value = lunicode.tools.creepify.decode(zalgoInput.value);
}
</script>

<template>
  <c-card title="Zalgo Text Generation">
    <c-input-text
      v-model:value="textInput"
      multiline
      placeholder="Put your string here..."
      rows="5"
      label="Text to decorate with Zalgo"
      raw-text
      mb-2
    />

    <n-form-item label="Intensity:" label-placement="left" mb-3>
      <NSlider v-model:value="intensity" :min="1" :max="300" :step="1" />
    </n-form-item>

    <n-space justify="center" mb-2>
      <n-button
        type="primary"
        @click="doZalgo"
      >
        Generate
      </n-button>
    </n-space>

    <div v-if="zalgoOutput">
      <n-card title="Zalgo text" mb-2>
        <div :style="{ lineHeight: intensity / 3, textAlign: 'center' }">
          {{ zalgoOutput }}
        </div>
      </n-card>

      <div flex justify-center>
        <c-button @click="copyZalgoOutput()">
          Copy
        </c-button>
      </div>
    </div>
  </c-card>

  <c-card title="Zalgo cleaner">
    <c-input-text
      v-model:value="zalgoInput"
      multiline
      placeholder="Put zalgo text to clean here..."
      rows="5"
      label="Zalgo text to clean"
      mb-5
    />

    <n-space justify="center" mb-2>
      <n-button
        type="primary"
        @click="unZalgo"
      >
        Clean
      </n-button>
    </n-space>

    <TextareaCopyable
      v-if="textOutput"
      v-model:value="textOutput"
      label="Cleaned text"
      placeholder="Clean zalgo text will appear here..."
      mb-5
    />
  </c-card>
</template>
