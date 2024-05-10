<script setup>
import { onMounted, ref } from "vue";
const selectStatus = ref();
import { getItems, changeTasksStatus } from "../assets/fetch.js";
const uri = import.meta.env.VITE_SERVER_URI;
const props = defineProps({
  selectedStatus: Object,
});
const newIdStatus = ref(1);
const emits = defineEmits(["close", "message"]);
onMounted(async () => {
  selectStatus.value = await getItems(`${uri}/v2/statuses`);
});
const submit = async () => {
  const res = await changeTasksStatus(
    `${uri}/v2/tasks/status`,
    props.selectedId,
    newIdStatus.value
  );

  if (res === 500) {
    emits("message", {
      description: "something went wrong",
      status: "error",
    });
  } else if (res === 404) {
    emits("message", {
      description: "status donse't exist",
      status: "error",
    });
  } else {
    emits("message", {
      description: "The status has been transfer",
      status: "success",
    });
  }
  emits("close");
};
</script>

<template>
  <div
    class="w-full top-0 h-full absolute flex justify-center items-center z-20"
  >
    <div
      class="relative overflow-hidden w-max h-max py-4 px-10 bg-neutral drop-shadow-2xl rounded-2xl"
    >
      <div class="text-xl font-semibold">Transfer a Status</div>
      <div class="divider"></div>
      <div class="flex flex-col">
        <div class="itbkk-message">
          There is some task associated with the
          {{ selectedStatus.name }} status.
        </div>
        <div class="flex items-center gap-3">
          <div class="itbkk-status">Transfer to</div>
          <select
            v-model="newIdStatus"
            class="itbkk-status select w-48 max-w-xs bg-base-100"
          >
            <option
              :disabled="selectedStatus.id === status.id"
              v-for="status in selectStatus"
              :key="status.id"
              :value="status.id"
            >
              {{ status.name }}
            </option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="flex justify-end">
          <button
            @click="$emit('close')"
            class="itbkk-button-cancel btn btn-danger w-16 hover:bg-base-100 hover:border-base-100 mr-3"
          >
            Cancel
          </button>
          <button
            :disabled="selectStatus === selectedId"
            @click="submit"
            class="itbkk-button-comfirm btn btn-success w-16 hover:bg-base-100 hover:border-base-100 ml-1"
          >
            Transfer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>