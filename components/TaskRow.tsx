import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { Todo } from '@/types/interfaces';
import { useSQLiteContext } from 'expo-sqlite';
import { useRef } from 'react';
import { Colors } from '@/constants/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Link, useRouter } from 'expo-router';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  runOnJS,
  useAnimatedReaction,
  configureReanimatedLogger,
  ReanimatedLogLevel,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useMMKVString } from 'react-native-mmkv';

interface TaskRowProps {
  task: Todo;
}

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const hasReachedThresholdUp = useSharedValue(false);
  const hasReachedThresholdDown = useSharedValue(false);

  useAnimatedReaction(
    () => {
      return drag.value;
    },
    (dragValue) => {
      if (Math.abs(dragValue) > 100 && !hasReachedThresholdUp.value) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        hasReachedThresholdUp.value = true;
        hasReachedThresholdDown.value = false;
      } else if (Math.abs(dragValue) < 100 && !hasReachedThresholdDown.value) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        hasReachedThresholdDown.value = true;
        hasReachedThresholdUp.value = false;
      }
    }
  );

  const animatedStyle = useAnimatedStyle(() => {
    if (Math.abs(drag.value) > 100) {
      return {
        backgroundColor: Colors.secondary,
      };
    }
    return {
      backgroundColor: '#8b8a8a',
    };
  });

  return (
    <Reanimated.View style={[{ flex: 1 }]}>
      <Reanimated.View style={[styles.rightAction, animatedStyle]}>
        <Ionicons name="calendar-outline" size={26} color="#fff" />
      </Reanimated.View>
    </Reanimated.View>
  );
}

const TaskRow = ({ task }: TaskRowProps) => {
  const db = useSQLiteContext();
  const reanimatedRef = useRef<SwipeableMethods>(null);
  const [previouslySelectedDate, setPreviouslySelectedDate] = useMMKVString('selectedDate');
  const heightAnim = useSharedValue(70); // Approximate height of row
  const opacityAnim = useSharedValue(1);
  const router = useRouter();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightAnim.value,
      opacity: opacityAnim.value,
    };
  });

  const markAsCompleted = async () => {
    heightAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    opacityAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    // Wait for animation to complete before updating DB
    await new Promise((resolve) => setTimeout(resolve, 300));

    await db.runAsync(
      'UPDATE todos SET completed = ?, date_completed = ? WHERE id = ?',
      1,
      Date.now(),
      task.id
    );
  };

  const onSwipeableOpen = () => {
    setPreviouslySelectedDate(new Date(task?.due_date || 0).toISOString());
    reanimatedRef.current?.close();
    router.push(`/task/date-select`);
  };

  return (
    <Reanimated.View style={animatedStyle}>
      <ReanimatedSwipeable
        ref={reanimatedRef}
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        onSwipeableWillOpen={onSwipeableOpen}>
        <Link href={`/task/${task.id}`} style={styles.container} asChild>
          <TouchableOpacity>
            <View style={styles.row}>
              <BouncyCheckbox
                textContainerStyle={{ display: 'none' }}
                size={25}
                fillColor={task.project_color}
                unFillColor="#FFFFFF"
                textStyle={{ color: '#000', fontSize: 16, textDecorationLine: 'none' }}
                onPress={markAsCompleted}
              />
              <Text style={styles.taskName}>{task.name}</Text>
            </View>
            <Text style={styles.projectName}>{task.project_name}</Text>
          </TouchableOpacity>
        </Link>
      </ReanimatedSwipeable>
    </Reanimated.View>
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
  swipeable: {
    backgroundColor: '#fff',
  },
  rightAction: {
    height: 90,
    backgroundColor: '#8b8a8a',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    flex: 1,
  },
});
