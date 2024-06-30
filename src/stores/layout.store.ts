import { defineStore } from 'pinia';

interface LayoutStore {
  menuMobileActive: boolean;
  menuDesktopActive: boolean;
  darkMode: boolean;
  primeVue: any;
}

function useDarkMode() {
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme') === 'dark';
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('theme', 'dark');
      return true;
    } else {
      localStorage.setItem('theme', 'light');
      return false;
    }
  }
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutStore => ({
    menuMobileActive: false,
    menuDesktopActive: false,
    darkMode: useDarkMode(),
    primeVue: null
  }),
  getters: {},
  actions: {
    switchMenuMobile() {
      this.menuMobileActive = !this.menuMobileActive;
    },
    switchMenuDesktop() {
      this.menuDesktopActive = !this.menuDesktopActive;
    },
    switchTheme() {
      const newTheme = this.darkMode ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      this.darkMode = !this.darkMode;
      this.setTheme();
    },
    setTheme() {
      const currentTheme = this.darkMode ? 'aura-dark-blue' : 'aura-light-blue';
      const newTheme = this.darkMode ? 'aura-light-blue' : 'aura-dark-blue';
      this.primeVue.changeTheme(currentTheme, newTheme, 'theme-css', () => {});
    },
    init(primeVue: any) {
      this.primeVue = primeVue;
      this.setTheme();
    }
  }
});
