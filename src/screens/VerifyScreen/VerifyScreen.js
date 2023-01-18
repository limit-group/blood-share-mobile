import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";


export default function VerifyScreen({ navigation }) {
  const [code, setCode] = useState("");

  const onVerifyPress = () => {
    navigation.navigate("Complete")
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            enter the 4 digit code shared via sms.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="4-digit-code"
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
