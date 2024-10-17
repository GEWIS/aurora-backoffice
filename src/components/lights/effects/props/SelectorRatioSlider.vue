<template>
  <div class="flex flex-column w-fit">
    <label :for="id" class="font-bold block mb-1">{{ name }}</label>
    <div class="card">
      <div class="">
        <InputNumber
          :id="id"
          :model-value="value"
          class="w-full"
          :min-fraction-digits="0"
          :max-fraction-digits="2"
          @blur="(event) => handleNumberInputChange(event.value)"
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
