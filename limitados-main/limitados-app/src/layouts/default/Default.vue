<template>
  <v-app>
    <div id="app-scaffold">
      <NavigationDrawer />

      <default-view />
    </div>
    <!-- <default-bar /> -->

  </v-app>
</template>

<script lang="ts" setup>
import NavigationDrawer from './NavigationDrawer.vue'
import DefaultView from './View.vue'
</script>

<style scoped>
#app-scaffold {
  display: inline;
}
</style>
