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
  Button,
  List,
  Searchbar,
} from "react-native-paper";
import { url } from "../utils/api";
import { getValue } from "../utils/auth";
import { getError } from "../utils/error";
import moment from "moment";
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
    navigation.navigate("Record Donation");
  };

  const getDonations = async () => {
    const token = await getValue("token");
    axios
      .get(`${url}/api/donations/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDonations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getDonations().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View>
          <Image
            style={{
              height: 270,
              // margin: 50,
              width: "100%",
              borderRadius: 50,
            }}
            source={require("../../assets/no_data.png")}
          />
          <Button
            style={{ margin: 20 }}
            mode="contained"
            onPress={() => navigation.navigate("Record Donation")}
          >
            Donate to earn more life points..
          </Button>
        </View>
      ) : (
        <ScrollView onScroll={onScroll}>
          {donations.map((donation) => (
            <List.Section
              style={{ paddingLeft: 30, paddingRight: 30 }}
              key={donation.id}
            >
              <List.Subheader>
                On {moment(donation.createdAt).format("dddd, MMMM Do YYYY")}
              </List.Subheader>
              <List.Item
                title={donation.facility}
                left={() => <List.Icon icon="hospital-marker" />}
              />
              <List.Item
                title={donation.donorNumber}
                left={() => <List.Icon icon="card-account-details-outline" />}
              />
            </List.Section>
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
    bottom: 36,
    right: 16,
    position: "absolute",
    backgroundColor: "#ffffff",
  },
});
