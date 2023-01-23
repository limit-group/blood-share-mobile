import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import styles from "../utils/styles";

export default function ResetPasswordScreen({ navigation }) {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onResetPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
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
          source={require("../../../assets/reset.png")}
        />
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>Reset Password.</Text>
        </View>
        <TextInput
          style={styles.input}
          secureTextEntry
          label="New Password"
          left={<TextInput.Icon icon={"shield-lock-outline"} />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          left={<TextInput.Icon icon={"shield-lock-outline"} />}
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onResetPress()}
        >
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
