import axios from "axios";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Title } from "react-native-paper";
import { api } from "../utils/api";
import { getValue } from "../utils/auth";
import styles from "../utils/styles";

export default function AcceptDonationScreen({ route, navigation }) {
  const onAccept = async () => {
    const token = await getValue("token");
    axios
      .get(`${api}/requests/accept/${route.params.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          navigation.navigate("Thank You");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDecline = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Image
          style={{
            height: 270,
            width: "100%",
            borderRadius: 50,
          }}
          source={require("../../assets/map.png")}
        />

      <View style={{ margin: 30 }}>
        <Title style={{ textAlign: "center" }}>
          Accept to go and donate.{" \n"}You will recieve map directions in sms.
        </Title>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 50,
          }}
        >
          <Button onPress={onDecline} mode="outlined">
            Decline
          </Button>
          <Button onPress={onAccept} mode="contained">
            Accept
          </Button>
        </View>
      </View>
    </View>
  );
}
