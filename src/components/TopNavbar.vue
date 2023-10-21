<template>
  <div class="container">
    <nav>
      <Menubar :model="leftItems">
        <template #start>
          <router-link to="/" id="narrowcast">
            {{ $t("login.Narrowcast") }}
            <img id="logo" src="../assets/img/gewis-branding.svg" alt="Narrowcast"/>
          </router-link>

        </template>
      </Menubar>
      <Menubar :model="rightItems">
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
  {
    label: () => "t('Infoscreen')",
    to: '/infoscreen',
    items: [
      {
        label: () => "t('Settings')",
        to: '/infoscreen/settings',
      },
      {
        label: () => "t('Room Responsibles')",
        to: '/infoscreen/roomresponsibles'
      }
    ]
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

.container {
  background-color: #d40000;
  display: flex;
  width: 100%;
  justify-content: space-around;
  line-height: 1.5;
  padding: 0.5rem 1rem;
}

nav {
  display: flex;
  flex-direction: row;
  max-width: 1180px;
  width: 100%;
  justify-content: space-between;


  .p-menubar {
    background-color: #d40000;
  }
}

:deep(.p-menuitem-icon) {
  color: white !important;
}

:deep(.p-menubar) {
  padding: 0 1rem;
}

:deep(.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text) {
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  padding-right: 5px;
}

#logo {
  height: 65px;
  padding-top: 8px;
  padding-bottom: 8px;
}

#narrowcast {
  color: white;
  font-weight: 700;
  font-family: Raleway, sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3125rem 0;
}

:deep(svg) {
  margin: 0 !important;
}

:deep(.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon) {
  color: white;
}

:deep(a:hover) {
  background-color: transparent;
}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) >
 .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text) {
  color: hsla(0, 0%, 100%, .5) !important;
}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) >
 .p-menuitem-content .p-menuitem-link .p-menuitem-text) {
  transition: color .2s linear;
}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) >
 .p-menuitem-content:hover .p-menuitem-link svg) {
  color: hsla(0, 0%, 100%, .5) !important;

}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) >
 .p-menuitem-content .p-menuitem-link svg) {
  transition: color .2s linear;
}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content) {
  background-color: transparent;
}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus >
 .p-menuitem-content .p-menuitem-link .p-menuitem-text) {
  color: hsla(0, 0%, 100%, .5) !important;
}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content .p-menuitem-link svg) {
  color: hsla(0, 0%, 100%, .5) !important;
}

:deep(.p-menubar .p-menuitem.p-highlight > .p-menuitem-content) {
  background-color: transparent !important;

}

:deep(.p-menubar .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link .p-menuitem-text) {
  color: hsla(0, 0%, 100%, .5) !important;
}

:deep(.p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover) {
  background-color: lightgray;
}

:deep(.p-menubar .p-menubar-root-list .p-menuitem-active .p-submenu-list >
 .p-menuitem > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text) {
  color: black !important;
}

:deep(.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link) {
  padding: 0 0.5rem;
}

#bier {
  height: 12px;
}
</style>
