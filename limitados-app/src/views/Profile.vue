<script lang="ts" setup>
import { useAppStore } from '@/store/app';
import { reactive, ref } from 'vue';
import { VAvatar } from 'vuetify/lib/components/index.mjs';
import { loadUserData } from '@/core/user/user.profile'
import { computed } from 'vue';
const profilePlaceholder = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

const appStore = useAppStore()

const loading = ref(false)

interface UserProfile {
    image?: string;
    name: string;
    balance: number;
}

let userProfile: UserProfile = reactive({
    image: profilePlaceholder,
    name: '',
    balance: 0
})

const userBalance = computed(() => userProfile.balance.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
}),)

function checkStore() {

    console.log(appStore.user)
}

async function loadUserProfile() {
    loading.value = true
    const result = await loadUserData()

    if (result.isOk()) {
        userProfile = {
            image: profilePlaceholder,
            name: appStore.user.name,
            balance: appStore.user.balance ?? 0,
        }
    }

    loading.value = false
}

loadUserProfile()

</script>

<template>
    <transition name="fade-transition">
        <div>
            <div class="h-screen" id="loading-overlay" v-if="loading">
                <VProgressCircular indeterminate></VProgressCircular>
            </div>
            <div id="profile-page" v-if="!loading">
                <VAvatar color="suface-variant" size="80" :image="userProfile.image" class="mt-10 mb-2" />
                <h2 class="mb-4">{{ userProfile.name }}</h2>
                <div class="balance">
                    <v-icon icon="mdi-cash" color="success"></v-icon>
                    <h3 class="currency">{{ userBalance }}
                    </h3>
                    <VBtn icon="mdi-plus" variant="tonal" @click="(_: any) => checkStore()" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
#loading-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
}

#profile-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.balance {
    display: flex;
    gap: 0.3rem;
    align-items: center;
}

.currency {
    display: inline-block;
}
</style>