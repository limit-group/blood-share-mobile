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
        source={{
          uri: "https://media-exp1.licdn.com/dms/image/C4D03AQGyJc1xGHv8Zg/profile-displayphoto-shrink_200_200/0/1629002177802?e=1674086400&v=beta&t=R-RrZ6TolUh9kaFp2-tchOlXG0P9ZvvZh9hE5g2-tzA",
        }}
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
