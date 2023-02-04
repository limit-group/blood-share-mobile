import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Avatar,
  Card,
  FAB,
  Snackbar,
  Text,
} from "react-native-paper";
import { AnimatedFAB } from "react-native-paper";
import Navbar from "../components/Navbar";
import { api, getFeeds } from "../utils/api";
import moment from 'moment';
const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

export default function DonationFeedScreen({
  navigation,
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) {
  const toCreateFeed = () => {
    navigation.navigate("announce donation drive");
  };

  const [loading, setLoading] = useState(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const [visibo, setVisibo] = React.useState(false);
  const onDismissSnackBar = () => setVisibo(false);
  const [error, setError] = React.useState("");
  const [feeds, setFeeds] = React.useState([]);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/feeds`)
      .then((res) => {
        setFeeds(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Navbar props={{ name: "Blood Donation Drives" }} />
      <ScrollView onScroll={onScroll}>
        {loading ? (
          <View style={{ paddingTop: 50 }}>
            <ActivityIndicator animating={true} size={50} />
          </View>
        ) : (
          <View style={{ padding: 10 }}>
            {feeds.map((feed) => (
              <Card style={styles.card} mode="outlined">
                <Card.Title
                  title="edwin"
                  subtitle={moment(feed.createdAt).fromNow()}
                  left={LeftContent}
                />
                <Card.Content>
                  <Text variant="bodySmall">{feed.information}</Text>
                </Card.Content>
                {/* <Card.Cover
                  source={require("../../assets/blood.jpg")}
                  style={{ padding: 5 }}
                /> */}
              </Card>
            ))}
            <View style={{ padding: 5 }}></View>
          </View>
        )}
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        color="#000"
        label={"annonce drive"}
        extended={isExtended}
        onPress={toCreateFeed}
        visible={visible}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, style, fabStyle]}
      />
      <Snackbar
        visible={visibo}
        duration={1000}
        style={{ color: "red" }}
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
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    backgroundColor: "#ffffff",
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
  card: {
    backgroundColor: "#ffffff",
  },
});
