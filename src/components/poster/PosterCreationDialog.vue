<template>
  <Button icon="pi pi-plus" label="Add poster" @click="open" />
  <Dialog
    closable
    close-on-escape
    dismissable-mask
    header="Add poster"
    :keep-in-viewport="false"
    modal
    :visible="visible"
    @update:visible="(v) => (visible = v)"
  >
    <form class="flex flex-col gap-4 w-[32rem] max-w-full" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2">
        <label for="poster-type">Type</label>
        <Select
          id="poster-type"
          v-model="type"
          :invalid="submitted && !type"
          option-label="label"
          option-value="value"
          :options="typeOptions"
          placeholder="Choose a type"
        />
        <Message v-if="submitted && !type" severity="error" size="small" variant="simple">
          Please pick a poster type
        </Message>
      </div>

      <div v-if="type" class="flex flex-col gap-2">
        <label for="poster-name">Name</label>
        <InputText id="poster-name" v-model="name" :invalid="submitted && !name.trim()" placeholder="My poster" />
        <Message v-if="submitted && !name.trim()" severity="error" size="small" variant="simple">
          Name is required
        </Message>
      </div>

      <div v-if="type === PosterTypeExternal.EXTERN" class="flex flex-col gap-2">
        <label for="poster-uri">URL</label>
        <InputText
          id="poster-uri"
          v-model="uri"
          :invalid="submitted && !uriValid"
          placeholder="https://..."
          type="url"
        />
        <Message v-if="submitted && !uriValid" severity="error" size="small" variant="simple">
          Please enter a valid URL
        </Message>
      </div>

      <div v-else-if="type === 'file'" class="flex flex-col gap-2">
        <label>File</label>
        <input
          ref="fileSelector"
          accept="image/*,video/*"
          hidden
          type="file"
          @change="handleFileSelect"
        />
        <div class="flex flex-row gap-2 items-center">
          <Button
            icon="pi pi-upload"
            label="Choose file"
            severity="secondary"
            type="button"
            @click="fileSelector?.click()"
          />
          <span v-if="file" class="text-sm opacity-75 truncate">{{ file.name }}</span>
          <span v-else class="text-sm opacity-50 italic">No file chosen</span>
        </div>
        <Message v-if="submitted && !file" severity="error" size="small" variant="simple">
          Please choose a file
        </Message>
      </div>

      <div v-else-if="type === PosterTypePhoto.PHOTO" class="flex flex-col gap-2">
        <label for="poster-albums">Album IDs</label>
        <InputChips
          id="poster-albums"
          v-model="albums"
          :invalid="submitted && albums.length === 0"
          :placeholder="albums.length === 0 ? 'Type an ID and press Enter' : ''"
          separator=","
          @add="onAlbumAdd"
        />
        <Message v-if="submitted && albums.length === 0" severity="error" size="small" variant="simple">
          Please add at least one album ID
        </Message>
        <Message v-else-if="albumError" severity="error" size="small" variant="simple">
          Album IDs must be numeric
        </Message>
      </div>

      <template v-if="type">
        <Divider />

        <div v-if="type !== PosterTypePhoto.PHOTO" class="flex flex-col gap-2">
          <label for="poster-label">Label (optional)</label>
          <InputText id="poster-label" v-model="label" placeholder="Poster Title" />
        </div>

        <div class="flex flex-row gap-4">
          <div class="flex flex-col gap-2 flex-1">
            <label for="poster-timeout">Default timeout (seconds)</label>
            <InputNumber id="poster-timeout" v-model="defaultTimeout" :min="1" show-buttons />
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <label for="poster-footer">Footer size</label>
            <Select
              id="poster-footer"
              v-model="footerSize"
              option-label="label"
              option-value="value"
              :options="footerSizeOptions"
            />
          </div>
        </div>

        <div class="flex flex-row gap-4">
          <div class="flex flex-col gap-2 flex-1">
            <label for="poster-color">Accent color</label>
            <div class="flex flex-row gap-2 items-center">
              <ColorPicker id="poster-color" v-model="accentColor" />
              <span v-if="accentColor" class="text-sm opacity-75">#{{ accentColor }}</span>
              <Button
                v-if="accentColor"
                icon="pi pi-times"
                severity="secondary"
                size="small"
                text
                type="button"
                @click="accentColor = ''"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2 flex-1">
            <label for="poster-expiration">Expires at</label>
            <DatePicker id="poster-expiration" v-model="expirationDate" show-icon show-time />
          </div>
        </div>

        <div class="flex flex-row items-center gap-3">
          <ToggleSwitch v-model="borrelMode" input-id="poster-borrel" />
          <label class="cursor-pointer" for="poster-borrel">Only show during Borrel mode</label>
        </div>
      </template>

      <div class="flex flex-row justify-end gap-2 mt-2">
        <Button label="Cancel" severity="secondary" type="button" @click="visible = false" />
        <Button
          :disabled="loading"
          label="Create"
          :loading="loading"
          severity="success"
          type="submit"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DatePicker from 'primevue/datepicker';
