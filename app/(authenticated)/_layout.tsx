import { Slot } from 'expo-router';
import { Stack } from 'expo-router';
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="task/[id]"
        options={{
          title: '',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.42],
          sheetGrabberVisible: true,
          // unstable_screenStyle: { backgroundColor:  '#fff' },
          sheetCornerRadius: 30,
          headerShown: true,
          headerShadowVisible: false,
          sheetExpandsWhenScrolledToEdge: false,
        }}
      />
    </Stack>
  );
};
export default Layout;
