<script setup lang="ts">
import { User } from '@/core/user/user';
import { loadUserData } from '@/core/user/user.profile';
import { fetchUsers } from '@/core/user/user.service';
import { createGroup } from '@/core/group/group.service';
import { useAppStore } from '@/store/app';
import { reactive } from 'vue';
import { ref } from 'vue';
import { VForm } from 'vuetify/lib/components/index.mjs';
import { onMounted } from 'vue';
import { useTheme } from 'vuetify/lib/framework.mjs';

const emit = defineEmits<{
    (event: 'successCreation', payload: string): void
}>()

const theme = useTheme().current;
const appStore = useAppStore();

const form = ref<VForm | null>(null)
const name = ref('')
const description = ref('')

let allUsers = reactive<Array<User>>([]);

let selectedUsers = reactive<Set<User>>(new Set());

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

const itemIcon = (user: User): string | undefined => {
    const itemIsSelected = selectedUsers.has(user);
    if (itemIsSelected) {
        return 'mdi-check';
    }
    return undefined;
}

function toggleSelectedUser(user: User): void {
    if (user.id == appStore.user.id) {
        selectedUsers.add(user);
        return;
    }
    if (selectedUsers.has(user)) {
        selectedUsers.delete(user);
    } else {
        selectedUsers.add(user);
    }
}
async function loadUsers() {
    isLoading.value = true;

    await loadUserData();

    const result = await fetchUsers();
    if (result.isOk()) {
        allUsers = result.value;
    }

    const currentUser = allUsers.find((user) => user.id = appStore.user.id);
    if (currentUser) {
        selectedUsers.add(currentUser);
    }

    isLoading.value = false;
}

async function createUserGroup() {
    isLoading.value = true;
    const memberIds = new Array<string>();

    for (const user of selectedUsers.values()) {
        memberIds.push(user.id);
    }

    const result = await createGroup({
        name: name.value,
        description: description.value,
        members: memberIds,
    });

    console.log(result);
    if (result.isOk()) {
        console.log(result.value);
        emit('successCreation', result.value.id);
        name.value = '';
        description.value = '';

        dialog.value = false;

    }
    isLoading.value = false;
}

loadUsers();
</script>

<template>
    <VDialog activator="parent" width="600" v-model="dialog" persistent>
        <v-card :color="theme.colors.background">
            <VCardTitle>
                <span>Criar Grupo</span>
            </VCardTitle>
            <VForm ref="form" v-model="formIsValid" @submit.prevent="(_) => createUserGroup()" :disabled="isLoading">
                <VTextField label="Nome" v-model="name" :rules="textRules"></VTextField>
                <VTextField label="Descrição" v-model="description" :rules="textRules"></VTextField>
            </VForm>
            <h3 class="text-h6 mx-3">Participantes</h3>
            <VList>
                <VListItem v-for="member in allUsers" :key="member.id" @click="toggleSelectedUser(member)"
                    :title="member.name" :value="member.id" :prepend-icon="itemIcon(member)"
                    :base-color="theme.colors.primary" :active="selectedUsers.has(member)">
                </VListItem>
            </VList>

            <v-card-actions>
                <VSpacer></VSpacer>
                <v-btn @click="dialog = false" :disabled="isLoading">
                    Fechar
                </v-btn>
                <VBtn type="submit" @click="createUserGroup()" variant="elevated" :loading="isLoading"
                    :disabled="!formIsValid">
                    Salvar
                </VBtn>
            </v-card-actions>
        </v-card>
    </VDialog>
</template>