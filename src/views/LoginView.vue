<template>
  <div>
    <main>
      <img id="login-image" src="../assets/img/AVICO.svg" alt="logo" />
      <hr>
      <Spinner id="login-image" />
    </main>
    <CopyrightBanner />
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from "@/components/CopyrightBanner.vue";
import { onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { v4 as uuid } from 'uuid';
import router from "@/router";
import { useForm } from "vee-validate";
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { Client } from '@/api/Client';

// const authStore = useAuthStore();
// const userStore = useUserStore();
const schema = toTypedSchema(
    yup.object({
      username: yup.string().required(),
      password: yup.string().required()
    })
);

onMounted(() => {
  const client = new Client();
  client.authMock()
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
});

</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
}
h1 {
  color: black;
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

#login-image {
  max-height: 150px;

  display: block;
  margin: 0 auto;
}

main {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 350px;
  margin: 4rem auto;
}

.p-button {
  margin: 1rem auto;
  max-width: 350px;
  width: 100%;
  max-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#gewis-branding {
  max-height: 24px;
  margin-right: 1rem;
}

label {
  color: black;
  margin-bottom: 0.5rem;
}

hr {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  max-width: 350px;
  width: 100%;
}

.p-inputtext {
  margin-bottom: 0.5rem;
}
</style>