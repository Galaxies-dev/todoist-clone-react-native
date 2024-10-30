import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

const MoreButton = () => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.6}>
      <Ionicons name="ellipsis-horizontal-outline" size={30} color={Colors.primary} />
    </TouchableOpacity>
  );
};

export default MoreButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
});

// import { StyleSheet, TouchableOpacity } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Colors } from '@/constants/Colors';
// import * as DropdownMenu from 'zeego/dropdown-menu';

// const MoreButton = () => {
//   return (
//     <DropdownMenu.Root>
//       <DropdownMenu.Trigger>
//         <TouchableOpacity style={styles.button} activeOpacity={0.6}>
//           <Ionicons name="ellipsis-horizontal-outline" size={30} color={Colors.primary} />
//         </TouchableOpacity>
//       </DropdownMenu.Trigger>

//       <DropdownMenu.Content>
//         <DropdownMenu.Group>
//           <DropdownMenu.Item key="board">
//             <DropdownMenu.ItemTitle>Create a board</DropdownMenu.ItemTitle>
//             <DropdownMenu.ItemIcon
//               ios={{
//                 name: 'square.split.2x1',
//                 pointSize: 24,
//               }}></DropdownMenu.ItemIcon>
//           </DropdownMenu.Item>

//           <DropdownMenu.Item key="card">
//             <DropdownMenu.ItemTitle>Create a card</DropdownMenu.ItemTitle>
//             <DropdownMenu.ItemIcon
//               ios={{
//                 name: 'square.topthird.inset.filled',
//                 pointSize: 24,
//               }}></DropdownMenu.ItemIcon>
//           </DropdownMenu.Item>
//         </DropdownMenu.Group>

//         <DropdownMenu.Item key="templates">
//           <DropdownMenu.ItemTitle>Browse Templates</DropdownMenu.ItemTitle>
//           <DropdownMenu.ItemIcon
//             ios={{
//               name: 'square.on.square.dashed',
//               pointSize: 24,
//             }}></DropdownMenu.ItemIcon>
//         </DropdownMenu.Item>
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   );
// };

// export default MoreButton;

// const styles = StyleSheet.create({
//   button: {
//     padding: 8,
//     borderRadius: 4,
//   },
// });
