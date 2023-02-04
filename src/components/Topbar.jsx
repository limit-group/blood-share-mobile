import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DonationScreen } from "../screens";
import RequestsScreen from "../screens/RequestsScreen";
const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator tabBarPosition="top" initialRouteName="Chats">
      <TopTab.Screen
        name="Chats"
        component={DonationScreen}
        options={({ navigation }) => ({
          title: "Recieved Requests",
        })}
      />
      <TopTab.Screen
        name="Calls"
        component={DonationScreen}
        options={{
          title: "My Requests",
        }}
      />
    </TopTab.Navigator>
  );
}
