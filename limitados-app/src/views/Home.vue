<script lang="ts" setup>
import { VBtn } from 'vuetify/lib/components/index.mjs';

</script>

<template>
  <div id="home-body">
    <VBtn @click="(_: any) => $router.push('/grupos')" prepend-icon="mdi-account-group-outline" variant="outlined">
      Grupos
    </VBtn>
    <VBtn @click="(_: any) => $router.push('/perfil')" prepend-icon="mdi-account" variant="outlined">
      Perfil
    </VBtn>
    <!-- <VBtn @click="(_: any) => $router.push('/estatisticas')" prepend-icon="mdi-chart-line" variant="outlined">
      Estatísticas
    </VBtn> -->
  </div>
</template>

<style scoped>
#home-body {
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}
</style>