const { getSentryExpoConfig } = require('@sentry/react-native/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname, { annotateReactComponents: true });

config.resolver.sourceExts.push('sql'); // <--- add this

module.exports = config;
