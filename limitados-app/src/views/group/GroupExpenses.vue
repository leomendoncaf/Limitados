<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import { fetchGroupExpenses } from '@/core/expense/expense.service';
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

getGroupExpenses();
</script>

<template>
    <div id="#groups-page" class="d-flex flex-column justify-center">
        <div class="h-screen w-100 d-flex align-center justify-center" id="loading-overlay" v-if="isLoading">
            <VProgressCircular indeterminate></VProgressCircular>
        </div>
        <div class="d-flex w-100 justify-space-between mt-4 mb-4">
            <h2 class="text-h4 mx-4">Despesas do grupo</h2>
            <VBtn @click="isCreateDialogOpen = true" class="mx-4" prepend-icon="mdi-plus" variant="tonal">
                Criar despesa
                <CreateExpenseDialog @success-expense-creation="getGroupExpenses()">
                </CreateExpenseDialog>
            </VBtn>
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
                    <VContainer class="d-flex mb-2">
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
                        <VBtn variant="elevated" @click="$router.push(`/despesas/${expense.id}`)">
                            Ver detalhes
                        </VBtn>
                    </VCardActions>
                </VCard>
            </div>
        </div>
        <div v-else class="h-screen d-flex flex-column justify-center align-center">
            <p>Você não participa de nenhum grupo no momento. Crie um grupo acima.</p>
        </div>
    </div>
</template>