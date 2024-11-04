import Fab from '@/components/Fab';
import { Todo } from '@/types/interfaces';
import { useSQLiteContext, openDatabaseSync } from 'expo-sqlite';
import { StyleSheet, Text, RefreshControl, SectionList } from 'react-native';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import TaskRow from '@/components/TaskRow';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface Section {
  title: string;
  data: Todo[];
}
const expo = openDatabaseSync('tracker.db', { enableChangeListener: true });

const Page = () => {
  const db = useSQLiteContext();
  const today = format(new Date(), 'd MMM · eee');
  const [refreshing, setRefreshing] = useState(false);
  const { top } = useSafeAreaInsets();
  const drizzleDb = drizzle(expo);
  const [sectionListData, setSectionListData] = useState<Section[]>([]);

  const { data } = useLiveQuery(drizzleDb.select().from(todos).where(eq(todos.completed, 0)));

  useEffect(() => {
    const listData: Section[] = [{ title: today, data }];
    setSectionListData(listData);
  }, [data]);

  const loadTasks = async () => {
    const tasks = await db.getAllAsync<Todo>(`
      SELECT todos.*, projects.name as project_name
      FROM todos
      LEFT JOIN projects ON todos.project_id = projects.id
      WHERE todos.completed = 0
    `);
    if (tasks) {
      const listData = [{ title: today, data: tasks }];
      console.log('🚀 ~ loadTasks ~ listData:', listData);
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
