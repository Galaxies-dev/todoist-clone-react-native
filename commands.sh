npx create-expo-app@latest todoistClone
npx expo install expo-dev-client

npm install @clerk/clerk-expo
npm install expo-secure-store
npx expo install expo-auth-session

bun add react-native-bottom-tabs
npx expo install expo-haptics

npm add zeego
npm i react-native-ios-context-menu react-native-ios-utilities
npx expo install sonner-native 
npx expo install react-native-svg
npx expo install expo-clipboard 

npx expo install expo-sqlite
npm i drizzle-orm
npm install babel-plugin-inline-import
npx drizzle-kit generate
npm i expo-drizzle-studio-plugin

npm i date-fns
npm i react-native-bouncy-checkbox

npx @sentry/wizard@latest -s -i reactNative
bun add @spotlightjs/spotlight  

npx expo install react-native-mmkv

# Prepare for IAP
eas build:configure
eas build --local --profile development --platform ios
eas build --auto-submit --platform ios

npm i react-native-purchases
npm i react-native-purchases-ui

npm install react-hook-form

npx expo install @react-native-community/datetimepicker

npm install react-native-calendars

npx expo install expo-dynamic-app-icon

