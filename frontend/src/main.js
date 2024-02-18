/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import Dialog from 'primevue/dialog';

import Calendar from 'primevue/calendar';

const app = createApp(App);

app.use(PrimeVue, { inputStyle: "filled" });


// eslint-disable-next-line vue/multi-word-component-names
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('Dialog', Dialog)

app.mount('#app');
