// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from '@sentry/node'

Sentry.init({
    dsn: process.env.SERVER_SENTRY_DSN,
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
})
