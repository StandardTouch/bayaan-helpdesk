<template>
  <div class="flex border-b h-12 items-center pr-3">
    <div class="z-20 -mr-4 ml-1 flex items-center justify-center">
      <Button variant="ghosted" @click="sidebarOpened = !sidebarOpened">
        <FeatherIcon name="menu" class="size-4" />
      </Button>
    </div>
    <header id="app-header" class="flex-1 w-full"></header>
    <button 
      class="inline-flex items-center justify-center gap-1 transition-all text-white bg-[#ED1D24] hover:bg-[#d0171d] active:bg-[#b81016] font-semibold text-[11px] px-2.5 py-1 rounded-md shadow-xs cursor-pointer border-0 shrink-0" 
      @click="goToDesk"
      title="Go to Home Desk view"
    >
      <svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      <span>Home Desk</span>
    </button>
  </div>
</template>

<script setup>
import { mobileSidebarOpened as sidebarOpened } from "@/composables/mobile";

function goToDesk() {
  window.location.href = '/app';
}
</script>
