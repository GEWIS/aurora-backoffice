<template>
  <div>
    <nav class="w-100 d-flex flex-row red-bg justify-content-around">
      <Menubar :model="leftItems" class="red-bg m-0">
        <template #start>
          <router-link to="/" class="text-white d-flex flex-row align-items-center pe-1 py-1">
            {{ $t("login.Narrowcast") }}
            <img style="height: 65px" class="py-1" id="logo" src="@/assets/img/gewis-branding.svg" alt="Narrowcast"/>
          </router-link>

        </template>
      </Menubar>
      <Menubar :model="rightItems" class="red-bg">
        <template #item="{ label, item, props, root, hasSubmenu }">
          <a :href="item.url" :target="item.target" v-bind="props.action">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
            <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
          </a>
        </template>
      </Menubar>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const leftItems = ref([
  {
    label: 'Transactions'
  },
  {
    label: 'Balance',
    // to: '/balance',
  },
]);

const rightItems = ref([
  {
    label: '',
    icon: 'pi pi-globe',
    items: [
      {
        label: 'Nederlands',
      },
      {
        label: 'English',
      },
    ]
  },
]);

</script>

<style scoped lang="scss">
:deep(.p-menubar-root-list) {
  margin: 0;
}

:deep(.p-menuitem-text){
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  padding-right: 5px;
}

// Define normal top-level menu-items
:deep(.p-menuitem) {
  &.p-focus .p-menuitem-content {
    background-color: transparent;
  }

  &.p-focus, &.p-focus, &.p-highlight > .p-menuitem-content {
    background-color: transparent;
    > a > * {
      color: hsla(0, 0%, 100%, .75);
    }
  }

  .p-menuitem-content {
    > a {
      padding: 0 0.5rem;
      > * {
        color: white;
        transition: color .2s linear;
      }
    }
    &:hover {
      > a {
        &:hover {
          background-color: transparent;
        }

        > * {
          color: hsla(0, 0%, 100%, .75);
        }
      }
    }
  }
}

:deep(.p-submenu-list){
  padding: 0.5rem 0;
  width: fit-content;
  height: fit-content;
}

// Define an exception for submenu-items
:deep(.p-submenu-list .p-menuitem){

  font-size: 1rem;
  white-space: nowrap;
  .p-menuitem-content > a > * {
    padding: 0.5rem 1.5rem;
    color: black;
    font-weight: 400;
  }
}
</style>
