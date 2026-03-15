<script setup lang="ts">
import {
  type ActivityLevel,
  type Gender,
  calculateBMI,
  calculateBMR,
  calculateBodyFat,
  calculateHeartRateZones,
  calculateIdealWeight,
  calculateTDEE,
  cmToInches, inchesToCm, kgToLbs, lbsToKg,
} from '@finegym/fitness-calc';

const unitSystem = ref<'metric' | 'us'>('metric');

const gender = ref<Gender>('male');
const age = ref(30);

const heightInput = ref(180);
const weightInput = ref(75);
const neckInput = ref(40);
const waistInput = ref(80);
const hipInput = ref(95);

watch(unitSystem, (newValue) => {
  if (newValue === 'us') {
    heightInput.value = cmToInches(heightInput.value);
    waistInput.value = cmToInches(waistInput.value);
    hipInput.value = cmToInches(hipInput.value);
    neckInput.value = cmToInches(neckInput.value);
    weightInput.value = kgToLbs(weightInput.value);
  }
  else {
    heightInput.value = inchesToCm(heightInput.value);
    waistInput.value = inchesToCm(waistInput.value);
    hipInput.value = inchesToCm(hipInput.value);
    neckInput.value = inchesToCm(neckInput.value);
    weightInput.value = lbsToKg(weightInput.value);
  }
});

const formula = ref<'bmr' | 'tdee' | 'bmi' | 'idealWeight' | 'bodyFatUS' | 'bodyFatBMI' | 'maxHR'>('bmr');

const formulaOptions = [
  { label: 'BMR', value: 'bmr' },
  { label: 'TDEE/Calories', value: 'tdee' },
  { label: 'BMI', value: 'bmi' },
  { label: 'Ideal Weight', value: 'idealWeight' },
  { label: 'Body Fat (US Navy)', value: 'bodyFatUS' },
  { label: 'Body Fat (BMI)', value: 'bodyFatBMI' },
  { label: 'Max Heart Rate', value: 'maxHR' },
];

const height = computed(() =>
  unitSystem.value === 'metric' ? heightInput.value : inchesToCm(heightInput.value),
);

const weight = computed(() =>
  unitSystem.value === 'metric' ? weightInput.value : lbsToKg(weightInput.value),
);

const neck = computed(() =>
  unitSystem.value === 'metric' ? neckInput.value : inchesToCm(neckInput.value),
);

const waist = computed(() =>
  unitSystem.value === 'metric' ? waistInput.value : inchesToCm(waistInput.value),
);

const hip = computed(() =>
  unitSystem.value === 'metric' ? hipInput.value : inchesToCm(hipInput.value),
);

const activity = ref<ActivityLevel>('moderate');

const bmr = computed(() =>
  calculateBMR(weight.value, height.value, age.value, gender.value),
);

const tdee = computed(() =>
  calculateTDEE(weight.value, height.value, age.value, gender.value, activity.value),
);

const bmi = computed(() =>
  calculateBMI(height.value, weight.value),
);

const idealWeight = computed(() => {
  const metric = calculateIdealWeight(height.value, gender.value);
  if (unitSystem.value === 'metric') {
    return metric;
  }

  return {
    robinson: cmToInches(metric.robinson),
    miller: cmToInches(metric.miller),
    devine: cmToInches(metric.devine),
    hamwi: cmToInches(metric.hamwi),
    average: cmToInches(metric.average),
  };
},
);

const bodyFatUSNavy = computed(() => {
  const metric = calculateBodyFat(gender.value,
    weight.value,
    {
      waistCm: waist.value,
      neckCm: neck.value,
      heightCm: height.value,
      hipCm: hip.value,
    }, 'us_navy');

  if (unitSystem.value === 'metric') {
    return metric;
  }

  return {
    bodyFatPercentage: metric.bodyFatPercentage,
    fatMass: kgToLbs(metric.fatMass),
    leanMass: kgToLbs(metric.leanMass),
    method: metric.method,
  };
},
);

const bodyFatBMI = computed(() => {
  const metric = calculateBodyFat(gender.value,
    weight.value,
    {
      waistCm: waist.value,
      neckCm: neck.value,
      heightCm: height.value,
      hipCm: hip.value,
    }, 'bmi_derived');

  if (unitSystem.value === 'metric') {
    return metric;
  }

  return {
    bodyFatPercentage: metric.bodyFatPercentage,
    fatMass: kgToLbs(metric.fatMass),
    leanMass: kgToLbs(metric.leanMass),
    method: metric.method,
  };
},
);

const maxHR = computed(() => calculateHeartRateZones(age.value));
</script>

