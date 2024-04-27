import { createApp } from 'vue'
import App from './App.vue'

import './styles.css'

import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Navbar from './Views/Navbar.vue'


library.add(fas)
const app = createApp(App);


app.component('Navbar', Navbar);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).mount('#app');
