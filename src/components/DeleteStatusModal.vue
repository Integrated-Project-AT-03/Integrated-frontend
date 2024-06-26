<script setup>
import { useRouter } from "vue-router";
import { deleteItemById } from "../lib/fetch.js";
import StatusManager from "@/lib/StatusManagement";
import { ref } from "vue";
import Button from "./ButtonModal.vue";

const props = defineProps({
  sourceStatus: {
    type: Object,
  },
});
const emits = defineEmits(["message", "conflict", "update:modelValue"]);
const router = useRouter();
const datas = ref(StatusManager);
const uri = import.meta.env.VITE_SERVER_URI;

async function deleteStatus(id) {
  emits("update:modelValue", true);
  const res = await deleteItemById(`${uri}/v2/statuses`, id);
  emits("update:modelValue", false);
  if (res.httpStatus === 200) {
    datas.value.deleteStatus(id);
    emits("message", {
      description: "The task has been deleted",
      status: "success",
    });
  } else if (res.status === 422) {
    emits("message", {
      description: `${res.message}`,
      status: "error",
    });
  } else if (res.status === 400) {
    emits("conflict");
  } else if (res.status === 404) {
    datas.value.deleteStatus(id);
    emits("message", {
      description: `An error has occurred, the status does not exist.`,
      status: "error",
    });
  }

  return router.push({ name: "Status" });
}
</script>
<template>
  <dialog id="deleteModal" class="modal">
    <div class="flex flex-col rounded-lg p-6 bg-neutral h-auto w-fit">
      <div class="text-2xl font-bold text-slate-300">Delete a Status</div>
      <div class="divider"></div>
      <div class="itbkk-message text-slate-300">
        Do you want to delete the {{ sourceStatus.name }} status
        {{ sourceStatus.index + 1 }}
      </div>
      <div class="divider"></div>
      <div class="flex justify-end mt-4 gap-3">
        <form method="dialog">
          <Button
            class="itbkk-button-confirm"
            bgcolor="#16a34a"
            message="Confirm"
            @click="deleteStatus(sourceStatus.id)"
          />
        </form>
        <form method="dialog">
          <Button
            class="itbkk-button-cancel"
            bgcolor="#ef4444"
            message="Cancel"
          />
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>
@/lib/StatusManagement.js
