<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import { AGENT_PORTAL_LANDING, CUSTOMER_PORTAL_LANDING } from "@/router";

const router = useRouter();
const authStore = useAuthStore();
const configStore = useConfigStore();

if (authStore.hasDeskAccess) {
  window.location.href = "/app";
} else {
  const target = configStore.preferKnowledgeBase ? "CustomerKnowledgeBase" : CUSTOMER_PORTAL_LANDING;
  router.push({ name: target });
}
</script>
