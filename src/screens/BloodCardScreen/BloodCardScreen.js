import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, IconButton, Paragraph, SegmentedButtons, Title } from "react-native-paper";
import styles from "./styles";

export default function BloodCardScreen({ navigation }) {
  const [value, setValue] = React.useState("");

  const toBioData = () => {
    navigation.navigate("Profile");
  };
  const toEditProfile = () => {
    navigation.navigate("Profile");
  };
  const toDonated = () => {
    navigation.navigate("Profile");
  };
  const toMyDonations = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/icon.png")}
      />
      <Card mode="outlined">
        <Card.Content>
          <Title style={styles.title}>Edwin Odhiambo</Title>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "walk",
                icon: "cat",
                label: "Bio Data",
                // onPress: {() => navigation.navigate("Profile")}
              },
              { value: "drive", label: "Donations", icon: "bookmark" },
              {
                value: "train",
                icon: "pen",
                label: "Edit Profile",
              },
            ]}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={toDonated}
          >
            <Text style={styles.buttonTitle}>i have donated.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={toMyDonations}
          >
            <Text style={styles.buttonTitle}> my donations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={toEditProfile}
          >
            <Text style={styles.buttonTitle}>edit profile</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
}
