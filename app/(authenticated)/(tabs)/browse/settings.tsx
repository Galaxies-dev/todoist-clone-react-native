import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
const Page = () => {
  const headerHeight = useHeaderHeight();

  const goPro = () => {};

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <TouchableOpacity style={styles.proButton}>
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
