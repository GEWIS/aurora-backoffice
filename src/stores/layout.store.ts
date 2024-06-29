import { defineStore } from 'pinia';

interface LayoutStore {
  menuMobileActive: boolean;
  menuDesktopActive: boolean;
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutStore => ({
    menuMobileActive: false,
    menuDesktopActive: false
  }),
  getters: {},
  actions: {
    switchMenuMobile() {
      this.menuMobileActive = !this.menuMobileActive;
    },
    switchMenuDesktop() {
      this.menuDesktopActive = !this.menuDesktopActive;
      console.log(this.menuDesktopActive);
    }
  }
});
