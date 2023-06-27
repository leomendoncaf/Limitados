<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import { deleteGroupExpense, fetchGroupExpenses } from '@/core/expense/expense.service';
import { Expense } from '@/core/expense/expense';
import CreateExpenseDialog from '@/components/CreateExpenseDialog.vue';

const route = useRoute();

const groupId = route.params.id;


const isCreateDialogOpen = ref(false)
const isLoading = ref(false);

let expenses = reactive<Array<Expense>>([]);

async function getGroupExpenses() {
    isLoading.value = true;
    if (typeof groupId === 'string') {
        const result = await fetchGroupExpenses(groupId);
        if (result.isOk()) {
            expenses = result.value;
        }
        isLoading.value = false;
        console.log({ 'loaded': expenses })
    }
}

async function deleteExpense(expenseId: string) {
    const result = await deleteGroupExpense(expenseId);
    if (result.isOk()) {
        await getGroupExpenses();
    }
}

getGroupExpenses();
</script>

<template>
    <div id="#groups-page" class="d-flex flex-column justify-center">
        <div class="h-screen w-100 d-flex align-center justify-center" id="loading-overlay" v-if="isLoading">
            <VProgressCircular indeterminate></VProgressCircular>
        </div>
        <VAppBar color="background" height="96">
            <h2 class="text-h4 mx-4">Despesas do grupo</h2>
            <template v-slot:append>
                <div class="d-flex flex-wrap-reverse" style="gap: 0.5em;">
                    <VBtn @click="isCreateDialogOpen = true" class="mx-4" prepend-icon="mdi-plus" variant="tonal">
                        Criar despesa
                        <CreateExpenseDialog @success-expense-creation="getGroupExpenses()">
                        </CreateExpenseDialog>
                    </VBtn>
                    <VBtn @click="$router.push(`/despesas/${groupId}`)" class="mx-4"
                        prepend-icon="mdi-calculator-variant-outline" variant="elevated">
                        Calcular
                    </VBtn>
                </div>
            </template>
        </VAppBar>
        <div class="d-flex w-100 justify-space-between mt-4 mb-4">

        </div>
        <div id="my-groups" class="d-flex align-center flex-column" v-if="expenses.length > 0">
            <div>
                <VCard width="400" v-for="(expense, index) in expenses" :key="expense.id" variant="tonal"
                    :class="index !== 0 ? 'mt-2' : undefined">
                    <VCardTitle class="d-flex justify-space-between">
                        <span>{{ expense.description }}</span>
                        <span class="text-green-lighten-1">
                            {{ expense.value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                minimumFractionDigits: 2
                            }) }}
                        </span>
                    </VCardTitle>
                    <VContainer class="d-flex">
                        <div class="d-block" v-for="member in expense.members" :key="member.id">
                            <VAvatar color="surface-variant mx-2">
                                {{ member.name.at(0) }}
                            </VAvatar>
                            <p class="text-subtitle1 text-center">
                                {{ member.name }}
                            </p>
                        </div>
                    </VContainer>
                    <VCardActions>
                        <VBtn color="error" variant="plain" @click="deleteExpense(expense.id)">
                            Remover
                        </VBtn>
                    </VCardActions>
                </VCard>
            </div>
        </div>
        <div v-else class="h-screen d-flex flex-column justify-center align-center mx-4">
            <p>Nenhuma despesa criada ainda.</p>
        </div>
    </div>
</template>