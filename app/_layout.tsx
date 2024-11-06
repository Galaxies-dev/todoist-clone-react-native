import { Stack, useRouter, useSegments, usePathname, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { tokenCache } from '@/utils/cache';
import { LogBox } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
// import { Toaster } from 'sonner-native';
import migrations from '@/drizzle/migrations';
import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { openDatabaseSync } from 'expo-sqlite';
import { projects, todos } from '@/db/schema';
import AsyncStorage from 'expo-sqlite/async-storage';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://b372bde58b5ff46e9155ba0dfd6d9e03@o106619.ingest.us.sentry.io/4508240723640320',
  attachScreenshot: true,
  debug: false,
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  },
  integrations: [Sentry.mobileReplayIntegration(), Sentry.spotlightIntegration()],
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  enableSpotlight: __DEV__,
});

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}
LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

const InitialLayout = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === '(authenticated)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/today');
    } else if (!isSignedIn && pathname !== '/') {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

const routingInstrumentation = Sentry.reactNavigationIntegration();

const RootLayoutNav = () => {
  const ref = useNavigationContainerRef();
  useEffect(() => {
    routingInstrumentation.registerNavigationContainer(ref);
  }, [ref]);

  const expoDb = openDatabaseSync('todos.db');
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;
    addDummyData(db);
  }, [success]);

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <SQLiteProvider databaseName="todos.db" options={{ enableChangeListener: true }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <Toaster /> */}
            <InitialLayout />
          </GestureHandlerRootView>
        </SQLiteProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

const addDummyData = async (db: ExpoSQLiteDatabase) => {
  const value = AsyncStorage.getItemSync('initialized');
  if (value) return;

  await db.insert(projects).values([
    { name: 'Inbox', color: '#000000' },
    { name: 'Work', color: '#0a009c' },
  ]);
  await db.insert(todos).values([
    {
      name: 'Check out Galaxies.dev for epic React Native courses',
      description: 'And learn how to build your own apps',
      priority: 1,
      completed: 0,
      project_id: 1,
      date_added: Date.now(),
    },
    {
      name: 'Buy groceries for the week',
      priority: 2,
      completed: 0,
      project_id: 1,
      date_added: Date.now(),
    },
  ]);
  AsyncStorage.setItemSync('initialized', 'true');
};

export default Sentry.wrap(RootLayoutNav);
