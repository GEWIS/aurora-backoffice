<template>
  <div class="page-container">
    <div class="page-title">{{ $t('Room Responsibles') }}</div>
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
            <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" :placeholder="$t('Keyword Search')"/>
            </span>
        </div>
      </template>
      <Column field="fullName" :header="$t('Name')" style="width: 33%"></Column>
      <Column field="startDate" :header="$t('Since')" style="width: 33%"></Column>
      <Column field="expireDate" :header="$t('Expires')" style="width: 33%"></Column>
    </DataTable>
    <CopyrightBanner/>
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from "@/components/CopyrightBanner.vue";
import {onMounted, ref} from "vue";
import {Client} from '@/api/Client';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {FilterMatchMode} from 'primevue/api';

const roomResponsibles = ref([
  {fullName: 'Gijs de Man', startDate: (new Date()).toLocaleDateString(), expireDate: (new Date()).toLocaleDateString()},
  {fullName: 'Samuel Oosterholt', startDate: (new Date()).toLocaleDateString(), expireDate: (new Date()).toLocaleDateString()},
  {fullName: 'Roy Kakkenberg', startDate: (new Date()).toLocaleDateString(), expireDate: (new Date()).toLocaleDateString()},
])

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
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
@import '../styles/BasePage.css';

/* Style for the DataTable header */
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f8f8f8;
  border-top: none;
  text-transform: uppercase;
  font-family: Lato, Arial, sans-serif !important;
  font-size: 1rem;
  padding: 0.375rem 0;
  line-height: 1.5;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/* Style for the DataTable body */
:deep(.p-datatable .p-datatable-tbody > tr) {
  background-color: #f8f8f8;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border: none;
  padding: 0.375rem 0;
  font-size: 1rem;
  font-family: Lato, Arial, sans-serif !important;
}

/* Style for the DataTable wrapper */
:deep(.p-datatable > .p-datatable-wrapper > .p-datatable-table) {
  background-color: #f8f8f8;
  border-top: none;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-left: 1rem;
  padding-right: 1rem;
}

:deep(.p-datatable > .p-datatable-header) {
  border-width: 1px 1px 0 1px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.roomresponsible-header {
  display: flex;
  justify-content: flex-end;
}

i {
  margin-top: -0.5rem !important;
}

</style>

<!--{-->
<!--label: () => "t('Infoscreen')",-->
<!--to: '/infoscreen',-->
<!--items: [-->
<!--{-->
<!--label: () => "t('Settings')",-->
<!--to: '/infoscreen/settings',-->
<!--},-->
<!--{-->
<!--label: () => "t('Room Responsibles')",-->
<!--to: '/infoscreen/roomresponsibles'-->
<!--}-->
<!--]-->
<!--},-->
