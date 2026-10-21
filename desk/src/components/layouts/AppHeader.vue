<template>
  <div class="flex border-b border-gray-200 bg-white pr-4 h-12 items-center pe-5 rtl:pe-6">
    <div id="app-header" class="flex-1 w-full"></div>
    
    <div class="flex items-center justify-end gap-2 shrink-0">
      <div class="flex items-start justify-center">
        <CallUI :userEmail="user" />
      </div>

      <!-- Go to Home Desk View Button -->
      <button 
        class="inline-flex items-center justify-center gap-1.5 transition-all text-white bg-[#0087b9] hover:bg-[#00739e] active:bg-[#005f83] font-semibold text-xs px-3.5 py-1.5 rounded-md ml-2 shadow-xs cursor-pointer border-0" 
        @click="goToDesk"
        title="Go to Home Desk view"
      >
        <svg class="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span>Home Desk &rarr;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import CallUI from "@/components/telephony/CallUI.vue";
import { useAuthStore } from "@/stores/auth";
import { useTelephonyStore } from "@/stores/telephony";
import { onMounted } from "vue";

const { user } = useAuthStore();
const telephonyStore = useTelephonyStore();

onMounted(() => {
  telephonyStore.fetchCallIntegrationStatus();
});

function goToDesk() {
  window.location.href = '/app';
}
</script>
