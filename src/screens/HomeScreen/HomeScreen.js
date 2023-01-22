import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  List,
  Paragraph,
  Searchbar,
  SegmentedButtons,
} from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          paddingBottom: 20,
          justifyContent: "space-evenly",
        }}
      >
        <Text>
          Hi, Edwin {"\n"}
          {"\n"}Its yet another time to save lives
        </Text>
        <Avatar.Image
          size={64}
          source={require("../../../assets/avatar.png")}
        />
      </View>
      <Card mode="outlined" style={styles.highlight}>
        <Card.Content>
          <View
            style={{ justifyContent: "space-evenly", flexDirection: "row" }}
          >
            <Text variant="titleLarge">
              112 <Fontisto name="blood" size={28} />
              requests
            </Text>
            <View style={styles.divider}></View>
            <Text variant="bodyMedium">
              34 <MaterialCommunityIcons name="nature-people" size={28} />
              donating.
            </Text>
          </View>
        </Card.Content>
      </Card>
      <View style={styles.cards}>
        <Card style={styles.space}>
          <Card.Content>
            <IconButton
              icon="magnify"
              size={40}
              mode="outlined"
              onPress={() => navigation.navigate("find a donor")}
            />
            <Paragraph>find a donor</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.space}>
          <Card.Content>
            <IconButton
              icon="car"
              mode="outlined"
              size={40}
              onPress={() => navigation.navigate("Feed")}
            />
            <Paragraph>donation drives</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.cards}>
        <Card style={styles.space}>
          <Card.Content>
            <IconButton
              icon="hospital"
              size={40}
              mode="outlined"
              onPress={() => navigation.navigate("Requests")}
            />
            <Paragraph>Requests.</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.space}>
          <Card.Content style={{ color: "#d0312d" }}>
            <IconButton
              icon="hospital-marker"
              size={40}
              mode="outlined"
              onPress={() => navigation.navigate("Feed")}
            />
            <Paragraph>facilities</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  highlight: {
    color: "#d0312d",
    backgroundColor: "#ffffff",
    bottom: 5,
  },
  divider: {
    height: "100%",
    width: 1,
    fontSize: 30,
    color: "#d0312d",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  search: {
    padding: 5,
  },
  cards: {
    color: "#d0312d",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },
  space: {
    width: 157,
    backgroundColor: "#ffffff",
    alignItems: "center",
    margin: 5,
  },
  text: {
    // paddingLeft: 50,
    paddingBottom: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    // backgroundColor: '#d0312d',
    color: "#d0312d",
  },
});
