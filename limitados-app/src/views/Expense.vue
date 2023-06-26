<script setup lang="ts">
import { Expense } from '@/core/expense/expense';
import { fetchSingleExpense } from '@/core/expense/expense.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const expenseId = route.params.id as string;

const isLoading = ref(false);

const emptyExpense = new Expense({
    id: '',
    value: 0,
    members: [],
    description: '',
    date: new Date(),
    division: {},
    group: {
        id: '',
        name: '',
        members: [],
        description: '',
    }
});
let expense = ref<Expense>(emptyExpense);

const averageExpense = (): number => {
    let participantsFactor = expense.value.members.length - 1;
    if (participantsFactor === 0) {
        participantsFactor = 1;
    }

    return expense.value.value / participantsFactor;
};

function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

async function getExpense() {
    isLoading.value = true;
    expense.value = emptyExpense;
    const result = await fetchSingleExpense(expenseId);
    console.log(result);
    if (result.isOk()) {
        expense.value = result.value;
    }

    isLoading.value = false;
}
getExpense();
</script>

<template>
    <VContainer>
        <div class="d-flex w-100  mt-4 mb-4">
            <h2 class="text-h4 mx-4">Despesas do grupo</h2>
        </div>
        <VTable fixed-header>
            <thead>
                <tr>
                    <th>Usuário</th>
                    <th>Despesa Média</th>
                    <th>Paga</th>
                    <th>Recebe</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in expense.members" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ formatCurrency(averageExpense()) }}</td>
                    <td>{{ formatCurrency(expense.division[user.id].owes) }}</td>
                    <td>{{ formatCurrency(expense.division[user.id].owedBy) }}</td>
                </tr>
            </tbody>
        </VTable>
    </VContainer>
</template>