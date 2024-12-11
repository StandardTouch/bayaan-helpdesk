<template>
  <div class="flex items-center justify-end gap-2 border-b pr-5">
    <!-- Create Button -->
<button 
  class="inline-flex items-center justify-center gap-2 transition-colors focus:outline-none text-ink-white bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5 focus-visible:ring focus-visible:ring-outline-gray-3 h-7 text-base px-3 rounded mt-4 mb-4"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
    <path d="M12 5v14"></path>
    <path d="M5 12h14"></path>
  </svg>
  <span>Create</span>
</button>

    <!-- Go to Desk Button -->
    <button 
      class="inline-flex items-center justify-center gap-2 transition-colors focus:outline-none text-ink-white bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5 focus-visible:ring focus-visible:ring-outline-gray-3 h-7 text-base px-3 rounded"
      @click="goToDesk"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
      <span>Go to Desk</span>
    </button>
  </div>
</template>

<script setup>
function goToDesk() {
  const deskURL = 'https://test-bayan.frappe.cloud/app';
  window.location.href = deskURL;
}
</script>

<style scoped>
/* Optional: Add any additional styles if needed */
</style>

