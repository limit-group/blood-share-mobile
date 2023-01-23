import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import styles from "../utils/styles";

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

    navigation.navigate("Verify");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/signup.png")}
        />
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>Sign up.</Text>
        </View>
        <TextInput
          style={styles.input}
          label="Mobile(+254..)"
          left={<TextInput.Icon icon={"cellphone"} />}
          // placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          // placeholderTextColor="#aaaaaa"
          secureTextEntry
          label="Password"
          left={<TextInput.Icon icon={"shield-lock-outline"} />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          left={<TextInput.Icon icon={"shield-lock-outline"} />}
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <View style={styles.disclaimer}>
          <Text style={styles.footerText}>
            By signing up you agree to our{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Terms & conditions
            </Text>{" "}
            and{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Saving lives already?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              LogIn
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
