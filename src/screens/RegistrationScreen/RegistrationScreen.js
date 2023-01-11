import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    // if (password !== confirmPassword) {
    //   alert("Passwords don't match.");
    //   return;
    // }
  
    navigation.navigate("Verify")
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
        <TextInput
          style={styles.input}
          placeholder="Phone Number(+254..)"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
          <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
    
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              LogIn
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
