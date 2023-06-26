<script setup lang="ts">
import { loadUserData } from '@/core/user/user.profile';
import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import { VForm } from 'vuetify/lib/components/index.mjs';
import { onMounted } from 'vue';
import { createExpense } from '@/core/expense/expense.service';
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';

const route = useRoute();
const groupId = route.params.id as string;
const emit = defineEmits<{
    (event: 'successExpenseCreation', payload: string): void
}>()

const theme = useTheme().current;

const appStore = useAppStore();

const form = ref<VForm | null>(null)
const amount = ref(0)
const description = ref('')

const dialog = ref(false);

const isLoading = ref(false);

const formIsValid = ref(false);

const textRules = [
    (value: string): boolean | string => {
        if (value.length > 0) return true
        return 'O campo não pode ser vazio'
    }
]

onMounted(() => {
    form.value?.reset()
    form.value?.resetValidation()
})


async function loadUser() {
    isLoading.value = true;

    await loadUserData();

    isLoading.value = false;
}

async function createGroupExpense() {
    isLoading.value = true;

    const result = await createExpense({
        value: amount.value,
        description: description.value,
        groupId: groupId,
        userId: appStore.user.id,
    });

    console.log(result);
    if (result.isOk()) {
        console.log(result.value);
        emit('successExpenseCreation', 'success');
        amount.value = 0;
        description.value = '';

        dialog.value = false;

    }
    isLoading.value = false;
}

loadUser();
</script>

<template>
    <VDialog activator="parent" width="600" v-model="dialog" persistent>
        <v-card :color="theme.colors.background">
            <VCardTitle>
                <span>Criar Despesa</span>
            </VCardTitle>
            <VForm ref="form" v-model="formIsValid" @submit.prevent="(_) => createGroupExpense()" :disabled="isLoading">
                <VTextField label="Valor" v-model="amount" :rules="textRules"></VTextField>
                <VTextField label="Descrição" v-model="description" :rules="textRules"></VTextField>
            </VForm>

            <v-card-actions>
                <VSpacer></VSpacer>
                <v-btn @click="dialog = false" :disabled="isLoading">
                    Fechar
                </v-btn>
                <VBtn type="submit" @click="createGroupExpense()" variant="elevated" :loading="isLoading"
                    :disabled="!formIsValid">
                    Salvar
                </VBtn>
            </v-card-actions>
        </v-card>
    </VDialog>
</template>