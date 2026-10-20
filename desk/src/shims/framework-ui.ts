// Re-export everything from Frappe Framework's @framework/ui
export * from "../../../../frappe/ui/src/index";

import { ref } from "vue";

// Compatibility shims for Frappe v16 features when running on Frappe v15:

export const telemetryPlugin = {
  install(app: any, options?: any) {},
};

export function useTelemetry() {
  return {
    capture(event?: string, data?: any) {},
    identify(user?: any) {},
    reset() {},
  };
}

export function useOnboarding(app?: string) {
  return {
    isOnboardingCompleted: ref(true),
    isOnboardingStepsCompleted: ref(true),
    completeOnboarding() {},
    updateOnboardingStep() {},
    setUp() {},
    currentStep: ref(null),
    steps: ref([]),
  };
}

export const TrialBanner = {
  name: "TrialBanner",
  render() {
    return null;
  },
};

export const GettingStartedBanner = {
  name: "GettingStartedBanner",
  render() {
    return null;
  },
};

export const HelpModal = {
  name: "HelpModal",
  render() {
    return null;
  },
};

export const IntermediateStepModal = {
  name: "IntermediateStepModal",
  render() {
    return null;
  },
};

export const minimize = ref(false);
export const showHelpModal = ref(false);
