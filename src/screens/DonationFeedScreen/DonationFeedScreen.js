import axios from "axios";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, SafeAreaView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Card, FAB, Text } from "react-native-paper";
import { AnimatedFAB } from "react-native-paper";
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
  const toCreateFeed = () => {};
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExtended, setIsExtended] = React.useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/feeds")
      .then((res) => {
        setFeeds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        <Card style={{ paddingBottom: 2 }}>
          <Card.Title title="edwin " subtitle="2mins" left={LeftContent} />
          <Card.Content>
            <Text variant="bodySmall">
              Card content eete etebf ghjjjjj yjyj yuyuyi iyi sdsd sadasd adwefe{" "}
            </Text>
          </Card.Content>
          <Card.Cover
            source={require("../../../assets/blood.jpg")}
            style={{ padding: 5 }}
          />
        </Card>
        <Card style={{ paddingBottom: 2 }}>
          <Card.Title title="edwin " subtitle="2mins" left={LeftContent} />
          <Card.Content>
            <Text variant="bodySmall">
              Card content eete etebf ghjjjjj yjyj yuyuyi iyi sdsd sadasd adwefe{" "}
            </Text>
          </Card.Content>
          <Card.Cover
            source={require("../../../assets/blood.jpg")}
            style={{ padding: 5 }}
          />
        </Card>
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"annonce drive"}
        extended={isExtended}
        onPress={toCreateFeed}
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
    marginTop: StatusBar.currentHeight || 0,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
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
