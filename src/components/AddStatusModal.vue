<script setup>
import { useRouter } from "vue-router";
import { addItem } from "../assets/fetch.js";
import TaskStatusManagement from "@/lib/TaskStatusManagement.js";
import { ref } from "vue";
import colorStore from "./../lib/ColorsStore";

const emits = defineEmits(["message"]);
const datas = ref(TaskStatusManagement);
const uri = import.meta.env.VITE_SERVER_URI;
const router = useRouter();
const newData = ref({
  colorId: "",
  name: "",
  description: "",
});

async function addNewStatus() {
  console.log(newData.value);
  const res = await addItem(`${uri}/v2/statuses`, newData.value);
  if (res.status === 500 || res.status === 400) {
    emits("message", {
      description: "Something went wrong",
      status: "error",
    });
  } else {
    datas.value.addStatus(res);
    emits("message", {
      description: `The status has been successfully added`,
      status: "success",
    });
  }
  router.push({ name: "Statuses" });
}
</script>

<template>
  <div
    class="w-screen h-screen absolute top-0 flex justify-center items-center z-10"
  >
    <div
      class="relative overflow-hidden w-[65rem] h-[49rem] bg-neutral drop-shadow-2xl rounded-2xl"
    >
      <br />
      <div class="text-xl mt-4 ml-6">Add Status</div>
      <div class="itbkk-modal-status">
        <div class="divider"></div>

        <div class="flex flex-col gap-3">
          <div class="itbkk-status-name ml-12">Name</div>
          <div class="flex justify-center">
            <input
              v-model.trim="newData.name"
              class="itbkk-title w-[60rem] h-[3rem] rounded-2xl p-2 bg-secondary border-base-100"
              placeholder="Please Write Name"
            />
          </div>

          <div class="itbkk-status-description ml-12">Description</div>
          <div class="flex justify-center">
            <textarea
              v-model.trim="newData.description"
              class="itbkk-title w-[60rem] h-[20rem] rounded-2xl p-2 bg-secondary border-base-100"
              placeholder="Please Write Description"
            ></textarea>
          </div>

          <div class="itbkk-status-color ml-12">Color</div>

          <div class="flex justify-center">
            <div
              class="color-picker-container flex flex-wrap gap-2 items-center"
            >
              <div
                v-for="color in colorStore"
                :key="color.id"
                class="color-picker-item flex items-center cursor-pointer relative"
                @click="() => (newData.colorId = color.id)"
              >
                <div
                  :style="{ backgroundColor: color.hex }"
                  :class="
                    newData.colorId === color.id &&
                    'border-[4px] border-purple-500'
                  "
                  class="color-box w-8 h-8 rounded-full border border-gray-300 mt-2 relative"
                ></div>
                <span class="ml-2">{{ color.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="divider"></div>
        <div class="flex justify-end mt-4 mr-4 gap-3">
          <button
            @click="addNewStatus(newData)"
            class="itbkk-button-comfirm btn btn-success w-16 hover:bg-base-100 hover:border-base-100"
          >
            Save
          </button>
          <button
            @click="router.push({ name: 'Statuses' })"
            class="itbkk-button-cancle btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>