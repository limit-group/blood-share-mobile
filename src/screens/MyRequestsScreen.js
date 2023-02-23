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
import {
  ActivityIndicator,
  AnimatedFAB,
  Paragraph,
  Title,
} from "react-native-paper";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import Navbar from "../components/Navbar";
import moment from "moment";
// import TopTabNavigator from "../components/Topbar";
import { api } from "../utils/api";
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
        .get(`${api}/requests/me`, {
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
          console.log(err);
        });
    };
    myRequests().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        {efeeds.length > 0 ? (
          <View style={{ padding: 10 }}>
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
                          navigation.navigate("Directions", {
                            latitude: feed.latitude,
                            longitude: feed.longitude,
                          })
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
            <Title style={{ textAlign: "center" }}>Start by requesting a blood donations</Title>
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
