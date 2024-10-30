import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

const MoreButton = () => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.6}>
      <Ionicons name="ellipsis-horizontal-outline" size={30} color={Colors.primary} />
    </TouchableOpacity>
  );
};

export default MoreButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
});
