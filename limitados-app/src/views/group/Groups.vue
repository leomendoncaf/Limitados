<script lang="ts" setup>
import { Group } from '@/core/group/group';
import { deleteGroup } from '@/core/group/group.service';
import { loadGroupsData } from '@/core/group/group.service';
import { reactive, ref } from 'vue';
import { VAvatar, VBtn, VCard, VCardActions } from 'vuetify/lib/components/index.mjs';
import CreateGroupDialog from '@/components/CreateGroupDialog.vue'

const isCreateDialogOpen = ref(false)
const isLoading = ref(false);

let groups = reactive<Array<Group>>([]);

async function getUserGroups() {
    isLoading.value = true;
    const result = await loadGroupsData();

    if (result.isOk()) {
        groups = result.value;
    }
    isLoading.value = false;
    console.log({ 'loaded': groups })
}

async function deleteUserGroup(groupId: string) {
    await deleteGroup(groupId);
    getUserGroups();
}
getUserGroups()
</script>

<template>
    <div id="#groups-page" class="d-flex flex-column justify-center">
        <div class="h-screen w-100 d-flex align-center justify-center" id="loading-overlay" v-if="isLoading">
            <VProgressCircular indeterminate></VProgressCircular>
        </div>
        <VAppBar color="background">
            <h2 class="text-h4 mx-4">Meus grupos</h2>
            <template v-slot:append>
                <VBtn @click="isCreateDialogOpen = true" class="mx-4" prepend-icon="mdi-plus" variant="tonal">
                    Criar grupo
                    <CreateGroupDialog @success-creation="getUserGroups()">
                    </CreateGroupDialog>
                </VBtn>
            </template>
        </VAppBar>
        <div id="my-groups" class="d-flex align-center flex-column" v-if="groups.length > 0">
            <div>
                <VCard width="400" v-for="(group, index) in groups" :key="group.id" :title="group.name"
                    :text="group.description" variant="tonal" :class="index !== 0 ? 'mt-2' : undefined">
                    <VContainer class="d-flex mb-2">
                        <div class="d-block" v-for="member in group.members" :key="member.id">
                            <VAvatar color="surface-variant mx-2">
                                {{ member.name.at(0) }}
                            </VAvatar>
                            <p class="text-subtitle1 text-center">
                                {{ member.name }}
                            </p>
                        </div>
                    </VContainer>
                    <VCardActions>
                        <VBtn variant="elevated" @click="$router.push(`/grupos/${group.id}`)">
                            Ver despesas
                        </VBtn>
                        <VBtn color="error" variant="text" @click="deleteUserGroup(group.id)">
                            Excluir
                        </VBtn>
                    </VCardActions>
                </VCard>
            </div>
        </div>
        <div v-else class="h-screen d-flex flex-column justify-center align-center mx-4">
            <p>Você não participa de nenhum grupo no momento. Crie um grupo acima.</p>
        </div>
    </div>
</template>