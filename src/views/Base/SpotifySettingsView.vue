<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
    <AppContainer icon="pi-users" title="Spotify Users">
      <template #header>
        <Button
          as="a"
          href="/api/spotify/login"
          icon="pi pi-plus"
          label="Add user"
          severity="secondary"
          variant="outlined"
        />
      </template>
      <div class="flex flex-col gap-3">
        <DataTable data-key="id" :loading="store.loading" selection="2" show-headers :value="store.spotifyUsers">
          <Column class="w-1">
            <template #body="slotProps">
              <i v-if="slotProps.data.active" class="pi pi-arrow-right"></i>
            </template>
          </Column>
          <Column field="name" header="Name" />
          <Column>
            <template #body="slotProps">
              <div class="flex justify-end gap-2">
                <SpotifyUserSwitchButton :user="slotProps.data" />
                <SpotifyUserDeleteButton :user="slotProps.data" />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </AppContainer>
    <SpotifyCurrentlyPlaying />
  </div>
  <SpotifyCallbackDialog />
</template>

<script setup lang="ts">
import AppContainer from '@/layout/AppContainer.vue';
import SpotifyCurrentlyPlaying from '@/components/audio/SpotifyCurrentlyPlaying.vue';
import { useSpotifyStore } from '@/stores/spotify.store';
import SpotifyCallbackDialog from '@/components/audio/SpotifyCallbackDialog.vue';
import SpotifyUserDeleteButton from '@/components/audio/SpotifyUserDeleteButton.vue';
import SpotifyUserSwitchButton from '@/components/audio/SpotifyUserSwitchButton.vue';

const store = useSpotifyStore();
void store.init();
</script>

<style scoped></style>
