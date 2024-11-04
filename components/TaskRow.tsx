import { StyleSheet, Text, View } from 'react-native';
import { Todo } from '@/types/interfaces';

interface TaskRowProps {
  task: Todo;
}
const TaskRow = ({ task }: TaskRowProps) => {
  return (
    <View style={styles.container}>
      <Text>{task.name}</Text>
    </View>
  );
};
export default TaskRow;
const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
});
