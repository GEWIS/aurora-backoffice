/* eslint vue/multi-word-component-names: 0 */
/* eslint vue/no-reserved-component-names: 0 */
import './assets/main.css';
import 'primeflex/primeflex.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import Panel from "primevue/panel";
import DataTable from "primevue/datatable";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import 'primeicons/primeicons.css';
import languages from "@/locales";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import TabView from "primevue/tabview";
import ScrollPanel from "primevue/scrollpanel";
import FileUpload from "primevue/fileupload";
import ProgressSpinner from "primevue/progressspinner";
import { useAuthStore } from '@/stores/auth.store';
import SelectButton from 'primevue/selectbutton';
import ToggleButton from 'primevue/togglebutton';
import "./styles/themes/sudosos-light/theme.scss";
import Card from 'primevue/card';

const app = createApp(App);

const messages = Object.assign(languages);
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});
app.use(createPinia());
await useAuthStore().init();

app.use(router);
app.use(PrimeVue);
app.use(i18n);

app.component('Button', Button);
app.component('Card', Card);
app.component('SelectButton', SelectButton);
app.component('ToggleButton', ToggleButton);
app.component('InputText', InputText);
app.component('Menubar', Menubar);
app.component('Panel', Panel);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('Checkbox', Checkbox);
app.component('TabView', TabView);
app.component('ScrollPanel', ScrollPanel);
app.component('FileUpload', FileUpload);
app.component('InputNumber', InputNumber);
app.component('Spinner', ProgressSpinner);

app.mount('#app');
