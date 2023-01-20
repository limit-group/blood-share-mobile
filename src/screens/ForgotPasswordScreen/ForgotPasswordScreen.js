import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";


export default function ForgotPasswordScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const onForgotPress = () => {
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
            enter the phone number used during registration.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="phone number "
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onForgotPress()}>
          <Text style={styles.buttonTitle}>Reset Password</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
