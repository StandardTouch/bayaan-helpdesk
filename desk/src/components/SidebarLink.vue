<template>
  <div
    class="flex cursor-pointer items-center duration-200 ease-in-out transition-all"
    :class="{
      'w-full h-8 pl-2.5 pr-2 rounded-md': isExpanded,
      'w-8.5 h-8.5 mx-auto justify-center px-0 rounded-md': !isExpanded,
      'shadow-xs bg-white text-[#ED1D24] font-semibold': isActive,
      'border-l-2 border-[#ED1D24]': isActive && isExpanded,
      'text-gray-800': !isActive,
      [bgColor]: isActive,
      [hvColor]: !isActive,
    }"
    @click="handleNavigation"
  >
    <Tooltip :text="label" v-if="!isExpanded">
      <span
        class="flex items-center justify-center shrink-0"
        :class="{
          'text-[#ED1D24]': isActive,
          'text-gray-700': !isActive,
          'icon-emoji': isMobileView,
        }"
      >
        <Icon v-if="typeof icon === 'string'" :icon="icon" class="h-4 w-4" />
        <component :is="icon" v-else class="h-4 w-4" />
      </span>
    </Tooltip>
    <span
      v-else
      class="flex items-center justify-center shrink-0"
      :class="{
        'text-[#ED1D24]': isActive,
        'text-gray-700': !isActive,
        'icon-emoji': isMobileView,
      }"
    >
      <Icon v-if="typeof icon === 'string'" :icon="icon" class="h-4 w-4" />
      <component :is="icon" v-else class="h-4 w-4" />
    </span>

    <div
      v-if="isExpanded"
      class="ml-2 flex shrink-0 grow items-center justify-between text-sm whitespace-nowrap overflow-hidden transition-opacity duration-200"
    >
      <span class="truncate">{{ label }}</span>
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useScreenSize } from "@/composables/screen";

interface P {
  icon: unknown;
  label: string;
  isExpanded?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  to?: string | object;
  bgColor?: string;
  hvColor?: string;
}

const props = withDefaults(defineProps<P>(), {
  isActive: false,
  onClick: () => () => true,
  to: "",
  bgColor: "bg-white",
  hvColor: "hover:bg-gray-100",
});
const router = useRouter();
const { isMobileView } = useScreenSize();

function handleNavigation() {
  props.onClick();
  if (!props.to) return;
  if (
    props.to === router.currentRoute.value.name &&
    !router.currentRoute.value.query.view
  )
    return;
  if (typeof props.to === "string") {
    router.push({
      name: props.to,
    });
    return;
  }
  router.push(props.to);
}
</script>

<style>
.icon-emoji > div {
  @apply flex items-center justify-center;
}
</style>
