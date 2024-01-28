<template>
    <div class="my-navbar">
        <nav>
            <img src="@\assets\money-us-logo.png" >
            <h2>
                <router-link :to="{name: 'home'}">
                    Money-us
                </router-link>
                <router-link class="play-list" v-if="user" :to="{name: 'create-playlist'}">
                    <font-awesome-icon icon="circle-plus" />
                </router-link>
            </h2>
            <div class="links">
                <div v-if="user" class="welcome">
                    <span class="username">{{ user.displayName }}</span>
                </div>
                <div class="action">
                    <button v-if="user" @click="handleLogout">
                        <font-awesome-icon icon="fa-solid fa-sign-out" />
                        <!-- <font-awesome-icon icon="sign-out" /> -->
                    </button>
                    <router-link class="btn" v-if="!user" :to="{name: 'signup'}">Signup</router-link>
                    <router-link class="btn" v-if="!user" :to="{name: 'login'}">Log in</router-link>
                </div>
                
            </div>
        </nav>
    </div>
  </template>
  
<script>
import router from '@/router';
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';


export default {
setup() {
    const {logout} = useLogout();
    const {user} = getUser();
     
    const handleLogout = async () => {
        await logout();
        router.push({name: 'login'});
    }

    

    return {handleLogout, user}
}
}
</script>

<style scoped>
    .my-navbar {
        padding: 16px 8px;
        margin-bottom: 40px;
        background: white;
    }
    nav {
        display: flex;
        align-items: center;
        /* max-width: 1000px; */
        margin: 0 auto;
    }
    nav h1 {
        margin-left: 8px;
        
    }
    nav .links {
        margin-left: auto;
        display: flex;
        align-items: center;
    }
    nav .links a, button {
        margin-left: 8px;
        font-size: 1rem;
    }

    img {
        height: 40px;
    }

    .welcome {
        display: inline-block;
        font-style: italic;
    }

    .welcome .username {
        font-style: normal;
        font-weight: 600;
    }

    .links .action {
        display: flex;
        justify-content: center;
        margin-left: -10px;
    }

    .links .action button {
        background: transparent;
        font-style: italic;
    }

    .links .action button:hover {
        color: grey;
    }

    h2 a {
        font-size: 1.5rem;
    }

    .play-list {
        margin-right: 16px;
    }
    
</style>