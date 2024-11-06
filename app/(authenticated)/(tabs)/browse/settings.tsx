import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

const Page = () => {
  const headerHeight = useHeaderHeight();

  const goPro = async () => {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
      displayCloseButton: false,
    });
    console.log(paywallResult);

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
        return false;
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  };

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <TouchableOpacity style={styles.proButton} onPress={goPro}>
        <Ionicons name="star-outline" size={24} color={Colors.primary} />

        <View style={styles.proButtonContent}>
          <Text style={styles.proButtonText}>Upgrade to Pro</Text>
          <Text style={styles.proButtonSubtitle}>
            Set up reminders, add extra projects, and more.
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  proButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    gap: 10,
  },
  proButtonContent: {
    flex: 1,
    gap: 5,
  },
  proButtonText: {
    fontSize: 16,
  },
  proButtonSubtitle: {
    fontSize: 14,
    color: Colors.lightText,
  },
});
