import React, { useEffect, useState } from "react";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  List,
  Paragraph,
  Snackbar,
  Title,
} from "react-native-paper";
import axios from "axios";
import { getRequests } from "../utils/api";
import Navbar from "../components/Navbar";

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;
  const toConfirm = () => {
    navigation.navigate("Confirm");
  };

  // useEffect(() => {
  //   const requests = getRequests();
  //   if (!requests) {
  //     setLoading(false);
  //     setError("could not get request!");
  //     setVisible(true);
  //   }
  //   setRequests(requests);
  //   setLoading(false);
  // }, []);

  const latest = requests.map((req) => {
    <Card style={{ backgroundColor: "#ffffff" }}>
      <Card.Title
        title="edwin "
        subtitle="2mins"
        left={LeftContent}
        // right={(props) => (
        //   <IconButton {...props} icon="plus" onPress={() => {}} />
        // )}
      />
      <Card.Content>
        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            // paddingTop: 20,
          }}
        >
          <Text variant="bodySmall">
            <Fontisto name="blood-drop" size={18} color="#d0312d" /> A+
          </Text>
          <Text variant="bodySmall">
            <FontAwesome name="location-arrow" size={18} color="#d0312d" /> 4th
            street Kisii
          </Text>
        </View>
        <Text>fdfiej eiijir eijriej eijrie erioejir enriweior</Text>
        <Card.Actions>
          <Button mode="contained" onPress={toConfirm}>
            donate <FontAwesome name="smile-o" size={18} />{" "}
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>;
  });

  return (
    <>
      <Navbar props={{ name: "Blood Share"}} />
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
            Hi, Edwin
            {"\n"}Give the gift of life; donate blood.
          </Text>
          <Avatar.Image size={34} source={require("../../assets/avatar.png")} />
        </View>
        <View style={styles.cards}>
          <Card style={styles.space}>
            <Card.Content>
              <IconButton
                icon="magnify"
                // size={40}
                mode="outlined"
                onPress={() => navigation.navigate("Request for Blood")}
              />
              <Paragraph>find donor</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.space}>
            <Card.Content>
              <IconButton
                icon="hospital"
                size={20}
                mode="outlined"
                onPress={() => navigation.navigate("Requests")}
              />
              <Paragraph>post drive.</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.space}>
            <Card.Content>
              <IconButton
                icon="car"
                mode="outlined"
                // size={40}
                onPress={() => navigation.navigate("Feed")}
              />
              <Paragraph>donations</Paragraph>
            </Card.Content>
          </Card>
        </View>
        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            paddingTop: 20,
          }}
        >
          <Text variant="titleLarge">
            <Text style={{ fontSize: 26 }}>12 </Text>
            <Fontisto name="blood-drop" size={28} color="#d0312d" /> requests
          </Text>
          <View style={styles.verticleLine}></View>
          <Text variant="bodyMedium">
            <Text style={{ fontSize: 26 }}>34 </Text>
            <Octicons name="people" size={28} /> donating.
          </Text>
        </View>

        <View>
          <Title style={{ paddingLeft: 10, paddingTop: 20 }}>
            Donation Requests.
          </Title>
          {loading ? (
            <View style={{ paddingTop: 50 }}>
              <ActivityIndicator animating={true} size={50} />
            </View>
          ) : (
            <View>
              {latest}
              {/* {requests.map((req) => (
                <Card style={{ backgroundColor: "#ffffff" }}>
                  <Card.Title
                    title="edwin "
                    subtitle="2mins"
                    left={LeftContent}
                    // right={(props) => (
                    //   <IconButton {...props} icon="plus" onPress={() => {}} />
                    // )}
                  />
                  <Card.Content>
                    <View
                      style={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                        // paddingTop: 20,
                      }}
                    >
                      <Text variant="bodySmall">
                        <Fontisto name="blood-drop" size={18} color="#d0312d" />{" "}
                        A+
                      </Text>
                      <Text variant="bodySmall">
                        <FontAwesome
                          name="location-arrow"
                          size={18}
                          color="#d0312d"
                        />{" "}
                        4th street Kisii
                      </Text>
                    </View>
                    <Text>fdfiej eiijir eijriej eijrie erioejir enriweior</Text>
                    <Card.Actions>
                      <Button mode="contained" onPress={toConfirm}>
                        donate <FontAwesome name="smile-o" size={18} />{" "}
                      </Button>
                    </Card.Actions>
                  </Card.Content>
                </Card>
              ))} */}
            </View>
          )}
        </View>
        <Snackbar
          visible={visible}
          duration={1000}
          onDismiss={onDismissSnackBar}
          action={{
            label: "ok",
            onPress: () => {
              // Do something
            },
          }}
        >
          {error}
        </Snackbar>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  highlight: {
    color: "#d0312d",
    // backgroundColor: "#ffffff",
    // backgroundColor: "#d0312d",
    bottom: 5,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
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
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  space: {
    // width: 157,
    backgroundColor: "#ffffff",
    alignItems: "center",
    // margin: 5,
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
