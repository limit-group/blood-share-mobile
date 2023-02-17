import React, { useEffect, useState, useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator, Snackbar, TextInput } from "react-native-paper";
import styles from "../utils/styles";
import axios from "axios";
import { api } from "../utils/api";
import { getError } from "../utils/error";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState("");
  const onDismissSnackBar = () => setVisible(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const toForgot = () => {
    navigation.navigate("Forgot Password");
  };

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    return;
  }

  const onLoginPress = async () => {
    const re =
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
    if (phone.length < 10 || !re.test(phone)) {
      setError("Enter valid phone number.");
      setVisible(true);
      return;
    }

    setLoading(true);
    axios
      .post(`${api}/auth/login`, { phone, password })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          save("token", res.data.token);
          setLoading(false);
          navigation.navigate("Complete Profile");
          return;
        } else {
          setError("Wrong login credentials");
          setVisible(true);
          return;
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(getError(err));
        setVisible(true);
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../assets/login.png")} />
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>Login.</Text>
        </View>
        <TextInput
          style={styles.input}
          label="Mobile Number"
          mode="outlined"
          keyboardType="phone-pad"
          placeholder="+2547.."
          left={<TextInput.Icon icon={"cellphone"} />}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          // underlineColorAndroid="transparent"
          // autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          label="Password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          mode="outlined"
          left={<TextInput.Icon icon={"shield-lock-outline"} />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <Text style={styles.left} onPress={toForgot}>
          Forgot password?
        </Text>

        {loading ? (
          <ActivityIndicator animating={true} size={50} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}
          >
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        )}

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <Snackbar
        visible={visible}
        duration={1000}
        style={{ backgroundColor: "#fc7d7b" }}
        onDismiss={onDismissSnackBar}
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
