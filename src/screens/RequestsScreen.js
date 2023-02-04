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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import Navbar from "../components/Navbar";
import TopTabNavigator from "../components/Topbar";
import { api, getRequests } from "../utils/api";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function RequestsScreen({
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
    navigation.navigate("find a donor");
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
    axios
      .get(`${api}/requests`)
      .then((res) => {
        setFeed(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Navbar props={{ name: "Blood Requests" }} />
      <ScrollView onScroll={onScroll}>
        {loading ? (
          <View style={{ paddingTop: 50 }}>
            <ActivityIndicator animating={true} size={50} />
          </View>
        ) : (
          <>
            {efeeds.length > 0 ? (
              <>
                {efeeds.map((feed) => (
                  <Card style={{ backgroundColor: "#ffffff" }}>
                    <Card.Title
                      title="edwin"
                      subtitle="2mins"
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
                        <Text variant="bodySmall">
                          <Fontisto
                            name="blood-drop"
                            size={18}
                            color="#d0312d"
                          />{" "}
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
                      <Text>
                        fdfiej eiijir eijriej eijrie erioejir enriweior
                      </Text>
                      <Card.Actions>
                        <Button mode="contained" onPress={toConfirm}>
                          donate <FontAwesome name="smile-o" size={18} />{" "}
                        </Button>
                      </Card.Actions>
                    </Card.Content>
                  </Card>
                ))}
              </>
            ) : (
              <>
                <Card style={{ backgroundColor: "#ffffff" }}>
                  <Card.Title
                    title="edwin "
                    subtitle="2mins"
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
              </>
            )}
          </>
        )}
      </ScrollView>
      <AnimatedFAB
        icon={"arrow-right"}
        label={"request donors"}
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
    // marginTop: StatusBar.currentHeight || 0,
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
