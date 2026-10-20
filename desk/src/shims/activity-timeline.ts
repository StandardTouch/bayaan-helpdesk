// Re-export everything from Frappe Framework's ActivityTimeline
export * from "../../../../frappe/ui/src/components/ActivityTimeline/index";
import { defineComponent, h } from "vue";

export { default as AttachmentChip } from "../../../../frappe/ui/src/components/ActivityTimeline/Attachment.vue";

export const TimelineContainer = defineComponent({
  name: "TimelineContainer",
  setup(props, { slots }) {
    return () =>
      h(
        "div",
        { class: "timeline-container flex-1 overflow-auto" },
        slots.default ? slots.default() : []
      );
  },
});

export function addPendingActivity(doctype?: any, docname?: any, activity?: any) {
  return {
    resolve(id?: string) {},
    drop() {},
  };
}

export type VisibleTypes = any;