import InputChips from 'primevue/inputchips';
import {
  type ExternalPosterRequest,
  FooterSize,
  type MediaPosterRequest,
  type PhotoPosterRequest,
  PosterTypeExternal,
  PosterTypeImage,
  PosterTypePhoto,
  PosterTypeVideo,
} from '@/api';
import { usePosterStore } from '@/stores/poster/poster.store';

type CreatableType = 'file' | PosterTypeExternal.EXTERN | PosterTypePhoto.PHOTO;

const store = usePosterStore();

const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const submitted = ref<boolean>(false);

const type = ref<CreatableType | null>(null);
const name = ref<string>('');
const label = ref<string>('');
const uri = ref<string>('');
const file = ref<File | null>(null);
const albums = ref<string[]>([]);
const albumError = ref<boolean>(false);
const accentColor = ref<string>('');
const expirationDate = ref<Date | null>(null);
const footerSize = ref<FooterSize>(FooterSize.FULL);
const defaultTimeout = ref<number>(15);
const borrelMode = ref<boolean>(false);
const fileSelector = ref<HTMLInputElement | null>(null);

const typeOptions = [
  { label: 'File', value: 'file' as const },
  { label: 'URL', value: PosterTypeExternal.EXTERN },
  { label: 'Photo album', value: PosterTypePhoto.PHOTO },
];

const footerSizeOptions = [
  { label: 'Full', value: FooterSize.FULL },
  { label: 'Minimal', value: FooterSize.MINIMAL },
  { label: 'Hidden', value: FooterSize.HIDDEN },
];

const uriValid = computed(() => {
  try {
    new URL(uri.value);
    return true;
  } catch {
    return false;
  }
});

const open = () => {
  reset();
  visible.value = true;
};

const reset = () => {
  submitted.value = false;
  type.value = null;
  name.value = '';
  label.value = '';
  uri.value = '';
  file.value = null;
  albums.value = [];
  albumError.value = false;
  accentColor.value = '';
  expirationDate.value = null;
  footerSize.value = FooterSize.FULL;
  defaultTimeout.value = 15;
  borrelMode.value = false;
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const picked = target.files?.[0] ?? null;
  file.value = picked;
  if (picked && !name.value) name.value = picked.name;
};

const onAlbumAdd = () => {
  albumError.value = albums.value.some((v) => !/^\d+$/.test(v.trim()));
};

const buildBase = () => ({
  name: name.value.trim(),
  ...(label.value && { label: label.value }),
  ...(accentColor.value && { accentColor: accentColor.value }),
  ...(expirationDate.value && { expirationDate: expirationDate.value.toISOString() }),
  footerSize: footerSize.value,
  defaultTimeout: defaultTimeout.value,
  borrelMode: borrelMode.value,
});

const onSubmit = async () => {
  submitted.value = true;
  if (!type.value || !name.value.trim()) return;

  if (type.value === 'file') {
    if (!file.value) return;
    loading.value = true;
    const mediaType = file.value.type.startsWith('video/')
      ? PosterTypeVideo.VIDEO
      : PosterTypeImage.IMG;
    const params: MediaPosterRequest = { ...buildBase(), type: mediaType };
    await store.createPosterMedia(params, file.value);
  } else if (type.value === PosterTypeExternal.EXTERN) {
    if (!uriValid.value) return;
    loading.value = true;
    const params: ExternalPosterRequest = {
      ...buildBase(),
      type: PosterTypeExternal.EXTERN,
      uri: uri.value,
    };
    await store.createPoster(params);
  } else if (type.value === PosterTypePhoto.PHOTO) {
    onAlbumAdd();
    if (albums.value.length === 0 || albumError.value) return;
    loading.value = true;
    const params: PhotoPosterRequest = {
      ...buildBase(),
      type: PosterTypePhoto.PHOTO,
      albums: albums.value.map((v) => Number(v.trim())),
    };
    await store.createPoster(params);
  }

  loading.value = false;
  visible.value = false;
};
</script>

<style scoped></style>
