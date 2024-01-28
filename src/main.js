import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap/js/dist/modal'
import { projectAuth } from './firebase/config'
import '@fortawesome/fontawesome-free/css/all.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignOut, faCirclePlus, faRemove, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './assets/main.css'

library.add([faSignOut, faCirclePlus, faRemove, faPlusSquare])

let app

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
        .component('font-awesome-icon', FontAwesomeIcon)
        .use(router)
        .mount('#app')
    }
})