import Fab from '@/components/Fab';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Colors } from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { projects } from '@/db/schema';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const { signOut } = useAuth();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const { data } = useLiveQuery(drizzleDb.select().from(projects));

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>My Projects</Text>
          <Link href="/browse/new-project">
            <Ionicons name="add" size={24} color={Colors.dark} />
          </Link>
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.projectButton} onPress={() => {}}>
              <Text>#</Text>
              <Text style={styles.projectButtonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.clearButton} onPress={() => signOut()}>
              <Text style={styles.clearButtonText}>Log Out</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Fab />
    </>
  );
};
export default Page;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    flex: 1,
  },
  clearButton: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 18,
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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightBorder,
  },
});
