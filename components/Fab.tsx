import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
const Fab = () => {
  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
      <Ionicons name="add" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 24,
    right: 14,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
});
