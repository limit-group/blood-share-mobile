import axios from "axios";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { api } from "../utils/api";
import styles from "../utils/styles";

export default function ForgotPasswordScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const onForgotPress = () => {
    console.log("clicked");
    axios
      .post(`${api}/auth/forgot`, { phone })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.status);
          navigation.navigate("Verify");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../assets/forgot.png")}
        />
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>
            Forgot Password?
          </Text>
          <Text>
            Don't worry! It happens. Please enter the mobile number associated
            with your account.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Mobile(+254..)"
          left={<TextInput.Icon icon={"cellphone"} />}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onForgotPress}>
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
