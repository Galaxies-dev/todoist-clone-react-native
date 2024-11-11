import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Modal,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Todo } from '@/types/interfaces';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, DATE_COLORS } from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { todos, projects } from '@/db/schema';
import { useRouter } from 'expo-router';
import { Project } from '@/types/interfaces';
import { eq } from 'drizzle-orm';
import { format, isSameDay, isTomorrow } from 'date-fns';
import { useMMKVString } from 'react-native-mmkv';

type TodoFormProps = {
  todo?: Todo & { project_name: string; project_color: string; project_id: number };
};

type TodoFormData = {
  name: string;
  description: string;
};

const TodoForm = ({ todo }: TodoFormProps) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<TodoFormData>({
    defaultValues: {
      name: todo?.name || '',
      description: todo?.description || '',
    },
    mode: 'onChange',
  });

  const [selectedDate, setSelectedDate] = useState<Date>(
    todo?.due_date ? new Date(todo.due_date) : new Date()
  );

  const [showProjects, setShowProjects] = useState(false);
  const { data } = useLiveQuery(drizzleDb.select().from(projects));
  const [selectedProject, setSelectedProject] = useState<Project>(
    todo?.project_id
      ? {
          id: todo.project_id,
          name: todo.project_name,
          color: todo.project_color,
        }
      : {
          id: 1,
          name: 'Inbox',
          color: '#000',
        }
  );

  const [previouslySelectedDate, setPreviouslySelectedDate] = useMMKVString('selectedDate');

  useEffect(() => {
    if (previouslySelectedDate) {
      setSelectedDate(new Date(previouslySelectedDate));
      setPreviouslySelectedDate(undefined);
    }
  }, [previouslySelectedDate]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = async (data: TodoFormData) => {
    if (todo) {
      await drizzleDb
        .update(todos)
        .set({
          name: data.name,
          description: data.description,
          project_id: selectedProject.id,
          due_date: selectedDate.getTime(),
        })
        .where(eq(todos.id, todo.id));
    } else {
      await drizzleDb.insert(todos).values({
        name: data.name,
        description: data.description,
        priority: 0,
        date_added: Date.now(),
        completed: 0,
        project_id: selectedProject.id,
        due_date: selectedDate.getTime(),
      });
    }
    router.dismiss();
  };

  const onProjectPress = (project: Project) => {
    setSelectedProject(project);
    setShowProjects(false);
  };

  const getDateObject = (date: Date) => {
    if (isSameDay(date, new Date())) {
      return { name: 'Today', color: DATE_COLORS.today };
    } else if (isTomorrow(new Date(date))) {
      return { name: 'Tomorrow', color: DATE_COLORS.tomorrow };
    } else {
      return { name: format(new Date(date), 'd MMM'), color: DATE_COLORS.other };
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showProjects}
          onRequestClose={() => {
            setShowProjects(!showProjects);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.projectButton}
                    onPress={() => onProjectPress(item)}>
                    <Text style={{ color: item.color }}>#</Text>
                    <Text style={styles.projectButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: StyleSheet.hairlineWidth,
                      backgroundColor: Colors.lightBorder,
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Modal>

        <ScrollView contentContainerStyle={[styles.container]} keyboardShouldPersistTaps="always">
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.titleInput}
                placeholder="Task name"
                value={value}
                onChangeText={onChange}
                autoFocus
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                value={value}
                onChangeText={onChange}
                multiline
              />
            )}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.actionButtonsContainer}
            keyboardShouldPersistTaps="always">
            <Pressable
              onPress={() => router.push('/task/date-select')}
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                  { borderColor: getDateObject(selectedDate).color },
                ];
              }}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={getDateObject(selectedDate).color}
              />
              <Text
                style={[styles.outlinedButtonText, { color: getDateObject(selectedDate).color }]}>
                {getDateObject(selectedDate).name}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="flag-outline" size={20} color={Colors.dark} />
              <Text style={styles.outlinedButtonText}>Priority</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="pricetags-outline" size={20} color={Colors.dark} />
              <Text style={styles.outlinedButtonText}>Labels</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              <Ionicons name="location-outline" size={20} color={Colors.dark} />
              <Text style={styles.outlinedButtonText}>Location</Text>
            </Pressable>
          </ScrollView>

          <View style={styles.bottomRow}>
            <Pressable
              onPress={() => setShowProjects(true)}
              style={({ pressed }) => {
                return [
                  styles.outlinedButton,
                  { backgroundColor: pressed ? Colors.lightBorder : 'transparent' },
                ];
              }}>
              {selectedProject.id === 1 && (
                <Ionicons name="file-tray-outline" size={20} color={Colors.dark} />
              )}
              {selectedProject.id !== 1 && <Text style={{ color: selectedProject.color }}>#</Text>}

              <Text style={styles.outlinedButtonText}>{selectedProject?.name}</Text>
              <Ionicons name="caret-down" size={14} color={Colors.dark} />
            </Pressable>

            <Pressable
              style={[styles.submitButton, { opacity: errors.name ? 0.5 : 1 }]}
              onPress={handleSubmit(onSubmit)}>
              <Ionicons name="arrow-up" size={24} color="#fff" />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 12,
    paddingTop: 16,
  },
  titleInput: {
    fontSize: 20,
    paddingHorizontal: 16,
  },
  descriptionInput: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  outlinedButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  outlinedButtonText: {
    color: Colors.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    padding: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: Dimensions.get('window').width - 60,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    elevation: 5,
  },
  projectButton: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  projectButtonText: {
    fontSize: 16,
  },
});
