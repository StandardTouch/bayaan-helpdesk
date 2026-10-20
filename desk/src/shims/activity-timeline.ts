// Re-export everything from Frappe Framework's ActivityTimeline
export * from "../../../../frappe/ui/src/components/ActivityTimeline/index";
import { defineComponent, h } from "vue";

export const AttachmentChip = defineComponent({
  name: "AttachmentChip",
  props: {
    label: { type: String, required: true },
    url: { type: String, default: null },
  },
  setup(props) {
    return () =>
      h(
        "a",
        {
          href: props.url || "#",
          target: "_blank",
          rel: "noopener noreferrer",
          class:
            "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-sm",
        },
        [
          h(
            "svg",
            {
              class: "w-3.5 h-3.5 text-gray-500 flex-shrink-0",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
            },
            [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13",
              }),
            ]
          ),
          h("span", { class: "truncate max-w-[200px]" }, props.label),
        ]
      );
  },
});

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
