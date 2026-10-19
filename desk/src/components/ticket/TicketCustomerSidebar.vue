<template>
  <div class="flex w-[382px] flex-col border-l gap-4">
    <!-- Ticket ID -->
    <div class="flex items-center justify-between border-b px-5 py-3">
      <span class="cursor-copy text-lg font-semibold">Ticket details</span>
    </div>
    <!-- user info and sla info -->
    <div class="flex flex-col gap-4 pt-0 px-5 py-3 border-b">
      <!-- user info -->
      <div class="flex gap-2">
        <Avatar
          size="2xl"
          :image="ticket.data.contact?.image"
          :label="ticketOpenerName"
        />
        <div class="flex items-center justify-between flex-1">
          <div class="flex-1 min-w-0 pr-2">
            <Tooltip :text="ticketOpenerName">
              <div class="truncate text-xl font-medium text-gray-900">
                {{ ticketOpenerName }}
              </div>
            </Tooltip>
            <div v-if="ticketCompanyName" class="text-xs text-gray-500 font-semibold truncate mt-0.5">
              {{ ticketCompanyName }}
            </div>
          </div>
          <div class="flex gap-1.5" v-if="!ticket.data.feedback_rating && ticket.data.contact?.email_id">
            <Tooltip :text="ticket.data.contact.email_id">
              <Button class="h-7 w-7" @click="emit('open')">
                <EmailIcon class="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <!-- Ticket Info -->
      <div
        class="flex items-center text-base leading-5"
        v-for="field in ticketBasicInfo"
        :key="field.label"
      >
        <span class="w-[126px] text-sm text-gray-600">{{ field.label }}</span>
        <span class="text-base text-gray-800 flex-1">
          {{ field.value }}
        </span>
      </div>

      <!-- sla info -->
      <div
        v-for="data in slaData"
        :key="data.label"
        class="flex items-center text-base"
      >
        <div class="w-[126px] text-gray-600 text-sm">{{ data.title }}</div>

        <div class="break-words text-base text-gray-800">
          <Tooltip :text="dayjs(data.value).long()">
            <Badge :label="data.label" :theme="data.theme" variant="outline" />
          </Tooltip>
        </div>
      </div>
    </div>
    <!-- feedback component -->
    <TicketFeedback
      v-if="ticket.data.feedback_rating"
      class="border-b text-base text-gray-600"
      :ticket="ticket.data"
    />
    <div class="flex flex-col gap-4 pt-0 px-5 py-3">
      <div
        class="flex items-center text-base leading-5"
        v-for="field in ticketAdditionalInfo"
      >
        <span class="w-[126px] text-sm text-gray-600">{{ field.label }}</span>
        <span class="text-base text-gray-800 flex-1">
          {{ field.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { ITicket } from "@/pages/ticket/symbols";
import { Tooltip, Avatar } from "frappe-ui";
import { dayjs } from "@/dayjs";
import { formatTime } from "@/utils";
import { Field } from "@/types";

const emit = defineEmits(["open"]);

const ticket = inject(ITicket);

const slaData = computed(() => {
  const firstResponse = firstResponseData();
  const resolution = resolutionData();
  return [
    {
      title: "First Response",
      value: ticket.data.first_responded_on || ticket.data.response_by,
      label: firstResponse.label,
      theme: firstResponse.color,
    },
    {
      title: "Resolution",
      value: ticket.data.resolution_date || ticket.data.resolution_by,
      label: resolution.label,
      theme: resolution.color,
    },
  ];
});

function firstResponseData() {
  let firstResponse = null;
  if (
    !ticket.data.first_responded_on &&
    dayjs().isBefore(dayjs(ticket.data.response_by))
  ) {
    firstResponse = {
      label: `Due in ${formatTime(
        dayjs(ticket.data.response_by).diff(dayjs(), "s")
      )}`,
      color: "orange",
    };
  } else if (
    dayjs(ticket.data.first_responded_on).isBefore(
      dayjs(ticket.data.response_by)
    )
  ) {
    firstResponse = {
      label: `Fulfilled in ${formatTime(
        dayjs(ticket.data.first_responded_on).diff(
          dayjs(ticket.data.creation),
          "s"
        )
      )}`,
      color: "green",
    };
  } else {
    firstResponse = {
      label: "Failed",
      color: "red",
    };
  }
  return firstResponse;
}

function resolutionData() {
  let resolution = null;
  if (
    !ticket.data.resolution_date &&
    dayjs().isBefore(ticket.data.resolution_by)
  ) {
    resolution = {
      label: `Due in ${formatTime(
        dayjs(ticket.data.resolution_by).diff(dayjs(), "s")
      )}`,
      color: "orange",
    };
  } else if (
    dayjs(ticket.data.resolution_date).isBefore(ticket.data.resolution_by)
  ) {
    resolution = {
      label: `Fulfilled in ${formatTime(
        dayjs(ticket.data.resolution_date).diff(
          dayjs(ticket.data.creation),
          "s"
        )
      )}`,
      color: "green",
    };
  } else {
    resolution = {
      label: "Failed",
      color: "red",
    };
  }
  return resolution;
}

const ticketOpenerName = computed(() => {
  return (
    ticket.data.contact?.full_name ||
    ticket.data.contact?.name ||
    ticket.data.raised_by?.split("@")[0] ||
    "Customer"
  );
});

const ticketCompanyName = computed(() => {
  return ticket.data.customer || ticket.data.contact?.company_name || "";
});

const ticketBasicInfo = computed(() => {
  const info = [
    {
      label: "Ticket ID",
      value: ticket.data.name,
    },
    {
      label: "Status",
      value: transformStatus(ticket.data.status),
      bold: true,
    },
    {
      label: "Raised By",
      value: ticketOpenerName.value,
    },
  ];
  if (ticketCompanyName.value) {
    info.push({
      label: "Company",
      value: ticketCompanyName.value,
    });
  }
  return info;
});

const ticketAdditionalInfo = computed(() => {
  const fields = [
    {
      label: "Subject",
      value: ticket.data.subject,
    },
    {
      label: "Team",
      value: ticket.data.agent_group || "-",
    },
    {
      label: "Priority",
      value: ticket.data.priority,
    },
  ];
  const custom_fields = ticket.data.template.fields
    .filter(
      (field: Field) =>
        !field.hide_from_customer &&
        ["subject", "team", "priority"].indexOf(field.fieldname) === -1
    )
    .map((field: Field) => ({
      label: field.label,
      value: ticket.data[field.fieldname],
    }));

  return [...fields, ...custom_fields];
});
function transformStatus(status: string) {
  switch (status) {
    case "Replied":
      return "Awaiting reply";
    default:
      return status;
  }
}
</script>

<style scoped></style>
