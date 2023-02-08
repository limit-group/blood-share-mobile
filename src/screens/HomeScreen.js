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
import { api, getRequests } from "../utils/api";
import Navbar from "../components/Navbar";

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;
  const toConfirm = () => {
    navigation.navigate("Confirm");
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/requests`)
      .then((res) => {
        setRequests(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar props={{ name: "Blood Share" }} />
      <View >
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
          <View
            style={{
              borderBottomColor: "black",
              padding: 5,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {loading ? (
            <View style={{ paddingTop: 50 }}>
              <ActivityIndicator animating={true} size={50} />
            </View>
          ) : (
            <ScrollView>
              {requests.map((req) => (
                <Card style={{ backgroundColor: "#ffffff" }} key={req.id}>
                  <Card.Title
                    title="edwin"
                    subtitle={moment(req.createdAt).fromNow()}
                    left={LeftContent}
                  />
                  <Card.Content>
                    <View
                      style={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                      }}
                    >
                      <Text variant="bodySmall">
                        <Fontisto name="blood-drop" size={18} color="#d0312d" />{" "}
                        {req.bloodGroup}
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
                    <Card.Actions style={{ justifyContent: 'space-between'}}>
                    <Button onPress={toConfirm}>
                        Hide <FontAwesome name="smile-o" size={18} />{" "}
                      </Button>
                      <Button mode="contained" onPress={toConfirm}>
                        donate <FontAwesome name="smile-o" size={18} />{" "}
                      </Button>
                    </Card.Actions>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
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
    // marginTop: StatusBar.currentHeight || 0,
    // fontFamily: 'Oregano_400Regular',
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
