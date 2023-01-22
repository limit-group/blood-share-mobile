import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";
import { Button } from "react-native-paper";

export default function ThankYouScreen({ navigation }) {
  const onGo = () => {
    navigation.navigate("Feed");
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ height: '100%', margin: 50, width: "100%", borderRadius: 50 }}
        source={require("../../../assets/thank-you.png")}
      />
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Thank You for taking a step towards savings lives.
        </Text>
        <Button mode="contained" onPress={() => onGo()}>
          <Text style={styles.buttonTitle}>
            continue donating <MaterialCommunityIcons name="arrow-right" />
          </Text>
        </Button>
      </View>
    </View>
  );
}
