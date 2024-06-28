<template>
  <li :class="{ 'layout-root-menuitem': root }">
    <div v-if="root" class="layout-menuitem-root-text">
      {{ item.label }}
    </div>

    <RouterLink
      v-if="item.to && !item.items"
      :class="{ 'active-route': checkActiveRoute(item) }"
      tabindex="0"
      :to="item.to"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
    </RouterLink>

    <Transition v-if="item.items" name="layout-submenu">
      <ul v-show="root" class="layout-submenu">
        <template v-for="(child, i) in item.items" :key="child">
          <AppMenuItem :index="i" :item="child" :root="false" />
        </template>
      </ul>
    </Transition>
  </li>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

export interface MenuItem {
  label: string;
  icon?: string;
  to?: string;
  items?: MenuItem[];
}

defineProps({
  item: {
    type: Object as () => MenuItem,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  },
  root: {
    type: Boolean,
    default: true
  },
  parentItemKey: {
    type: String,
    default: null
  }
});

const route = useRoute();
const checkActiveRoute = (item: MenuItem) => {
  return route.path === item.to;
};
</script>

<style lang="scss" scoped></style>
