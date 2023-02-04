import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator tabBarPosition="top" initialRouteName="Chats">
      <TopTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }) => ({
          title: "Chats",
        })}
      />
      <TopTab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          title: "Calls",
        }}
      />
    </TopTab.Navigator>
  );
}
