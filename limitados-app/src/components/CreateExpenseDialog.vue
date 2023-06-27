<script setup lang="ts">
import { loadUserData } from '@/core/user/user.profile';
import { ref } from 'vue';
import { VForm } from 'vuetify/lib/components/index.mjs';
import { onMounted } from 'vue';
import { createExpense } from '@/core/expense/expense.service';
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { fetchGroupById } from '@/core/group/group.service';
import { Group } from '@/core/group/group';
import { User } from '@/core/user/user';
import { reactive } from 'vue';

const route = useRoute();
const groupId = route.params.id as string;
const emit = defineEmits<{
    (event: 'successExpenseCreation', payload: string): void
}>()

const expenseGroup = ref<Group>();

const theme = useTheme().current;

const form = ref<VForm | null>(null)
const amount = ref(0)
const description = ref('')

const selectedUsers = ref<Array<User>>(new Array());
let userAmount = reactive<{ [key: string]: number }>({});

const dialog = ref(false);

const isLoading = ref(false);

const formIsValid = ref(false);

const textRules = [
    (value: string): boolean | string => {
        if (value.length > 0) return true
        return 'O campo não pode ser vazio'
    }
];

const amountRules = [
    (): boolean | string => {
        if (selectedUsers.value.length == 0) {
            return 'É obrigatório selecionar ao menos um participante.';
        }
        return true;
    }
];

onMounted(() => {
    form.value?.reset()
    form.value?.resetValidation()
});

function isUserSelected(user: User): boolean {
    return selectedUsers.value.includes(user);
}

async function loadUser() {
    isLoading.value = true;

    await loadUserData();

    isLoading.value = false;
}

async function loadGroup() {
    const result = await fetchGroupById(groupId);
    if (result.isOk()) {
        expenseGroup.value = result.value;
    }
}

async function createGroupExpense() {
    isLoading.value = true;

    const result = await createExpense({
        groupId: groupId,
        description: description.value,
        members: selectedUsers.value.map(user => user.id),
        memberAmount: userAmount
    });

    console.log(result);
    if (result.isOk()) {
        console.log(result.value);
        emit('successExpenseCreation', 'success');
        amount.value = 0;
        description.value = '';
        userAmount = {};
        dialog.value = false;
    }
    isLoading.value = false;
}

async function initState() {
    await loadUser();
    await loadGroup();
}

initState()
</script>

<template>
    <VDialog activator="parent" width="600" v-model="dialog" persistent>
        <v-card :color="theme.colors.background">
            <VCardTitle>
                <span>Criar Despesa</span>
            </VCardTitle>
            <VForm ref="form" v-model="formIsValid" @submit.prevent="(_) => createGroupExpense()" :disabled="isLoading">
                <VTextField label="Descrição" v-model="description" :rules="textRules"></VTextField>
                <VList>
                    <VCard color="background">
                        <VCardTitle>
                            Participantes
                        </VCardTitle>
                        <VCardText class="d-flex align-center" v-for="member in expenseGroup?.members" :key="member.id">
                            <VCheckbox class="mr-4" :value="member" :label="member.name" v-model="selectedUsers" inline
                                :rules="amountRules">
                            </VCheckbox>
                            <VTextField single-line hide-details type="number" v-model.number="userAmount[member.id]"
                                label="Valor pago" v-if="isUserSelected(member)">
                            </VTextField>
                        </VCardText>
                    </VCard>
                </VList>
            </VForm>

            <!-- <VList>
                <VListItem v-for="member in expenseGroup?.members" :key="member.id" @click="toggleSelectedUser(member)"
                    :value="member.id" :prepend-icon="itemIcon(member)" :base-color="theme.colors.primary"
                    :active="selectedUsers.has(member)">
                    <VListItemTitle>
                        <span>{{ member.name }}</span>
                    </VListItemTitle>
                </VListItem>
            </VList> -->


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