<template>
  <img
    v-if="config.brandLogo"
    :src="config.brandLogo"
    alt="StandardTouch Logo"
    class="h-8 w-8 shrink-0 object-cover rounded"
  />
  <StandardTouchIcon v-else class="h-8 w-8 shrink-0 rounded" />
</template>

<script setup lang="ts">
import StandardTouchIcon from "@/assets/logos/StandardTouchIcon.vue";
import { useConfigStore } from "@/stores/config";
const config = useConfigStore();
</script>

<style scoped></style>
