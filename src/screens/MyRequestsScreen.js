import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AnimatedFAB, Paragraph, Snackbar, Title } from "react-native-paper";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import moment from "moment";
import * as Linking from "expo-linking";
import { url } from "../utils/api";
import { getValue } from "../utils/auth";
const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

export default function MyRequestsScreen({
  navigation,
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) {
  const toRequest = () => {
    navigation.navigate("Request for Blood");
  };
  const [efeeds, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const [visibo, setVisibo] = React.useState(false);
  const onDismissSnackBar = () => setVisibo(false);
  const [error, setError] = React.useState("");

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };
  const toConfirm = () => {
    navigation.navigate("Confirm");
  };

  const fabStyle = { [animateFrom]: 16 };

  React.useEffect(() => {
    setLoading(true);
    const myRequests = async () => {
      const token = await getValue("token");
      axios
        .get(`${url}/api/requests/me`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFeed(res.data);
          // console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError("Error, fetching my requests.");
          setVisibo(true);
          console.log(err);
        });
    };
    myRequests().catch((err) => {
      console.log(err);
    });
  }, [error]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        {efeeds.length > 0 ? (
          <View style={{ padding: 10 }}>
            {efeeds.map((feed) => (
              <View key={feed.id}>
                <Card
                  style={{ backgroundColor: "#feefef" }}
                  mode="contained"
                  onPress={() =>
                    navigation.navigate("Patient Info", { req: feed })
                  }
                >
                  <View style={{ alignItems: "center", marginTop: 10 }}>
                    <Avatar.Image
                      size={24}
                      source={require("../../assets/avatar.png")}
                    />
                    <Paragraph
                      style={{ textAlign: "center", fontWeight: "100" }}
                    >
                      {feed.patientName}
                    </Paragraph>
                  </View>

                  <Card.Content>
                    <View
                      style={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                        paddingBottom: 10,
                        paddingTop: 20,
                      }}
                    >
                      <Paragraph>
                        <Fontisto name="blood-drop" size={18} color="#d0312d" />{" "}
                        {feed.bloodGroup}
                      </Paragraph>
                      <Paragraph>
                        <Fontisto name="blood" size={18} /> {feed.bloodUnits}{" "}
                        blood units
                      </Paragraph>
                    </View>
                    <Card.Actions style={{ justifyContent: "space-between" }}>
                      <Button
                        icon={"google-maps"}
                        mode="text"
                        onPress={() =>
                          Linking.openURL(
                            `https://www.google.com/maps/dir/?api=1&origin=${my_lat},${my_long}&destination=${feed.latitude},${feed.longitude}`
                          )
                        }
                      >
                        Directions
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => toConfirm(feed.id)}
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
        ) : (
          <View style={{ margin: 30 }}>
            <Image
              style={{
                height: 270,
                // margin: 50,
                width: "100%",
                borderRadius: 50,
              }}
              source={require("../../assets/no_data.png")}
            />
            <Title style={{ textAlign: "center" }}>
              Start by requesting a blood donations
            </Title>
          </View>
        )}
        <Button style={{ margin: 20 }} mode="contained">
          Load More..
        </Button>
      </ScrollView>
      <AnimatedFAB
        icon={"arrow-right"}
        label={"request donor"}
        color="#000"
        extended={isExtended}
        onPress={toRequest}
        visible={visible}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, style, fabStyle]}
      />
      <Snackbar
        visible={visibo}
        duration={1000}
        style={{ backgroundColor: "#fc7d7b" }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  fabStyle: {
    bottom: 36,
    right: 16,
    backgroundColor: "#ffffff",
    position: "absolute",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
