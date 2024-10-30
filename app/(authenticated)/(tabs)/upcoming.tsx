import Fab from '@/components/Fab';
import { StyleSheet, Text, ScrollView } from 'react-native';
const Page = () => {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <Text>Page</Text>
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
});
