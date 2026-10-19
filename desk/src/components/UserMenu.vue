<template>
  <Dropdown :options="options">
    <template #default="{ open }">
      <button
        class="flex h-12 items-center rounded-md py-2 duration-300 ease-in-out cursor-pointer border-0 bg-transparent"
        :class="
          !sidebarStore.isExpanded
            ? 'w-full justify-center px-0'
            : open
            ? 'w-52 bg-white px-2 shadow-sm'
            : 'w-52 px-2 hover:bg-gray-200'
        "
      >
        <BrandLogo />
        <div
          v-if="sidebarStore.isExpanded"
          class="flex flex-1 flex-col text-left ml-2 duration-300 ease-in-out overflow-hidden"
        >
          <div class="text-sm font-bold leading-none font-heading tracking-tight truncate">
            <span class="text-[#ED1D24]">Standard</span><span class="text-gray-900">Touch</span>
          </div>
          <div class="mt-1 text-xs leading-none text-gray-500 font-medium truncate">
            {{ authStore.userName || "Customer Portal" }}
          </div>
        </div>
        <div
          v-if="sidebarStore.isExpanded"
          class="ml-2 duration-300 ease-in-out shrink-0"
        >
          <FeatherIcon
            name="chevron-down"
            class="h-4 w-4 text-gray-600"
            aria-hidden="true"
          />
        </div>
      </button>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { Dropdown, Avatar } from "frappe-ui";
import { useAuthStore } from "@/stores/auth";
import { useSidebarStore } from "@/stores/sidebar";
import { useConfigStore } from "@/stores/config";
import BrandLogo from "@/components/BrandLogo.vue";

const config = useConfigStore();

defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
</script>
