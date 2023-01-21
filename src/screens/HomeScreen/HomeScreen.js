import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
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
  List,
  Paragraph,
  Searchbar,
  SegmentedButtons,
} from "react-native-paper";

export default function HomeScreen() {
  const [value, setValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      {/* <Searchbar
        placeholder="Search"
        style={styles.search}
        onChangeText={onChangeSearch}
        value={searchQuery}
      /> */}
      {/* <MapView
        style={styles.map}
        // showsUserLocation={true}
        // loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
      /> */}
      <View style={{ textAlign: 'center'}}>
        <Text>Hi, Edwin Its yet another time to save lives</Text>
      </View>
      <Card mode="elevated" style={styles.space}>
        <Card.Content>
          <Text variant="titleLarge">112 blood requests</Text>
          <Text variant="bodyMedium"></Text>
        </Card.Content>
        {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      </Card>
      <View style={styles.cards}>
        <Card style={styles.space}>
          <Card.Content onPress={() => navigation.navigate("Facility")}>
            <IconButton
              icon="magnify"
              size={40}
              mode="outlined"
              onPress={() => console.log("Pressed")}
            />
            <Paragraph>find a donor</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.space}>
          <Card.Content onPress={() => navigation.navigate("DonationList")}>
            <IconButton icon="car" mode="outlined" size={40} />
            <Paragraph>donation drives</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.cards}>
        <Card style={styles.space}>
          <Card.Content onPress={() => navigation.navigate("BroadcastList")}>
            <IconButton icon="hospital" size={40} mode="outlined" />
            <Paragraph>Requests.</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.space}>
          <Card.Content style={{ color: "#d0312d" }}>
            <IconButton
              icon="hospital-marker"
              size={40}
              mode="outlined"
              onPress={() => navigation.navigate("MobileSignup")}
            />
            <Paragraph>facilities</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
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
