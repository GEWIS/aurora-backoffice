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
      this.darkMode = !this.darkMode;
      const theme = this.darkMode ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      this.applyTheme();
    },
    applyTheme() {
      const element = document.querySelector('html');
      if (this.darkMode) {
        element!.classList.add('dark-mode');
      } else {
        element!.classList.remove('dark-mode');
      }
    },
    init() {
      this.applyTheme();
    }
  }
});
