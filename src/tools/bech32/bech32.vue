<script setup lang="ts">
import { bech32, bech32m } from 'bech32';

// Shared state
const encodingVariant = ref<'bech32' | 'bech32m'>('bech32');
const autoDetect = ref(true);
const checksumOnly = ref(false);

// Decode state
const bechInput = ref('');
const decodedHrp = ref('');
const decodedHex = ref('');
const detectedVariant = ref('');
const checksumValid = ref<boolean | null>(null);
const decodeError = ref('');

// Encode state
const hrp = ref('');
const hexPayload = ref('');
const encodeError = ref('');
const bechOutput = ref('');

interface DecodedRow {
  input: string
  hrp: string
  variant: string
  hex: string
  status: string
}

// Batch state
const batchInput = ref('');
const batchRows = ref<DecodedRow[]>([]);

// Helpers
function wordsToHex(words: number[]): string {
  return bech32.fromWords(words).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToWords(hex: string): number[] {
  const clean = hex.toLowerCase();
  if (!/^[0-9a-f]+$/.test(clean) || clean.length % 2 !== 0) {
    throw new Error('Invalid hex payload');
  }

  return bech32.toWords(clean.match(/.{2}/g)!.map(b => Number.parseInt(b, 16)));
}

function detectVariant(input: string) {
  try {
    const r = bech32.decode(input);
    return { variant: 'bech32', ...r };
  }
  catch {}
  const r = bech32m.decode(input);
  return { variant: 'bech32m', ...r };
}

// Actions
function decode() {
  checksumValid.value = null;
  decodedHrp.value = '';
  decodedHex.value = '';
  detectedVariant.value = '';
  decodeError.value = '';

  const input = bechInput.value.trim();
  try {
    const res = autoDetect.value
      ? detectVariant(input)
      : encodingVariant.value === 'bech32'
        ? { variant: 'bech32', ...bech32.decode(input) }
        : { variant: 'bech32m', ...bech32m.decode(input) };

    decodedHrp.value = res.prefix;
    decodedHex.value = wordsToHex(res.words);
    detectedVariant.value = res.variant;
    checksumValid.value = true;
  }
  catch (err: any) {
    checksumValid.value = false;
    decodeError.value = err.toString();
  }
}

function validateChecksum() {
  checksumValid.value = null;
  const input = bechInput.value.trim();

  try {
    autoDetect.value
      ? detectVariant(input)
      : encodingVariant.value === 'bech32'
        ? bech32.decode(input)
        : bech32m.decode(input);

    checksumValid.value = true;
  }
  catch (err: any) {
    checksumValid.value = false;
    decodeError.value = err.toString();
  }
}

function encode() {
  try {
    const words = hexToWords(hexPayload.value);
    const enc
      = encodingVariant.value === 'bech32'
        ? bech32.encode(hrp.value, words)
        : bech32m.encode(hrp.value, words);

    bechOutput.value = enc;
  }
  catch (err: any) {
    encodeError.value = err.toString();
  }
}

function batchConvert() {
  const lines = batchInput.value
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const rows: DecodedRow[] = [];

  for (const line of lines) {
    try {
      const r = detectVariant(line);
      rows.push({
        input: line,
        hrp: r.prefix,
        variant: r.variant,
        hex: wordsToHex(r.words),
        status: 'OK',
      });
    }
    catch (err: any) {
      rows.push({
        input: line,
        hrp: '',
        variant: '',
        hex: '',
        status: `ERROR: ${err.toString()}`,
      });
    }
  }

  batchRows.value = rows;
}

function exportCsv() {
  if (!batchRows.value.length) {
    return;
  }

  const header = ['Input', 'HRP', 'Variant', 'Hex', 'Status'];
  const rows = batchRows.value.map(r => [
    r.input,
    r.hrp,
    r.variant,
    r.hex,
    r.status,
  ]);

  const csv
    = `${header.join(',')
     }\n${
     rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')}`;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'bech32_batch.csv';
  a.click();

  URL.revokeObjectURL(url);
}
</script>

<template>
  <div>
    <n-tabs type="line" animated>
      <!-- DECODE TAB -->
      <n-tab-pane name="decode" tab="Decode">
        <c-input-text
          v-model:value="bechInput"
          label-position="left"
          label="Bech32(m) string:"
          placeholder="Bech32 / Bech32m string"
          mb-1
        />

        <n-space justify="center" align="center" mb-1>
          <n-switch v-model:value="autoDetect">
            <template #checked>
              Auto-detect
            </template>
            <template #unchecked>
              Manual
            </template>
          </n-switch>
          <c-select
            v-model:value="encodingVariant"
            label-position="left"
            label="Variant:"
            :disabled="autoDetect"
            :options="[
              { label: 'Bech32', value: 'bech32' },
              { label: 'Bech32m', value: 'bech32m' },
            ]"
            style="width: 160px"
          />
          <n-switch v-model:value="checksumOnly">
            <template #checked>
              Checksum only
            </template>
            <template #unchecked>
              Full decode
            </template>
          </n-switch>
        </n-space>

        <n-space justify="center" mb-2>
          <n-button
            type="primary"
            @click="checksumOnly ? validateChecksum() : decode()"
          >
            {{ checksumOnly ? 'Validate' : 'Decode' }}
          </n-button>
        </n-space>

        <n-alert v-if="checksumValid === true" type="success" mb-2>
          Checksum valid
        </n-alert>
        <n-alert v-if="checksumValid === false" type="error" mb-2>
          Checksum invalid
        </n-alert>

        <c-alert v-if="decodeError">
          {{ decodeError }}
        </c-alert>

        <div v-if="decodedHex">
          <input-copyable v-model:value="decodedHrp" label-width="110px" label-position="left" label="HRP:" readonly placeholder="HRP" />
          <input-copyable v-model:value="decodedHex" label-width="110px" label-position="left" label="Payload:" readonly placeholder="Hex payload" />
          <input-copyable v-model:value="detectedVariant" label-width="110px" label-position="left" label="Variant:" readonly placeholder="Variant" />
        </div>
      </n-tab-pane>

      <!-- ENCODE TAB -->
      <n-tab-pane name="encode" tab="Encode">
        <c-input-text v-model:value="hrp" label-position="left" label="HRP:" label-width="110px" placeholder="HRP" mb-1 />
        <c-input-text
          v-model:value="hexPayload"
          label-position="left" label-width="110px"
          label="Payload:"
          placeholder="Hex payload"
          mb-1
        />

        <c-select
          v-model:value="encodingVariant"
          label-position="left" label-width="110px"
          label="Variant:"
          :options="[
            { label: 'Bech32', value: 'bech32' },
            { label: 'Bech32m', value: 'bech32m' },
          ]"
          style="width: 160px"
        />

        <n-space justify="center">
          <n-button type="primary" @click="encode">
            Encode
          </n-button>
        </n-space>

        <c-alert v-if="encodeError">
          {{ encodeError }}
        </c-alert>

        <div v-else>
          <input-copyable v-model:value="bechOutput" label="Encoded bech32 string:" readonly placeholder="bech32 string" />
        </div>
      </n-tab-pane>

      <!-- BATCH TAB -->
      <n-tab-pane name="batch" tab="Batch">
        <c-input-text
          v-model:value="batchInput"
          label="Bech32 strings (one per line):"
          multiline
          rows="5"
          placeholder="One Bech32 string per line"
          mb-2
        />
        <n-space justify="center" mb-2>
          <n-button type="primary" @click="batchConvert">
            Convert
          </n-button>
        </n-space>
        <n-card v-if="batchRows.length" title="Results">
          <n-data-table
            :columns="[
              { title: 'Input', key: 'input' },
              { title: 'HRP', key: 'hrp' },
              { title: 'Variant', key: 'variant' },
              { title: 'Hex', key: 'hex' },
              { title: 'Status', key: 'status' },
            ]"
            :data="batchRows"
            :bordered="true"
            size="small"
            mb-2
          />
          <n-space justify="center">
            <n-button @click="exportCsv">
              Export CSV
            </n-button>
          </n-space>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
