import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Text, View } from "react-native";
import styles from "../utils/styles";
import { Button, HelperText } from "react-native-paper";
import { api } from "../utils/api";
import { getError } from "../utils/error";
import axios from "axios";

export default function ConfirmScreen({ route,  navigation }) {
  const onGo = async () => {
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
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 270, marginTop: 40, width: "100%", borderRadius: 50 }}
        source={require("../../assets/confirm.png")}
      />
      <View style={[styles.footerView, { margin: 30 }]}>
        <Text style={styles.footerText}>
          You are accepting to donate blood and save lives.
        </Text>
        <HelperText>
          when you click confirm, google maps directions will be shared to your
          mobile through sms to help you locate the health facility where blood
          is required.
        </HelperText>
        <Button
          mode="contained"
          onPress={() => onGo()}
          style={{ marginTop: 20 }}
        >
          <Text style={styles.buttonTitle}>
            Confirm
            <MaterialCommunityIcons name="check" />
          </Text>
        </Button>
      </View>
    </View>
  );
}
