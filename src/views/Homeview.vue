<script setup>
import { onMounted, ref, watch } from "vue";
import TaskManagement from "./../lib/TaskManagement.js";
import { useRoute } from "vue-router";
import { getItems } from "./../assets/fetch.js";
import Cancel from "@/components/cancel.vue";

const datas = ref(TaskManagement);
const uri = import.meta.env.VITE_SERVER_URI;
const route = useRoute();
onMounted(async function () {
  const data = await getItems(`${uri}/v1/tasks`);
  datas.value.setTasks(data);
});
</script>

<template>
  <div
    class="container mx-auto flex flex-col gap-3"
    :class="route.params.id && 'blur-sm'"
  >
    <div class="text-5xl font-extrabold ... w-full flex justify-center m-7">
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
      >
        <div class="text-4xl">IT-Bangmod Kradan Kanban</div>
      </span>
    </div>

    <div class="itbkk-button-add flex flex-col justify-start">
  <div class="border border-green-300 rounded-lg p-2 bg-green-50 relative shadow-md">
    <div class="mr-2 text-green-700 font-bold flex items-center justify-between">
      <span>Success</span>
    </div>
    <div class="itbkk-message text-green-600">The task "Frontend UX/UI Design" is added successfully</div>
    <Cancel class="absolute top-2 right-1 transform rotate-40 text-green-800 font-extrabold"/>
  </div>
</div>


    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-200">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-base-100 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-base-100 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-base-100 uppercase tracking-wider"
          >
            Assignees
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-base-100 uppercase tracking-wider"
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody class="bg-slate-100 divide-y divide-gray-300">
        <tr v-show="datas.getTasks().length === 0">
          <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-900">
            No task
          </td>
        </tr>
        <tr
          class="itbkk-item hover:bg-slate-200"
          v-for="(data, index) in datas.getTasks()"
          :key="index"
          @click="$router.push({ name: 'TaskDetail', params: { id: data.id } })"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ data.id }}</div>
          </td>
          <td class="itbkk-title px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ data.title }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div
              class="text-sm text-gray-900 itbkk-assignees"
              :class="data?.assignees === '' && 'italic'"
            >
              {{ data?.assignees !== "" ? data.assignees : "Unassigned" }}
            </div>
          </td>
          <td class="itbkk-status px-6 py-4 whitespace-nowrap">
            <div
              class="flex justify-center w-20 p-2 rounded-xl text-slate-200"
              :class="
                data.status === 'No Status'
                  ? 'text-sm bg-red-400'
                  : data.status === 'To Do'
                  ? 'text-sm bg-yellow-500'
                  : data.status === 'Doing'
                  ? 'text-sm bg-blue-500'
                  : data.status === 'Done'
                  ? 'text-sm bg-success'
                  : 'text-gray-300'
              "
            >
              {{ data.status }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="itbkk-button-add flex flex-col justify-start">
  <div class="border border-red-300 rounded-lg p-2 bg-red-50 relative shadow-md">
    <div class="mr-2 text-red-700 font-bold flex items-center justify-between">
      <span>Error</span>
    </div>
    <div class="itbkk-message text-red-600">An error occurred deleting the task "Frontend UX/UI Design"</div>
    <Cancel class="absolute top-2 right-1 transform rotate-40 text-red-800 font-extrabold"/>
  </div>
</div>


<br>

<div class="flex flex-col  border border-black rounded-lg p-4 bg-white h-auto w-fit">
  <div class="text-2xl text-black font-bold border-b border-gray-300 pb-4">Delete a Task</div>
  <br>
  <div class="itbkk-message text-black border-b border-gray-300 pb-4">Do you want to delete the task "_Infrastructure_"?</div>
  <div class="flex justify-end mt-4">
    <button class="itbkk-button-cancel px-4 py-2 bg-red-500 text-white rounded-lg mr-2 border-b-2 border-gray-200 shadow-md">Cancel</button>
    <button class="itbkk-button-confirm px-4 py-2 bg-green-500 text-white rounded-lg border-b-2 border-gray-200 shadow-md">Confirm</button>
  </div>
</div>


</template>

<style scoped></style>
