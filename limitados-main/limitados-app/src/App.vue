<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-x-transition">
      <component :is="Component" :key="route" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
  //
</script>
