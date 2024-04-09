interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export let deferredPrompt: BeforeInstallPromptEvent | null = null;

export const pwaInit = () => {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    //if app can be installed, assign the event to deferred prompt variable
    deferredPrompt = e;
  });
};

export const pwaInstall = async () => {
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      deferredPrompt = null;
    }
  } else {
    console.log("deferred prompt is null [Website cannot be installed]");
  }
};
