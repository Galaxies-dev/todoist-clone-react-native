import { StyleSheet, Text, View } from 'react-native';

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>There will be dragons</Text>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 400,
  },
});
