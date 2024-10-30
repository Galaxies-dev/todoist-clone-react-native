import Fab from '@/components/Fab';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Colors } from '@/constants/Colors';
const Page = () => {
  const { signOut } = useAuth();

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <Text>Browse</Text>
        <TouchableOpacity style={styles.clearButton} onPress={() => signOut()}>
          <Text style={styles.clearButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
      <Fab />
    </>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clearButton: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 18,
  },
});
