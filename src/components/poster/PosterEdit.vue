<template>
  <Button class="flex-1" icon="pi pi-pencil" severity="warn" @click="open" />
  <Dialog
    closable
    close-on-escape
    dismissable-mask
    header="Edit poster"
    :keep-in-viewport="false"
    modal
    :visible="visible"
    @update:visible="(v) => (visible = v)"
  >
    <form class="flex flex-col gap-4 w-[32rem] max-w-full" @submit.prevent="onSubmit">
      <div class="flex flex-row items-center gap-2 text-sm opacity-75">
        <span>Type:</span>
        <span class="font-medium">{{ capitalize(poster.type) }}</span>
      </div>

      <div class="flex flex-col gap-2">
        <label for="poster-edit-name">Name</label>
        <InputText id="poster-edit-name" v-model="name" :invalid="submitted && !name.trim()" placeholder="My poster" />
        <Message v-if="submitted && !name.trim()" severity="error" size="small" variant="simple">
          Name is required
        </Message>
      </div>

      <div class="flex flex-col gap-2">
        <label for="poster-edit-label">Label (optional)</label>
        <InputText id="poster-edit-label" v-model="label" placeholder="Poster Title" />
      </div>

      <Divider />

      <div class="flex flex-row gap-4">
        <div class="flex flex-col gap-2 flex-1">
          <label for="poster-edit-timeout">Default timeout (seconds)</label>
          <InputNumber id="poster-edit-timeout" v-model="defaultTimeout" :min="1" show-buttons />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <label for="poster-edit-footer">Footer size</label>
          <Select
            id="poster-edit-footer"
            v-model="footerSize"
            option-label="label"
            option-value="value"
            :options="footerSizeOptions"
          />
        </div>
      </div>

      <div class="flex flex-row gap-4">
        <div class="flex flex-col gap-2 flex-1">
          <label for="poster-edit-color">Accent color</label>
          <div class="flex flex-row gap-2 items-center">
            <ColorPicker id="poster-edit-color" v-model="accentColorInput" />
            <InputText v-model="accentColorInput" class="w-28" maxlength="7" placeholder="ff0000" />
            <Button
              v-if="accentColor !== originalAccentColor"
              icon="pi pi-refresh"
              severity="secondary"
              size="small"
              text
              type="button"
              @click="accentColor = originalAccentColor"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <label for="poster-edit-expiration">Expires at</label>
          <DatePicker id="poster-edit-expiration" v-model="expirationDate" show-icon show-time />
        </div>
      </div>

      <div v-if="store.carousel.borrelModePresent" class="flex flex-row items-center gap-3">
        <ToggleSwitch v-model="borrelMode" input-id="poster-edit-borrel" />
        <label class="cursor-pointer" for="poster-edit-borrel">Only show during Borrel mode</label>
      </div>

      <div class="flex flex-row justify-end gap-2 mt-2">
        <Button label="Cancel" severity="secondary" type="button" @click="visible = false" />
        <Button :disabled="loading" label="Save" :loading="loading" severity="success" type="submit" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import DatePicker from 'primevue/datepicker';
import { FooterSize, type LocalPosterResponse, type UpdatePosterRequest } from '@/api';
import { usePosterStore } from '@/stores/poster/poster.store';
import { useServerSettingsStore } from '@/stores/server-settings.store';

const props = defineProps<{
  poster: LocalPosterResponse;
}>();

const store = usePosterStore();
const settingsStore = useServerSettingsStore();

const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const submitted = ref<boolean>(false);

const name = ref<string>('');
const label = ref<string>('');
const defaultTimeout = ref<number>(15);
const footerSize = ref<FooterSize>(FooterSize.FULL);
const accentColor = ref<string>('');
const originalAccentColor = ref<string>('');
const expirationDate = ref<Date | null>(null);
const borrelMode = ref<boolean>(false);

const defaultAccentColor = computed(() =>
  (settingsStore.serverSettings?.['Poster.DefaultProgressBarColor'] ?? '').replace(/^#/, '').toLowerCase(),
);

const accentColorInput = computed({
  get: () => accentColor.value || defaultAccentColor.value,
  set: (v: string) => {
    accentColor.value = v.replace(/^#/, '').toLowerCase();
  },
});

const footerSizeOptions = [
  { label: 'Full', value: FooterSize.FULL },
  { label: 'Minimal', value: FooterSize.MINIMAL },
  { label: 'Hidden', value: FooterSize.HIDDEN },
];

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const open = () => {
  submitted.value = false;
  name.value = props.poster.name;
  label.value = props.poster.label ?? '';
  defaultTimeout.value = props.poster.defaultTimeout;
  footerSize.value = props.poster.footerSize;
  const normalizedAccent = (props.poster.accentColor ?? '').replace(/^#/, '').toLowerCase();
  accentColor.value = normalizedAccent;
  originalAccentColor.value = normalizedAccent;
  expirationDate.value = props.poster.expirationDate ? new Date(props.poster.expirationDate) : null;
  borrelMode.value = props.poster.borrelMode;
  visible.value = true;
};

const buildParams = (): UpdatePosterRequest => ({
  name: name.value.trim(),
  label: label.value,
  footerSize: footerSize.value,
  defaultTimeout: defaultTimeout.value,
  borrelMode: borrelMode.value,
  ...(accentColor.value && { accentColor: accentColor.value }),
  ...(expirationDate.value && { expirationDate: expirationDate.value.toISOString() }),
});

const onSubmit = async () => {
  submitted.value = true;
  if (!name.value.trim()) return;

  loading.value = true;
  await store.updatePoster(props.poster.id, buildParams());
  loading.value = false;
  visible.value = false;
};
</script>

<style scoped></style>
