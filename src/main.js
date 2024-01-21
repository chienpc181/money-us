import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { projectAuth } from './firebase/config'
import '@fortawesome/fontawesome-free/css/all.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignOut, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

library.add([faSignOut, faCirclePlus])

let app

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
        .component('font-awesome-icon', FontAwesomeIcon)
        .use(router)
        .mount('#app')
    }
})