<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { useLoginWithEmail, useSignUp } from '@/core/user/user.auth'

const router = useRouter()

const theme = useTheme().current

const formIsValid = ref(false)
const name = ref('')
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('')
const errorMessage = ref('');

const loading = ref(false)



const nameRules = [
    (value: string): boolean | string => {
        if (value.length >= 2) return true
        return 'Nome inválido'
    }
]

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

const passwordConfirmationRules = [
    (value: string): boolean | string => {
        if (value != password.value) return 'As senhas não coincidem'
        if (value.length >= 4) return true
        return 'A senha precisa ter ao menos 4 caracteres'
    }
]

async function signUp() {
    loading.value = true
    const result = await useSignUp(name.value, email.value, password.value)

    if (result.isOk()) {
        const autoLogin = await useLoginWithEmail(email.value, password.value)
        if (autoLogin.isOk()) {
            return router.push('/')
        }
        if (autoLogin.isError()) {
            errorMessage.value = autoLogin.err
        }
    }

    if (result.isError()) {
        errorMessage.value = result.err
    }

    loading.value = false

}
</script>

<template>
    <div id="signup-page">
        <VSheet width="360" :color="theme.colors.background" :elevation="24" class="mx-auto px-4 py-4 rounded-xl">
            <VForm v-model="formIsValid" @submit.prevent="(_) => signUp()" :disabled="loading">
                <VTextField v-model="name" type="name" label="Nome" :rules="nameRules"></VTextField>
                <VTextField v-model="email" type="email" label="E-mail" :rules="emailRules"></VTextField>
                <VTextField v-model="password" type="password" label="Senha" :rules="passwordRules"></VTextField>
                <VTextField v-model="passwordConfirmation" type="password" label="Confirme sua senha"
                    :rules="passwordConfirmationRules"></VTextField>
                <VExpandTransition v-show="errorMessage.length != 0">
                    <p class="text-subtitle-1 text-medium-emphasis">
                        <span class="text-red">{{ errorMessage }}</span>
                    </p>
                </VExpandTransition>
                <VBtn type="submit" block class="mt-2" :loading="loading" :disabled="!formIsValid">
                    Criar Conta
                </VBtn>
            </VForm>
            <p class="mt-6 text-caption text-center text-medium-emphasis">
                Já tem uma conta?
            </p>
            <VBtn variant="text" block class="mt-2" @click="(_: any) => $router.push('/login')">
                Fazer Login
            </VBtn>
        </VSheet>
    </div>
</template>

<style scoped>
#signup-page {
    display: flex;
    min-height: 100vh;
    align-items: center;
}
</style>