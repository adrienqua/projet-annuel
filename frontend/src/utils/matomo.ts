declare global {
  interface Window {
    _paq: any[];
  }

  interface MatomoTracker {
    setUserId(userId: string | null): void;
    disableAlwaysUseSendBeacon(): void;
  }

  interface MatomoNamespace {
    getTracker(): MatomoTracker | null;
  }

  var Matomo: MatomoNamespace;
}

export const initMatomo = (): void => {
  const matomoUrl = import.meta.env.VITE_MATOMO_URL
  const siteId = import.meta.env.VITE_MATOMO_SITE_ID

  window._paq = window._paq || []
  window._paq.push(() => {
    if (typeof Matomo !== 'undefined' && typeof Matomo.getTracker === 'function') {
      const tracker = Matomo.getTracker();
      if (tracker) {
        tracker.setUserId(null);
        tracker.disableAlwaysUseSendBeacon();
      }
    }
  });
  window._paq.push(['trackPageView'])
  window._paq.push(['enableLinkTracking'])

    ; (function () {
      const u = `${matomoUrl}/`
      window._paq.push(['setTrackerUrl', u + 'matomo.php'])
      window._paq.push(['setSiteId', siteId])

      const d = document
      const g = d.createElement('script')
      const s = d.getElementsByTagName('script')[0]

      g.async = true
      g.src = u + 'matomo.js'

      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s)
      }
    })()
}

export const trackEvent = (category: string, action: string, name?: string, value?: number): void => {
  if (window._paq) {
    window._paq.push(['trackEvent', category, action, name, value])
  }
}

export const trackPageView = (customTitle?: string): void => {
  if (window._paq) {
    if (customTitle) {
      window._paq.push(['setDocumentTitle', customTitle])
    }
    window._paq.push(['trackPageView'])
  }
}

export const trackSiteSearch = (keyword: string, category?: string, resultsCount?: number): void => {
  if (window._paq) {
    window._paq.push(['trackSiteSearch', keyword, category, resultsCount])
  }
}

// Tracking de la durée de session
export const trackSessionStart = (): void => {
  if (window._paq) {
    window._paq.push(['trackEvent', 'Session', 'Start', window.location.pathname])
  }
}

export const trackSessionEnd = (): void => {
  if (window._paq) {
    window._paq.push(['trackEvent', 'Session', 'End', window.location.pathname])
  }
}

// Tracking d'événements spécifiques pour une app
export const trackButtonClick = (buttonName: string): void => {
  trackEvent('Button', 'Click', buttonName)
}

export const trackFormSubmit = (formName: string): void => {
  trackEvent('Form', 'Submit', formName)
}

export const trackAPICall = (endpoint: string, method: string): void => {
  trackEvent('API', method, endpoint)
}