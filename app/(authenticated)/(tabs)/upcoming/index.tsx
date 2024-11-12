import Fab from '@/components/Fab';
import { StyleSheet, Text } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';
import { todos, projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { format, parse } from 'date-fns';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Todo } from '@/types/interfaces';
import { Colors } from '@/constants/Colors';
import { MarkedDates } from 'react-native-calendars/src/types';
import TaskRow from '@/components/TaskRow';

// @ts-ignore fix for defaultProps warning: https://github.com/wix/react-native-calendars/issues/2455
ExpandableCalendar.defaultProps = undefined;

interface Section {
  title: string;
  data: Todo[];
}

const Page = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const today = new Date().toISOString();
  const { data } = useLiveQuery(
    drizzleDb
      .select()
      .from(todos)
      .leftJoin(projects, eq(todos.project_id, projects.id))
      .where(eq(todos.completed, 0))
  );
  const [agendaItems, setAgendaItems] = useState<Section[]>([]);

  console.log(data);
  const withProjectData = data?.map((item) => ({
    ...item.todos,
    project_name: item.projects?.name,
    project_color: item.projects?.color,
  }));

  const markedDates: MarkedDates = {};
  withProjectData
    .map((todo) => {
      if (todo.due_date) {
        markedDates[new Date(todo.due_date).toISOString().split('T')[0]] = {
          marked: true,
          dotColor: todo.project_color,
        };
      }
    })
    .filter(Boolean);

  useEffect(() => {
    const formatedData = data?.map((item) => ({
      ...item.todos,
      project_name: item.projects?.name,
      project_color: item.projects?.color,
    }));

    // Group tasks by day
    const groupedByDay = formatedData?.reduce((acc: { [key: string]: Todo[] }, task) => {
      const day = format(new Date(task.due_date || new Date()), 'dd-MM-yyyy');
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(task);
      return acc;
    }, {});

    // Convert grouped data to sections array
    const listData: Section[] = Object.entries(groupedByDay || {}).map(([day, tasks]) => ({
      title: day,
      data: tasks,
    }));

    // Sort sections by date
    listData.sort((a, b) => {
      const dateA = new Date(a.data[0].due_date || new Date());
      const dateB = new Date(b.data[0].due_date || new Date());
      return dateA.getTime() - dateB.getTime();
    });

    setAgendaItems(listData);
  }, [data]);

  return (
    <>
      <CalendarProvider
        date={today}
        showTodayButton={true}
        theme={{
          todayButtonTextColor: '#000000',
        }}>
        <ExpandableCalendar
          closeOnDayPress
          hideArrows
          markedDates={markedDates}
          theme={{
            todayTextColor: Colors.primary,
            todayButtonFontSize: 24,
            textDisabledColor: Colors.lightText,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: 'white',
            todayButtonTextColor: '#0026ff',
          }}
        />
        <AgendaList
          sections={agendaItems}
          renderItem={({ item }) => <TaskRow task={item} />}
          renderSectionHeader={(section) => {
            const date = parse(section, 'dd-MM-yyyy', new Date());
            return <Text style={styles.header}>{format(date, 'd MMM · dddd')}</Text>;
          }}
          theme={{
            dayTextColor: '#000000',
            agendaDayTextColor: '#ff00ff',
            textDayHeaderFontWeight: 'bold',
          }}
        />
      </CalendarProvider>
      <Fab />
    </>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
