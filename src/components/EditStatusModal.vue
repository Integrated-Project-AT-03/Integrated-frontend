<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getItemById, editItem } from '../assets/fetch.js'
import { onMounted, ref } from 'vue';
import Loading from "../components/Loading.vue";
import TaskStatusManagement from '@/lib/TaskStatusManagement';

// const newDatas = ref({})
const emits = defineEmits(['message'])
const management = ref(TaskStatusManagement)
const datas = ref({})
const uri = import.meta.env.VITE_SERVER_URI;
const router = useRouter();
const route = useRoute();
const isLoading = ref(true)
const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const formattDate = (date) =>
  new Date(date).toLocaleString("en-GB", localZone).replace(",", "");

onMounted(async function () {
    const res = await getItemById(`${uri}/v2/statuses`, route.params.id)
    datas.value = res
    isLoading.value = false;
})  

async function updateStatus(){
    const res = await editItem(`${uri}/v2/statuses`, route.params.id, datas.value)
    if(res.status === 404){
        emits("message", {
            description: `The task does not exist"  `,
            status: "error",
    });
    } else {
        management.value.updateStatus(route.params.id, datas.value)
        emits("message", {
            description: "The task has been deleted",
            status: "success",
    });
    }
    return router.push({ name: 'Statuses'})
}


</script>
 
<template>
<div class="w-screen top-0 h-screen absolute flex justify-center items-center z-10">
    <Loading :is-loading="isLoading"/>
    <div class="m-auto w-[65rem] h-[44rem] bg-neutral rounded-2xl">
        <div class="text-xl mt-4 ml-6">Edit Status</div>
        <div class="divider"></div>
        <div class="itbkk-modal-status flex flex-col gap-4 items-center">
            <div class="flex flex-col gap-2">
                <div >Name</div>
                <input
                class="itbkk-status-name w-[60rem] h-11 rounded-2xl p-3 bg-secondary border-base-100"
                v-model="datas.name"
                />
            </div>
            <div class="flex flex-col gap-2">
                <div>Description</div>
                <textarea
                class="itbkk-status-description w-[60rem] h-[20rem] rounded-2xl border p-4 bg-secondary border-base-100"
                v-model="datas.description"
                ></textarea>
            </div>
        </div>
        <div class="flex justify-between ml-10 mr-10 mt-6">
                <div class="flex gap-3">
                    <div>TimeZone:</div>
                    {{ localZone }}
                </div>
                <div class="flex gap-3">
                    <div>Created On:</div>
                    <div class="itbkk-created-on">
                        <div>Test</div>
                    </div>
                </div>
                <div class="flex gap-3">
                    <div>Updated On:</div>
                    <div class="itbkk-updated-on">
                        <div>Test</div>
                    </div>
                </div>
        </div>
        <div class="divider"></div>
        <div class="flex gap-3 justify-end mr-5">
            <button @click="updateStatus()" class="btn btn-success">Save</button>
            <button @click="router.push({ name: 'Statuses'})" class="btn">Cancel</button>
        </div>
    </div>
</div>
</template>
 
<style scoped>

</style>