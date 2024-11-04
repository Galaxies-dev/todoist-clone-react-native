import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import * as DropdownMenu from 'zeego/dropdown-menu';

type MoreButtonProps = {
  pageName: string;
};

const MoreButton = ({ pageName }: MoreButtonProps) => {
  console.log(pageName);
  const link = 'foo';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity style={styles.button} activeOpacity={0.6}>
          <Ionicons name="ellipsis-horizontal-outline" size={30} color={Colors.primary} />
        </TouchableOpacity>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="link" textValue={`Copy Link to ${pageName}`}>
          <DropdownMenu.ItemTitle>Copy</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: 'link',
              pointSize: 24,
            }}></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Group>
          <DropdownMenu.Item key="select">
            <DropdownMenu.ItemTitle>Select Tasks</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: 'square.stack',
                pointSize: 24,
              }}></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>

          <DropdownMenu.Item key="view">
            <DropdownMenu.ItemTitle>View</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: 'slider.horizontal.3',
                pointSize: 24,
              }}></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>

          <DropdownMenu.Item key="activity">
            <DropdownMenu.ItemTitle>Activity Log</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: 'chart.xyaxis.line',
                pointSize: 24,
              }}></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MoreButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
});
