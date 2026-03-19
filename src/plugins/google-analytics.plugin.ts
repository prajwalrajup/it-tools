import type { App } from 'vue';
import { config } from '@/config';

function loadGtagScript(measurementId: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId);

  return gtag;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export const googleAnalytics = {
  install: (app: App) => {
    const { isEnabled, measurementId } = config.googleAnalytics;

    if (isEnabled && measurementId) {
      const gtag = loadGtagScript(measurementId);
      app.provide('gtag', gtag);
    }
  },
};
