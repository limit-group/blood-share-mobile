import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";


export default function CreateDonationScreen({ navigation }) {
  const [facility, setFacility] = useState("");
  const [donation, setDonation] = useState("");
  const [date, setDate] = useState("");

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
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Record donation made to save lives.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="name of health facility"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFacility(text)}
          value={facility}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="donation number"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDonation(text)}
          value={donation}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Date Of Birth"
          onChangeText={(text) => setDate(text)}
          value={date}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onCompletePress()}
        >
          <Text style={styles.buttonTitle}>record.</Text>
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
