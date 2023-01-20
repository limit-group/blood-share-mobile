import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";


export default function ThankYouScreen({ navigation }) {

  const onGo = () => {
    navigation.navigate("Feed")
  };

 
  return (
    <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Thank You for taking a step towards savings lives.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onGo()}>
          <Text style={styles.buttonTitle}>go to donation drives. <MaterialCommunityIcons  /></Text>
        </TouchableOpacity>
    </View>
  );
}
