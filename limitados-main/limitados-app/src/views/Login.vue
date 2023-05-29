<script lang="ts" setup>
import { useLoginWithEmail } from '@/core/user/user.auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';

const router = useRouter()

const theme = useTheme().current

const formIsValid = ref(false)
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const emailRules = [
    (value: string): boolean | string => {
        if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return true
        return 'Invalid email'
    }
]

const passwordRules = [
    (value: string): boolean | string => {
        if (value.length >= 4) return true
        return 'A senha precisa ter ao menos 4 caracteres'
    }
]

const loading = ref(false)

async function login() {
    loading.value = true
    errorMessage.value = ''
    const result = await useLoginWithEmail(email.value, password.value)
    if (result.isOk()) {
        return router.push('/');
    }
    if (result.isError()) {
        errorMessage.value = result.err
    }
    loading.value = false
}
</script>

<template>
    <div id="login-page" class="h-48">
        <VSheet width="360" :color="theme.colors.background" :elevation="24" class="mx-auto px-4 py-4 rounded-xl">
            <VForm v-model="formIsValid" @submit.prevent="(_) => login()" :disabled="loading">
                <VTextField v-model="email" type="email" label="E-mail" :rules="emailRules"></VTextField>
                <VTextField v-model="password" type="password" label="Senha" :rules="passwordRules"></VTextField>
                <VExpandTransition v-show="errorMessage.length != 0">
                    <p class="text-subtitle-1 text-medium-emphasis">
                        <span class="text-red">{{ errorMessage }}</span>
                    </p>
                </VExpandTransition>
                <VBtn type="submit" block class="mt-2" :loading="loading" :disabled="!formIsValid">
                    Entrar
                </VBtn>
            </VForm>
            <p class="mt-6 text-caption text-center text-medium-emphasis">
                Não possui uma conta?
            </p>
            <VBtn variant="text" block class="mt-2" @click="(_: any) => $router.push('/signup')">
                Cadastre-se
            </VBtn>
        </VSheet>
    </div>
</template>

<style scoped>
#login-page {
    display: flex;
    min-height: 100vh;
    align-items: center;
}
</style>