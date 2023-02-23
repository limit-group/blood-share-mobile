import React, { useEffect, useState } from "react";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import moment from "moment";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
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
import { api, getCity } from "../utils/api";
import { getValue } from "../utils/auth";
import Navbar from "../components/Navbar";
import * as Linking from "expo-linking";
import * as Location from "expo-location";

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [req_count, setReqCount] = useState(0);
  const [don_count, setDonCount] = useState(0);
  const [my_lat, setMyLat] = useState(null);
  const [my_long, setMyLong] = useState(null);

  // const [location, setLocation] = useState(null);
  const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;
  const toConfirm = (id) => {
    navigation.navigate("Accept To Donate", { id: id });
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      setVisible(true);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    location = JSON.parse(JSON.stringify(location));
    setMyLat(location.coords.latitude);
    setMyLong(location.coords.longitude);
  };

  React.useEffect(() => {
    setLoading(true);
    const getLatest = async () => {
      const token = await getValue("token");
      axios
        .get(`${api}/requests/latest`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRequests(res.data.broadcasts);
          setReqCount(res.data.request_count);
          setDonCount(res.data.donations_count);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };

    getLatest().catch((err) => {
      console.log(err);
    });

    getLocation().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar props={{ name: "" }} />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            padding: 0,
            paddingBottom: 10,
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
                size={20}
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
                onPress={() => navigation.navigate("announce donation drive")}
              />
              <Paragraph>post drive.</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.space}>
            <Card.Content>
              <IconButton
                icon="car"
                mode="outlined"
                size={20}
                onPress={() => navigation.navigate("My Donations")}
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
            <Text style={{ fontSize: 26 }}>{req_count} </Text>
            <Fontisto name="blood-drop" size={28} color="#d0312d" /> requests
          </Text>
          <View style={styles.verticleLine}></View>
          <Text variant="bodyMedium">
            <Text style={{ fontSize: 26 }}>{don_count} </Text>
            <Octicons name="people" size={28} /> donating.
          </Text>
        </View>
        <View>
          <Title style={{ paddingLeft: 10, paddingTop: 20 }}>
            Donation Requests.
          </Title>
          <View
            style={{
              borderBottomColor: "black",
              padding: 5,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {loading ? (
            <View style={{ paddingTop: 50 }}></View>
          ) : (
            <View style={{ padding: 10 }}>
              {requests.map((req) => (
                <View key={req.id}>
                  <Card style={{ backgroundColor: "#ffffff" }}>
                    <Card.Title
                      title="edwin"
                      titleVariant="bodySmall"
                      subtitleVariant="bodySmall"
                      subtitle={moment(req.createdAt).fromNow()}
                      left={LeftContent}
                    />
                    <Card.Content>
                      <View
                        style={{
                          justifyContent: "space-evenly",
                          flexDirection: "row",
                          // paddingTop: 20,
                        }}
                      >
                        <Paragraph>
                          <Fontisto
                            name="blood-drop"
                            size={18}
                            color="#d0312d"
                          />{" "}
                          {req.bloodGroup}
                        </Paragraph>
                        <Paragraph
                          onPress={
                            () =>
                              Linking.openURL(
                                `https://www.google.com/maps/dir/?api=1&origin=${my_lat},${my_long}&destination=${req.latitude},${req.longitude}`
                              )
                          }
                        >
                          <FontAwesome name="location-arrow" size={18} />{" "}
                          Directions
                        </Paragraph>
                      </View>
                      <Card.Actions style={{ justifyContent: "space-between" }}>
                        <Button
                          mode="contained"
                          onPress={() => toConfirm(req.id)}
                        >
                          donate <FontAwesome name="smile-o" size={18} />{" "}
                        </Button>
                      </Card.Actions>
                    </Card.Content>
                  </Card>
                  <View
                    style={{
                      padding: 5,
                    }}
                  />
                </View>
              ))}
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
      </ScrollView>
    </SafeAreaView>
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
    paddingTop: 10,
  },
  space: {
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  text: {
    // paddingLeft: 50,
    paddingBottom: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Oregano_400Regular",
  },
  icon: {
    // backgroundColor: '#d0312d',
    color: "#d0312d",
  },
});
