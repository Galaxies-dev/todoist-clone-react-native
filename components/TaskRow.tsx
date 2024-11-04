import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { Todo } from '@/types/interfaces';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Link } from 'expo-router';

interface TaskRowProps {
  task: Todo;
}

const TaskRow = ({ task }: TaskRowProps) => {
  const db = useSQLiteContext();

  const markAsCompleted = async () => {
    await db.runAsync(
      'UPDATE todos SET completed = ?, date_completed = ? WHERE id = ?',
      1,
      Date.now(),
      task.id
    );
  };

  return (
    <Link href={`/task/${task.id}`} style={styles.container} asChild>
      <TouchableOpacity>
        <View style={styles.row}>
          <BouncyCheckbox
            textContainerStyle={{ display: 'none' }}
            size={25}
            fillColor={Colors.primary}
            unFillColor="#FFFFFF"
            textStyle={{ color: '#000', fontSize: 16, textDecorationLine: 'none' }}
            onPress={markAsCompleted}
          />
          <Text style={styles.taskName}>{task.name}</Text>
        </View>
        <Text style={styles.projectName}>{task.project_name}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TaskRow;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  taskName: {
    fontSize: 16,
    flex: 1,
  },
  projectName: {
    fontSize: 12,
    color: Colors.dark,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});
