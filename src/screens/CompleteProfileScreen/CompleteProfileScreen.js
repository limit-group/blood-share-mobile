import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { Caption } from "react-native-paper";
// import { api } from "../../constants/index";

export default function CompleteProfileScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onCompletePress = () => {
    // fetch(`{api}/`);
    navigation.navigate("Home");
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
        <Caption style={{ textAlign: "center" }}>profile picture</Caption>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="BloodType"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Date Of Birth"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Body Weight(Kgs)"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onCompletePress()}
        >
          <Text style={styles.buttonTitle}>Complete</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Your Data will be processed according to our{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Privacy Policy.
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
