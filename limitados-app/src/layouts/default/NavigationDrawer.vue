<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';

const theme = useTheme().current

const appStore = useAppStore()
const route = useRoute()
const router = useRouter();
const isAuthenticated = computed(() => appStore.isAuthenticated)

interface NavigationDestination {
    name: string;
    path: string;
    icon: string;
}

const navigationDestinations: NavigationDestination[] = [
    { name: 'Grupos', path: '/grupos', icon: 'mdi-account-group' },
    { name: 'Perfil', path: '/perfil', icon: 'mdi-account' },
    { name: 'Estatísticas', path: '/estatisticas', icon: 'mdi-chart-line' },
]

function selectedDestination(destination: NavigationDestination) {
    return route.fullPath.includes(destination.path);
}

function navigateTo(destination: NavigationDestination) {
    router.push(destination.path)
}

function logout() {
    appStore.logout()
    router.push('/login')
}

</script>

<template>
    <v-navigation-drawer expand-on-hover rail permanent v-if="isAuthenticated" :color="theme.colors.background">
        <v-list>
            <v-list-item prepend-icon="mdi-home" title="Início" @click="(_: any) => $router.push('/')"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav :selected="navigationDestinations">
            <VListItem v-for="(destination, i) in navigationDestinations" :key="i" :prepend-icon="destination.icon"
                :title="destination.name" :value="destination.path" rounded="xl" :active="selectedDestination(destination)"
                @click="(_: any) => navigateTo(destination)">
            </VListItem>
        </v-list>
        <VDivider />
        <v-list density="compact">
            <v-list-item prepend-icon="mdi-logout" title="Sair" value="logout" @click="(_: any) => logout()"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>