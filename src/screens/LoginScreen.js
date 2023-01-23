import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import styles from "../utils/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const toForgot = () => {
    navigation.navigate("Forgot Password");
  };
  const onLoginPress = () => {
    // if (password !== confirmPassword) {
    //   alert("Passwords don't match.");
    //   return;
    // }
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
          source={require("../../../assets/login.png")}
        />
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>Login.</Text>
        </View>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Mobile(+254..)"
          left={<TextInput.Icon icon={"cellphone"} />}
          // left={<TextInput.Affix text="+254" textStyle={styles.affix} />}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          // underlineColorAndroid="transparent"
          // autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          // placeholder="password"
          left={<TextInput.Icon icon={"shield-lock-outline"} />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <Text style={styles.left} onPress={toForgot}>
          Forgot password?
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>login</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
