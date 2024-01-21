<template>
  <div class="flex flex-column w-fit">
    <label :for="id" class="font-bold block mb-1">{{ name }}</label>
    <div class="card">
      <div class="">
        <InputNumber
          :model-value="value"
          class="w-full"
          @blur="(event) => handleNumberInputChange(event.value)"
          :minFractionDigits="0"
          :maxFractionDigits="2"
          :id="id"
        />
        <Slider
          :model-value="value"
          class="w-full"
          :min="min"
          :max="max"
          :step="step"
          @change="onChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number;
  min: number;
  max: number;
  step: number;
  id: string;
  name: string;
}>();

const emit = defineEmits<{
  update: [value: number];
}>();

const handleNumberInputChange = (newValue: string) => {
  const asNumber = Number(newValue);
  if (!Number.isNaN(asNumber)) onChange(asNumber);
};

const onChange = (newValue: number) => {
  if (newValue < props.min) {
    emit('update', props.min);
  } else if (newValue > props.max) {
    emit('update', props.max);
  } else {
    emit('update', newValue);
  }
};
</script>

<style scoped></style>
