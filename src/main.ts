import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './models/save-state'

createApp(App).use(store).use(router).mount('#app')
