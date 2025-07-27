// utils/matomo.js
export const initMatomo = () => {
  // Récupérer les variables d'environnement
  const matomoUrl = import.meta.env.VITE_MATOMO_URL
  const siteId = import.meta.env.VITE_MATOMO_SITE_ID || '1'

  // Initialiser Matomo
  window._paq = window._paq || []
  window._paq.push(['trackPageView'])
  window._paq.push(['enableLinkTracking'])
  window._paq.push(['disableAlwaysUseSendBeacon'])

  ;(function () {
    const u = `${matomoUrl}/`
    window._paq.push(['setTrackerUrl', u + 'matomo.php'])
    window._paq.push(['setSiteId', siteId])

    const d = document
    const g = d.createElement('script')
    const s = d.getElementsByTagName('script')[0]

    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'matomo.js'

    s.parentNode.insertBefore(g, s)
  })()
}

// Fonctions utilitaires pour le tracking
export const trackEvent = (category, action, name = null, value = null) => {
  if (window._paq) {
    window._paq.push(['trackEvent', category, action, name, value])
  }
}

export const trackPageView = (customTitle = null) => {
  if (window._paq) {
    if (customTitle) {
      window._paq.push(['setDocumentTitle', customTitle])
    }
    window._paq.push(['trackPageView'])
  }
}

export const trackSiteSearch = (keyword, category = null, resultsCount = null) => {
  if (window._paq) {
    window._paq.push(['trackSiteSearch', keyword, category, resultsCount])
  }
}

// Tracking de la durée de session
export const trackSessionStart = () => {
  if (window._paq) {
    window._paq.push(['trackEvent', 'Session', 'Start', window.location.pathname])
  }
}

export const trackSessionEnd = () => {
  if (window._paq) {
    window._paq.push(['trackEvent', 'Session', 'End', window.location.pathname])
  }
}
