import axios from "axios";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator, Snackbar, TextInput } from "react-native-paper";
import { api } from "../utils/api";
import styles from "../utils/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getError } from "../utils/error";

export default function LoginScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState("");
  const onDismissSnackBar = () => setVisible(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (!phone || !password || !confirmPassword) {
      setError("Please fill out your details!");
      setVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setVisible(true);
      return;
    }
    setLoading(true);
    axios
      .post(`${api}/auth/signup`, { phone, password })
      .then((res) => {
        if (res.status == 201) {
          navigation.navigate("Verify");
        } else if (res.status == 400) {
          setError(res.data.message);
          setVisible(true);
          return;
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(getError(err));
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
          source={require("../../assets/signup.png")}
        />
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>Sign up.</Text>
        </View>
        <TextInput
          style={styles.input}
          label="Mobile Number"
          mode="outlined"
          placeholder="+2547.."
          keyboardType="phone-pad"
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
          mode="outlined"
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
          mode="outlined"
          left={<TextInput.Icon icon={"shield-lock-outline"} />}
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
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
          <Text style={styles.buttonTitle}>
            {loading ? <ActivityIndicator animating={true} size={50} /> : "Continue"}
          </Text>
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
      <Snackbar
        visible={visible}
        duration={1000}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: "#fc7d7b"}}
        action={{
          label: "ok",
          onPress: () => {
            // Do something
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
