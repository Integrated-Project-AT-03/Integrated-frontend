<script setup>

import { defineProps } from 'vue';

const props = defineProps({
  bgcolor: {
    type: String
  },
  message: {
    type: String
  }
})
const background = props.bg
const message = props.message

</script>

<template>

  <button class="btn" :style="{ backgroundColor: props.bgcolor }">
    {{ props.message }}
  </button>

</template>