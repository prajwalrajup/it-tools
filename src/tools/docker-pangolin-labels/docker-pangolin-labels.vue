<script setup lang="ts">
import yaml from 'yaml';
import { blueprintToLabels, extractPangolinLabelsFromCompose, pangolinLabelsToBlueprint } from './docker-pangolin-labels.service';

const composeInput = ref('');
const blueprintOutput = ref('');

const blueprintInput = ref('');
const labelsOutput = ref('');
const labelsAsArray = ref(true);

const error = ref<string | null>(null);

function convertComposeToBlueprint() {
  error.value = null;
  blueprintOutput.value = '';

  try {
    const compose = yaml.parse(composeInput.value) as any;
    if (!compose?.services) {
      throw new Error('Invalid docker-compose.yml');
    }

    const labels = extractPangolinLabelsFromCompose(compose);
    const blueprint = pangolinLabelsToBlueprint(labels);

    blueprintOutput.value = yaml.stringify(blueprint);
  }
  catch (err: any) {
    error.value = err.toString();
  }
}

/* -----------------------------
   BLUEPRINT → LABELS
------------------------------ */
function convertBlueprintToLabels() {
  error.value = null;
  labelsOutput.value = '';

  try {
    const blueprint = yaml.parse(blueprintInput.value) as any;
    if (!blueprint || typeof blueprint !== 'object') {
      throw new Error('Invalid blueprint YAML');
    }

    const labels = blueprintToLabels(blueprint, labelsAsArray.value ? 'array' : 'object');

    labelsOutput.value = yaml.stringify(labels);
  }
  catch (err: any) {
    error.value = err?.message ?? String(err);
  }
}
</script>

<template>
  <div>
    <n-tabs type="segment">
      <!-- COMPOSE → BLUEPRINT -->
      <n-tab-pane name="compose-to-blueprint" tab="Compose → Blueprint">
        <c-input-text
          v-model:value="composeInput"
          label="Docker Compose YAML:"
          multiline
          rows="10"
          placeholder="Paste full docker-compose.yml here…"
          mb-2
        />

        <n-space justify="center" mb-2>
          <n-button type="primary" @click="convertComposeToBlueprint">
            Extract Pangolin Blueprint
          </n-button>
        </n-space>

        <n-alert v-if="error" type="error" :show-icon="true">
          {{ error }}
        </n-alert>

        <textarea-copyable
          v-if="blueprintOutput"
          v-model:value="blueprintOutput"
          label="Generated Blueprint:"
          language="yaml"
          readonly
          placeholder="Blueprint YAML will appear here…"
        />
      </n-tab-pane>

      <!-- BLUEPRINT → LABELS -->
      <n-tab-pane name="blueprint-to-labels" tab="Blueprint → Labels">
        <c-input-text
          v-model:value="blueprintInput"
          label="Blueprint YAML:"
          multiline
          rows="5"
          placeholder="Paste Pangolin blueprint YAML here…"
          mb-2
        />

        <n-space justify="center" mb-2>
          <n-switch v-model:value="labelsAsArray">
            <template #checked>
              Array (- key=value)
            </template>
            <template #unchecked>
              Object (key: value)
            </template>
          </n-switch>
        </n-space>

        <n-space justify="center" mb-2>
          <n-button type="primary" @click="convertBlueprintToLabels">
            Convert to Docker Labels
          </n-button>
        </n-space>

        <textarea-copyable
          v-if="labelsOutput"
          v-model:value="labelsOutput"
          label="Generated Docker labels:"
          rows="16"
          language="yaml"
          placeholder="Docker labels will appear here..."
        />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
