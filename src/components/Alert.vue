<script setup>
import Status from "@/lib/Status";
import CorrectIcon from "./../assets/icons/CorrectIcon.vue";
import ErrorIcon from "./../assets/icons/ErrorIcon.vue";
import { ref } from "vue";
const status = ref(Status);
</script>

<template>
  <div
    :role="status.type"
    class="alert relative"
    :class="[
      status.type === 'success' && 'alert-success',
      status.type === 'error' && 'alert-error',
    ]"
  >
    <div class="absolute btn btn-xs btn-error text-white right-3">x</div>
    <CorrectIcon v-show="status.type === 'success'" />
    <ErrorIcon v-show="status.type === 'error'" />
    <span class="tbkk-message"> {{ status.message }} </span>
  </div>
</template>
