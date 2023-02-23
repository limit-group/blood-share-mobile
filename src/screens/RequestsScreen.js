import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import React, { useEffect, useState } from "react";
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
  I18nManager,
  View,
  Image,
} from "react-native";
import {
  AnimatedFAB,
  Paragraph,
  Avatar,
  Button,
  Card,
  Snackbar,
} from "react-native-paper";
import Navbar from "../components/Navbar";
import moment from "moment";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { api } from "../utils/api";
import { getValue } from "../utils/auth";
const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

export default function RequestsScreen({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
  navigation,
}) {
  const toRequest = () => {
    navigation.navigate("Request for Blood");
  };
  const [efeeds, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [my_lat, setMyLat] = useState(null);
  const [my_long, setMyLong] = useState(null);
  const [visibo, setVisibo] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [error, setError] = React.useState("");
  const [isExtended, setIsExtended] = React.useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };
  const toConfirm = () => {
    navigation.navigate("Accept To Donate");
  };

  const fabStyle = { [animateFrom]: 16 };

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
    const requests = async (req, res) => {
      const token = await getValue("token");
      axios
        .get(`${api}/requests`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFeed(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    requests().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Navbar props={{ name: "Blood Requests" }} />
      <ScrollView onScroll={onScroll} style={{ padding: 10 }}>
        {efeeds.length > 0 ? (
          <>
            {efeeds.map((feed) => (
              <View key={feed.id}>
                <Card style={{ backgroundColor: "#ffffff" }} mode="contained">
                  <Card.Title
                    title="edwin"
                    titleVariant="bodySmall"
                    subtitleVariant="bodySmall"
                    subtitleStyle={{ fontWeight: "100" }}
                    subtitle={moment(feed.createdAt).fromNow()}
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
                        <Fontisto name="blood-drop" size={18} color="#d0312d" />{" "}
                        {feed.bloodGroup}
                      </Paragraph>
                      <Paragraph
                        onPress={() =>
                          Linking.openURL(
                            `https://www.google.com/maps/dir/?api=1&origin=${my_lat},${my_long}&destination=${feed.latitude},${feed.longitude}`
                          )
                        }
                      >
                        <FontAwesome name="location-arrow" size={18} />{" "}
                        Directions
                      </Paragraph>
                    </View>
                    {feed.requestType == "OTHERS" ? (
                      <Text>Help save {feed.patientName}'s life </Text>
                    ) : (
                      ""
                    )}
                    <Card.Actions>
                      <Button mode="contained" onPress={toConfirm}>
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
          </>
        ) : (
          <>
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
              <Text>Request people to donate and save lives</Text>
            </View>
          </>
        )}

        <Button style={{ margin: 20, bottom: 26 }} mode="contained">
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
    bottom: 16,
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
