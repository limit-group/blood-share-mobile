import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Card, Paragraph, SegmentedButtons, Title } from "react-native-paper";
import styles from "./styles";

export default function BloodCardScreen({ navigation }) {
  const [value, setValue] = React.useState("");

  const toBioData = () => {
    navigation.navigation("Profile")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/blood.jpg")}
      />
      <Card mode="contained">
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
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}
