<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="messages"
      dataKey="id"
      :loading="loading"
      :globalFilterFields="['message']"
      v-model:selection="selectedMessages"
    >
      <template #header>
        <div class="flex justify-content-between">
          <div>
            <Button
              label="Message"
              icon="pi pi-plus"
              severity="success"
              class="mr-2"
              @click="newMessage"
            />
            <Button
              label="Delete"
              :disabled="selectedMessages.length === 0"
              icon="pi pi-trash"
              severity="danger"
              @click="confirmDeleteSelectedMessages"
            />
          </div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search" />
          </span>
        </div>
      </template>
      <Column selectionMode="multiple" style="width: 5%"></Column>
      <Column field="user" header="Added by" style="width: 15%"></Column>
      <Column field="createdAt" header="Added on" style="width: 15%">
        <template #body="slotProps">
          {{ slotProps.data.createdAt.toLocaleDateString() }}
        </template>
      </Column>
      <Column field="message" header="Message" style="width: 50%"></Column>
      <Column style="width: 10%">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            text
            rounded
            severity="secondary"
            class="mr-2"
            @click="editMessage(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            text
            rounded
            severity="danger"
            @click="confirmDeleteMessage(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="showMessageDialog"
      :style="{ width: '450px' }"
      header="Message"
      :modal="true"
      class="p-fluid"
      :draggable="false"
    >
      <div class="field">
        <InputText
          v-model.trim="message!.message"
          required="true"
          autofocus
          :class="{ 'p-invalid': isSubmitted && !message }"
        />
        <!--    TODO MAKE THIS WORK    -->
        <small class="p-error" v-if="isSubmitted && !message.message">Name Required</small>
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" severity="secondary" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" severity="secondary" text @click="saveMessage" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showDeleteMessageDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      :draggable="false"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle m-3" style="font-size: 2rem" />
        <span v-if="message"
          >Are you sure you want to delete <br /><b>"{{ message.message }}"</b>?</span
        >
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          severity="secondary"
          text
          @click="showDeleteMessageDialog = false"
        />
        <Button
          label="Confirm"
          icon="pi pi-check"
          severity="secondary"
          text
          @click="deleteMessage"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showDeleteMessagesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      :draggable="false"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle m-3" style="font-size: 2rem" />
        <span v-if="message">Are you sure you want to delete the selected messages?</span>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          severity="secondary"
          text
          @click="showDeleteMessagesDialog = false"
        />
        <Button
          label="Confirm"
          icon="pi pi-check"
          severity="secondary"
          text
          @click="deleteSelectedMessages"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import { InfoscreenService, type Message, type MessageParams } from '@/api';

const messages = ref<Message[]>([]);
// TODO temporary, update
const message: Ref<Message> = ref({
  id: '',
  createdAt: '',
  updatedAt: '',
  user: '',
  message: ''
});
const selectedMessages: Ref<Message[]> = ref([]);
const isSubmitted: Ref<boolean> = ref(false);
const showMessageDialog: Ref<boolean> = ref(false);
const showDeleteMessageDialog: Ref<boolean> = ref(false);
const showDeleteMessagesDialog: Ref<boolean> = ref(false);
const loading = ref(true);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
  InfoscreenService.getAllMessages().then((response: Message[]) => {
    messages.value = response;
    loading.value = false;
  });
});

const newMessage = () => {
  // TODO get actual user
  // message.value = new Message({
  //   id: '-1',
  //   user: 'currentUser',
  //   message: '',
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // });

  isSubmitted.value = false;
  showMessageDialog.value = true;
};

const hideDialog = () => {
  showMessageDialog.value = false;
  isSubmitted.value = false;
};

const saveMessage = () => {
  // Check if existing message is exited
  if (message.value.id) {
    InfoscreenService.updateMessage(message.value.id.toString(), {
      user: message.value.user!,
      message: message.value.message!
    } as MessageParams).then((response) => {
      const index = messages.value.map((mapMessage) => mapMessage.id).indexOf(response.id);
      messages.value[index] = response;
    });
  } else {
    InfoscreenService.createMessage({
      user: message.value.user!,
      message: message.value.message!
    } as MessageParams).then((response) => {
      messages.value.push(response);
    });
  }

  isSubmitted.value = true;
  showMessageDialog.value = false;
};

const editMessage = (editedMessage: Message) => {
  // To ensure data is not changed before confirming
  message.value = { ...editedMessage } as Message;
  showMessageDialog.value = true;
};

const confirmDeleteMessage = (deleteMessage: Message) => {
  message.value = deleteMessage;
  showDeleteMessageDialog.value = true;
};

const deleteMessage = () => {
  InfoscreenService.deleteMessage(message.value.id.toString()).then(() => {
    messages.value = messages.value.filter(
      (filterMessage: Message) => filterMessage.id !== message.value.id
    );
  });

  //message.value = new Message();
  showDeleteMessageDialog.value = false;
};

const confirmDeleteSelectedMessages = () => {
  message.value.message = '';
  showDeleteMessagesDialog.value = true;
};

const deleteSelectedMessages = () => {
  for (let deletedMessage of selectedMessages.value) {
    InfoscreenService.deleteMessage(deletedMessage.id.toString());
  }
  messages.value = messages.value.filter(
    (filterMessage: Message) => !selectedMessages.value.includes(filterMessage)
  );

  selectedMessages.value = [];
  showDeleteMessagesDialog.value = false;
};
</script>

<style scoped></style>
