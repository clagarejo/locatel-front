import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Navbar from './Views/Navbar.vue';

library.add(fas);

const app = createApp(App);

app.use(router);
app.use(VueSweetalert2);
app.component('Navbar', Navbar);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
