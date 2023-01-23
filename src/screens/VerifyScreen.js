import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import styles from "../utils/styles";

export default function VerifyScreen({ navigation }) {
  const [code, setCode] = useState("");

  const onVerifyPress = () => {
    navigation.navigate("Complete");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/verify.png")}
        />
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>Enter OTP</Text>
          <Text>A 4 digit code has been sent to you phone</Text>
        </View>
        <TextInput
          style={styles.input}
          label="4-digit-code"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setCode(text)}
          value={code}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onVerifyPress()}>
          <Text style={styles.buttonTitle}>Verify</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
