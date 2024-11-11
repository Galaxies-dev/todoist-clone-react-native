npx create-expo-app@latest todoistClone --template default@beta
npx expo install expo-dev-client

npm install @clerk/clerk-expo
npm install expo-secure-store

bun add react-native-bottom-tabs
npx expo install expo-haptics

npm add zeego
npm i react-native-ios-context-menu react-native-ios-utilities

npx expo install expo-sqlite
npm i drizzle-orm
npm install babel-plugin-inline-import
npx drizzle-kit generate
npm i date-fns

npm i react-native-bouncy-checkbox

npx @sentry/wizard@latest -s -i reactNative
bun add @spotlightjs/spotlight  

eas build:configure
eas build --local --profile development --platform ios
eas build --auto-submit --platform ios

bun i react-native-purchases
bun i react-native-purchases-ui

npx expo install sonner-native 
npx expo install react-native-svg