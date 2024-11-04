import Fab from '@/components/Fab';
import { Todo } from '@/types/interfaces';
import { useSQLiteContext } from 'expo-sqlite';
import { StyleSheet, Text, RefreshControl, ScrollView, SectionList, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import TaskRow from '@/components/TaskRow';
interface Section {
  title: string;
  data: Todo[];
}

const Page = () => {
  const db = useSQLiteContext();
  const today = format(new Date(), 'd MMM · eee');
  const [refreshing, setRefreshing] = useState(false);
  const [sectionListData, setSectionListData] = useState<Section[]>([]);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await db.getAllAsync<Todo>('SELECT * FROM todos');

    if (tasks) {
      const listData = [{ title: today, data: tasks }];
      setSectionListData(listData);
    }
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top - 26 }]}>
      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        sections={sectionListData}
        renderItem={({ item }) => <TaskRow task={item} />}
        renderSectionHeader={({ section }) => {
          return <Text style={styles.header}>{section.title}</Text>;
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadTasks} />}
      />
      <Fab />
    </SafeAreaView>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
});
