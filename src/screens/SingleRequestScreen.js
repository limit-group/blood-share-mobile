import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Title, Avatar, Button } from "react-native-paper";

export default function SingleRequestScreen({ navigation, route }) {
    // console.log(route.params.request);
  return (
    <>
      <View style={styles.container}>
        <View
          style={{ alignContent: "center", alignItems: "center", margin: 30 }}
        >
          <Avatar.Image size={54} source={require("../../assets/avatar.png")} />
          <Title>john doe</Title>
          <Paragraph>
            ie-bjbgjg iehiehrie eiehrie ehiriehrie ednreirier ehriehri
          </Paragraph>
          <Card
            style={{ backgroundColor: "#f2f6fc", marginTop: 10 }}
            mode="contained"
          >
            <Card.Content>
              <Paragraph style={{ fontWeight: "bold" }}>Diagnosis</Paragraph>
              <Paragraph>dbdife ebueu eriehe</Paragraph>
              <Text>{" \n "}</Text>
              <Paragraph style={{ fontWeight: "bold" }}>Location</Paragraph>
              <Paragraph>snndsfi ieojfoiefje eeigie egoiehgie</Paragraph>
            </Card.Content>
          </Card>
        </View>
        <View style={{ margin: 30 }}>
          <Button
            onPress={() => navigation.navigate("")}
            mode="contained"
            icon={"check"}
          >
            <Text style={styles.buttonTitle}>Accept to Donate</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#fc7d7b",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
