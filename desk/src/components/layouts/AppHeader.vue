<template>
  <div class="flex border-b pr-5">
    <div id="app-header" class="flex-1 w-full"></div>
    
    <div class="flex items-center justify-end gap-2">
      <!-- Go to Desk Button -->
<button 
  class="inline-flex items-center justify-center gap-2 transition-colors focus:outline-none text-ink-white bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5 focus-visible:ring focus-visible:ring-outline-gray-3 h-7 text-base px-3 rounded ml-4 mr-4" 
  @click="goToDesk"
>
  <span>Go to Desk</span>
</button>

    </div>
  </div>
</template>

<script setup>
function goToDesk() {
  console.log("Go to Desk button clicked");
  
  // Replace this URL with your actual desk page URL
  const deskURL = 'https://test-bayan.frappe.cloud/app';
  window.location.href = deskURL;
}
</script>

<style scoped>
/* Optional: Add any additional styles if needed */
</style>
