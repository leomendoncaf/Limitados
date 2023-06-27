<script setup lang="ts">
import { Expense } from '@/core/expense/expense';
import { UserBalance, calculateExpenses } from '@/core/expense/expense.calculator';
import { fetchGroupExpenses } from '@/core/expense/expense.service';
import { Group } from '@/core/group/group';
import { fetchGroupById } from '@/core/group/group.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const groupId = route.params.id as string;

const group = ref<Group>({
    description: '',
    id: '',
    members: [],
    name: ''
});
const isLoading = ref(false);

let expenses = ref<Expense[]>([]);

const allExpenses = ref<{
    total: number,
    average: number,
    balances: { [key: string]: UserBalance }
}>({ total: 0, average: 0, balances: {} });

function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

async function getGroup() {
    const result = await fetchGroupById(groupId)
    if (result.isOk()) {
        group.value = result.value;
    }
}

async function getExpense() {
    isLoading.value = true;

    const result = await fetchGroupExpenses(groupId);
    console.log(result);
    if (result.isOk()) {
        expenses.value = result.value;
    }

    isLoading.value = false;
}

async function initState() {
    await getGroup();
    await getExpense();
    allExpenses.value = calculateExpenses(group.value, expenses.value);
}

initState()
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
                    <th>Valor gasto</th>
                    <th>Despesa Média</th>
                    <th>Paga</th>
                    <th>Recebe</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in group.members" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ formatCurrency(allExpenses.balances[user.id].original) }}</td>
                    <td>{{ formatCurrency(allExpenses.average) }}</td>
                    <td>{{ formatCurrency(allExpenses.balances[user.id].pay) }}</td>
                    <td>{{ formatCurrency(allExpenses.balances[user.id].receive) }}</td>
                </tr>
            </tbody>
        </VTable>
    </VContainer>
</template>