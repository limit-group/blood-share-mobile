import axios from "axios";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  AnimatedFAB,
  List,
  Searchbar,
} from "react-native-paper";
import { api } from "../utils/api";
import { getValue } from "../utils/auth";
import { getError } from "../utils/error";
export default function DonationScreen({
  navigation,
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) {
  const [isExtended, setIsExtended] = React.useState(true);
  const [donations, setDonations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  const toDonor = () => {
    navigation.navigate("donated");
  };

  React.useEffect(() => {
    setLoading(true);
    async function getDonations() {
      const token = await getValue("token");
      axios
        .get(`${api}/donations`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDonations(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    getDonations().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ paddingTop: 50 }}>
          <ActivityIndicator animating={true} size={50} />
        </View>
      ) : (
        <ScrollView onScroll={onScroll}>
          {donations.map((donation) => (
            <List.Item
              title="makini hospital"
              description="Item description"
              left={(props) => <List.Icon {...props} icon="hospital-marker" />}
            />
          ))}
        </ScrollView>
      )}
      <AnimatedFAB
        icon={"arrow-right"}
        label={"donated now"}
        color="#000"
        extended={isExtended}
        onPress={toDonor}
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
    position: "absolute",
    backgroundColor: "#ffffff",
  },
});
