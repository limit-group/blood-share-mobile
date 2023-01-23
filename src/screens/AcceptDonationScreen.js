import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../utils/styles";

export default function AcceptDonationScreen({ navigation }) {
  const onAccept = () => {
    navigation.navigate("Thank You");
  };

  const onDecline = () => {
    navigation.navigate("Requests");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/icon.png")} />
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Accept to go and donate.You will recieve map directions in sms
        </Text>
      </View>
      <View style={styles.sideButtons}>
        <TouchableOpacity style={styles.button} onPress={() => onAccept()}>
          <Text style={styles.buttonTitle}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onDecline()}>
          <Text style={styles.buttonTitle}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
