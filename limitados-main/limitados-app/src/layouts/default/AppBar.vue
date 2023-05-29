<template>
  <div></div>
  <v-app-bar :color="theme.colors.background">
    <VBtn variant="plain">
      <VIcon icon="mdi-menu" />
    </VBtn>
    <v-app-bar-title>
      Limitados
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify/lib/framework.mjs';

const theme = useTheme().current
</script>