<template>
  <div>
    <n-form label-width="140px" label-placement="left">
      <n-form-item label="Units:">
        <n-radio-group v-model:value="unitSystem">
          <n-radio value="metric">
            Metric (kg, cm)
          </n-radio>
          <n-radio value="us">
            US (lbs, inches)
          </n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="Formula:">
        <n-select v-model:value="formula" :options="formulaOptions" />
      </n-form-item>

      <n-form-item label="Gender:">
        <n-radio-group v-model:value="gender">
          <n-radio value="male">
            Male
          </n-radio>
          <n-radio value="female">
            Female
          </n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="Age:">
        <n-input-number v-model:value="age" :min="1" />
      </n-form-item>

      <n-form-item :label="unitSystem === 'metric' ? 'Height (cm):' : 'Height (in):'">
        <n-input-number
          v-model:value="heightInput"
          min="0"
        />
      </n-form-item>

      <n-form-item :label="unitSystem === 'metric' ? 'Weight (kg):' : 'Weight (lbs):'">
        <n-input-number
          v-model:value="weightInput"
          min="0"
        />
      </n-form-item>

      <n-card v-if="formula === 'bodyFatUS' || formula === 'bodyFatBMI'" title="Body Measurements" mb-2>
        <n-form-item :label="unitSystem === 'metric' ? 'Neck (cm):' : 'Neck (in):'" label-width="110px">
          <n-input-number
            v-model:value="neckInput"
            min="0"
          />
        </n-form-item>

        <n-form-item :label="unitSystem === 'metric' ? 'Waist (cm):' : 'Waist (in):'" label-width="110px">
          <n-input-number
            v-model:value="waistInput"
            min="0"
          />
        </n-form-item>

        <n-form-item
          v-if="gender === 'female'"
          :label="unitSystem === 'metric' ? 'Hip (cm):' : 'Hip (in):'"
        >
          <n-input-number
            v-model:value="hipInput"
            min="0"
          />
        </n-form-item>
      </n-card>

      <template v-if="formula === 'tdee'">
        <n-form-item label="Activity Level:">
          <n-select
            v-model:value="activity"
            :options="[
              { label: 'Sedentary: little or no exercise', value: 'sedentary' },
              { label: 'Light: exercise 1-3 times/week', value: 'light' },
              { label: 'Moderate: exercise 4-5 times/week', value: 'moderate' },
              { label: 'Active: daily exercise or intense exercise 3-4 times/week', value: 'active' },
              { label: 'Very Active: intense exercise 6-7 times/week', value: 'very_active' },
              { label: 'Extra Active: very intense exercise daily, or physical job', value: 'extra_active' },
            ]"
          />
        </n-form-item>
      </template>
    </n-form>

    <n-card title="Results">
      <template v-if="formula === 'bmr'">
        <input-copyable :value="bmr.bmr" label="BMR (kcal/day):" label-position="left" mb-1 />
      </template>

      <template v-if="formula === 'tdee'">
        <input-copyable :value="tdee.tdee" label="TDEE/Calories (kcal/day):" label-position="left" mb-1 />
      </template>

      <template v-if="formula === 'bmi'">
        <input-copyable :value="bmi.bmi.toFixed(2)" label="BMI:" label-position="left" label-width="150px" mb-1 />
        <input-copyable :value="bmi.category" label="BMI Category:" label-position="left" label-width="150px" mb-1 />
        <input-copyable :value="bmi.healthyWeightRange.min" label="Healthy Range (min):" label-position="left" label-width="150px" mb-1 />
        <input-copyable :value="bmi.healthyWeightRange.max" label="Healthy Range (max):" label-position="left" label-width="150px" mb-1 />
      </template>

      <template v-if="formula === 'idealWeight'">
        <input-copyable :value="idealWeight.average.toFixed(1)" label="Ideal Weight:" label-position="left" label-width="140px" mb-1 />
        <input-copyable :value="idealWeight.devine.toFixed(1)" label="— (Devine 1974):" label-position="left" label-width="140px" mb-1 />
        <input-copyable :value="idealWeight.hamwi.toFixed(1)" label="— (Hamwi 1964):" label-position="left" label-width="140px" mb-1 />
        <input-copyable :value="idealWeight.miller.toFixed(1)" label="— (Miller 1983):" label-position="left" label-width="140px" mb-1 />
        <input-copyable :value="idealWeight.robinson.toFixed(1)" label="— (Robinson 1983):" label-position="left" label-width="140px" mb-1 />
      </template>

      <template v-if="formula === 'bodyFatUS'">
        <input-copyable :value="bodyFatUSNavy.bodyFatPercentage.toFixed(1)" label="Body Fat (%):" label-position="left" label-width="120px" mb-1 />
        <input-copyable :value="bodyFatUSNavy.fatMass.toFixed(1)" label="Fat Mass:" label-position="left" label-width="120px" mb-1 />
        <input-copyable :value="bodyFatUSNavy.leanMass.toFixed(1)" label="Lean Mass:" label-position="left" label-width="120px" mb-1 />
      </template>

      <template v-if="formula === 'bodyFatBMI'">
        <input-copyable :value="bodyFatBMI.bodyFatPercentage.toFixed(1)" label="Body Fat (%):" label-position="left" label-width="120px" mb-1 />
        <input-copyable :value="bodyFatBMI.fatMass.toFixed(1)" label="Fat Mass:" label-position="left" label-width="120px" mb-1 />
        <input-copyable :value="bodyFatBMI.leanMass.toFixed(1)" label="Lean Mass:" label-position="left" label-width="120px" mb-1 />
      </template>

      <template v-if="formula === 'maxHR'">
        <input-copyable :value="maxHR.maxHeartRate" label="Max Heart Rate (bpm):" label-position="left" label-width="160px" mb-1 />
        <input-copyable v-for="(zone, index) in maxHR.zones" :key="index" :value="`${zone.min} - ${zone.max}: ${zone.description}`" :label="zone.name" label-position="left" label-width="160px" mb-1 />
      </template>
    </n-card>
  </div>
</template>
