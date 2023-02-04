import React, { useEffect, useState, useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator, TextInput } from "react-native-paper";
import styles from "../utils/styles";
import axios from "axios";
import { api } from "../utils/api";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  const onLoginPress = () => {
    setLoading(true);
    axios
      .post(`${api}/auth/login`, { phone, password })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          save("token", res.data.token);
          setLoading(false);
          navigation.navigate("Complete Profile");
        } else {
          alert("wrong login credentials");
        }
      })
      .catch((err) => {
        // alert(err);
        setLoading(false);
        console.log(err);
      });
  };
  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const toForgot = () => {
    navigation.navigate("Forgot Password");
  };

  React.useEffect(() => {
   const token =  getValueFor("token");
   console.log(token);

  }, []);

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
          label="Mobile(+254..)"
          mode="outlined"
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
            <Text style={styles.buttonTitle}>login</Text>
          </TouchableOpacity>
        )}

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
