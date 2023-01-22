import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AnimatedFAB } from "react-native-paper";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
} from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

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
  const toRequest = () => {
    navigation.navigate("find a donor")
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

  const fabStyle = { [animateFrom]: 16 };

  useEffect(() => {
    // setLoading(true);
    // api
    //   .get("/e-feeds")
    //   .then((res) => {
    //     setFeed(res.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err);
    //   });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <IconButton centered={true} icon="loading" size={50} />
      ) : (
        <ScrollView onScroll={onScroll}>
          {efeeds.length > 0 ? (
            <>
              {efeeds.map((feed) => {
                <Card mode="contained">
                  <Card.Title
                    title={`Blood Type: ${feed.bloodType}`}
                    subtitle={feed.createdAt}
                    left={LeftContent}
                  />
                  <Card.Content>
                    <Text variant="bodySmall">{feed.description}</Text>
                  </Card.Content>
                </Card>;
              })}
            </>
          ) : (
            <Card style={{ paddingBottom: 2 }}>
              <Card.Title title="edwin " subtitle="2mins" left={LeftContent} />
              <Card.Content>
                <Text variant="bodySmall">
                  Card content eete etebf ghjjjjj yjyj yuyuyi iyi sdsd sadasd
                  adwefe{" "}
                </Text>
              </Card.Content>
              <Card.Cover
                source={require("../../../assets/blood.jpg")}
                style={{ padding: 5 }}
              />
            </Card>
          )}
        </ScrollView>
      )}
      <AnimatedFAB
        icon={"arrow-right"}
        label={"request donors"}
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
