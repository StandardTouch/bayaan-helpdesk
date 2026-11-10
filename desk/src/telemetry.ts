import { ref } from "vue";
import { createResource } from "frappe-ui";

const APP = "helpdesk";
const SITENAME = typeof window !== "undefined" ? window.location.hostname : "";

// extend window object to add posthog
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    posthog: any;
  }
}

// Inline PostHog loader stub so Vite does not require external posthog.js during build
if (typeof window !== "undefined" && !window.posthog) {
  (function (t: any, e: any) {
    let p: any, r: any;
    if (!e.__SV) {
      window.posthog = e;
      e._i = [];
      e.init = function (i: any, s: any, a: any) {
        function g(t: any, e: any) {
          const o = e.split(".");
          if (o.length === 2) {
            t = t[o[0]];
            e = o[1];
          }
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        p = t.createElement("script");
        p.type = "text/javascript";
        p.async = true;
        p.src = s.api_host + "/static/array.js";
        r = t.getElementsByTagName("script")[0];
        if (r && r.parentNode) {
          r.parentNode.insertBefore(p, r);
        }
        let u = e;
        if (void 0 !== a) {
          u = e[a] = [];
        } else {
          a = "posthog";
        }
        u.people = u.people || [];
        u.toString = function (t: any) {
          let str = "posthog";
          if ("posthog" !== a) str += "." + a;
          if (!t) str += " (stub)";
          return str;
        };
        u.people.toString = function () {
          return u.toString(1) + ".people (stub)";
        };
        const methods =
          "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(
            " "
          );
        for (let n = 0; n < methods.length; n++) g(u, methods[n]);
        e._i.push([i, s, a]);
      };
      e.__SV = 1;
    }
  })(document, window.posthog || []);
}

type PosthogSettings = {
  posthog_project_id: string;
  posthog_host: string;
  enable_telemetry: boolean;
  telemetry_site_age: number;
};

const telemetry = ref({
  enabled: false,
  project_id: "",
  host: "",
});

let posthogSettings = createResource({
  url: "helpdesk.api.telemetry.get_posthog_settings",
  cache: "posthog_settings",
  onSuccess: (ps: PosthogSettings) => init(ps),
  onError: () => {},
});

function isTelemetryEnabled() {
  if (!posthogSettings.data) return false;

  return (
    posthogSettings.data.enable_telemetry &&
    posthogSettings.data.posthog_project_id &&
    posthogSettings.data.posthog_host
  );
}

export async function init(ps: PosthogSettings) {
  if (!isTelemetryEnabled()) return;
  if (!window.posthog || typeof window.posthog.init !== "function") return;
  window.posthog.init(ps.posthog_project_id, {
    api_host: ps.posthog_host,
    autocapture: false,
    person_profiles: "identified_only",
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
        password: true,
      },
    },
    loaded: (ph: any) => {
      window.posthog = ph;
      ph.identify(SITENAME);
    },
  });
}

interface CaptureOptions {
  data: {
    user?: string;
    [key: string]: string | number | boolean | object;
  };
}

export function capture(
  event: string,
  options: CaptureOptions = { data: { user: "" } }
) {
  if (!isTelemetryEnabled()) return;
  if (window.posthog && typeof window.posthog.capture === "function") {
    window.posthog.capture(`${APP}_${event}`, options);
  }
}

export function recordSession() {
  if (!telemetry.value.enabled) return;
  if (window.posthog && window.posthog.__loaded && typeof window.posthog.startSessionRecording === "function") {
    window.posthog.startSessionRecording();
  }
}

export function stopSession() {
  if (!telemetry.value.enabled) return;
  if (
    window.posthog &&
    window.posthog.__loaded &&
    typeof window.posthog.sessionRecordingStarted === "function" &&
    window.posthog.sessionRecordingStarted() &&
    typeof window.posthog.stopSessionRecording === "function"
  ) {
    window.posthog.stopSessionRecording();
  }
}

export function posthogPlugin(app: any) {
  if (typeof window !== "undefined") {
    app.config.globalProperties.posthog = window.posthog;
    if (!window.posthog?._i?.length && !window.posthog?.__loaded) posthogSettings.fetch();
  }
}

