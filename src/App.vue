<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <!-- point to Component that router is trying to load -->
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout
    }
  },
  created() {
    // restore our token/userId from localStorage
    // this is useful when user manually enters URL in browser or clicks Browser refresh button
    this.$store.dispatch('tryLogin')
  },
  watch: {
    // this is used to make sure user does not stay on protected page when token expires and user auto-logged out
    didAutoLogout(curValue, oldValue) {
      // if true and it changed to true
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/coaches')
      }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}


</style>