import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Card,
  IconButton,
  Paragraph,
  SegmentedButtons,
  Title,
} from "react-native-paper";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function BloodCardScreen({ navigation }) {
  const [value, setValue] = React.useState("");

  const toBioData = () => {
    navigation.navigate("Profile");
  };
  const toEditProfile = () => {
    navigation.navigate("Profile");
  };
  const toDonated = () => {
    navigation.navigate("Donated");
  };
  const toMyDonations = () => {
    navigation.navigate("Donations");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={require("../../../assets/avatar.png")} />
      <Card>
        <Card.Content>
          <Title style={styles.title}>Edwin Odhiambo</Title>
        </Card.Content>
      </Card>
      <TouchableOpacity style={styles.button} onPress={toDonated}>
        <Text style={styles.buttonTitle}><MaterialCommunityIcons name="shield-check-outline" size={18} /> i have donated</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toMyDonations}>
        <Text style={styles.buttonTitle}><MaterialCommunityIcons name="format-list-checkbox" size={18} /> my donations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toEditProfile}>
        <Text style={styles.buttonTitle}><MaterialCommunityIcons name="account-edit-outline" size={18} /> edit profile</Text>
      </TouchableOpacity>
    </View>
  );
}
