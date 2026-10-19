<template>
  <div class="flex items-center justify-start gap-4 border-b p-5">
    <Avatar size="3xl" :image="contact.image" :label="contactDisplayName" />
    <div class="flex items-center justify-between flex-1">
      <div class="flex-1 min-w-0 pr-2">
        <Tooltip :text="contactDisplayName">
          <div class="truncate text-xl font-medium text-gray-900">
            {{ contactDisplayName }}
          </div>
        </Tooltip>
        <div v-if="companyDisplayName" class="text-xs text-gray-500 font-semibold truncate mt-0.5 flex items-center gap-1">
          <svg class="h-3 w-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <span class="truncate">{{ companyDisplayName }}</span>
        </div>
      </div>
      <div class="flex gap-1.5" v-if="contact.email_id">
        <Tooltip :text="contact.email_id">
          <Button class="h-7 w-7" @click="openEmailBox()">
            <EmailIcon class="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Tooltip, Avatar } from "frappe-ui";
import { EmailIcon } from "@/components/icons/";

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
  company: {
    type: String,
    default: "",
  },
});

const contactDisplayName = computed(() => {
  return props.contact.full_name || props.contact.name || "";
});

const companyDisplayName = computed(() => {
  return props.company || props.contact.company_name || "";
});

const emit = defineEmits(["email:open"]);

function openEmailBox() {
  emit("email:open", props.contact.email_id);
}
</script>
