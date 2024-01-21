<template>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="roomResponsibles"
      dataKey="id"
      :loading="loading"
      :globalFilterFields="['fullName', 'expireDate']"
    >
      <template #header>
        <div class="roomresponsible-header">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search" />
          </span>
        </div>
      </template>
      <Column field="fullName" header="Name" style="width: 33%"></Column>
      <Column field="startDate" header="Since" style="width: 33%"></Column>
      <Column field="expireDate" header="Expires" style="width: 33%"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';

const roomResponsibles = ref([
  {
    fullName: 'Gijs de Man',
    startDate: new Date().toLocaleDateString(),
    expireDate: new Date().toLocaleDateString()
  },
  {
    fullName: 'Samuel Oosterholt',
    startDate: new Date().toLocaleDateString(),
    expireDate: new Date().toLocaleDateString()
  },
  {
    fullName: 'Roy Kakkenberg',
    startDate: new Date().toLocaleDateString(),
    expireDate: new Date().toLocaleDateString()
  }
]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const loading = ref(true);

onMounted(() => {
  // const client = new Client()
  // client.getUsers().then((data) => {
  //   roomResponsibles.value = data.users;
  loading.value = false;
  // })
});
</script>

<style scoped>
@import '@/styles/BasePage.scss';

.roomresponsible-header {
  display: flex;
  justify-content: flex-end;
}
</style>
