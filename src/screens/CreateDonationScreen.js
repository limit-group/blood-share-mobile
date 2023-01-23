import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, TextInput } from "react-native-paper";
import styles from "../utils/styles";

export default function CreateDonationScreen({ navigation }) {
  const [facility, setFacility] = useState("");
  const [donation, setDonation] = useState("");
  const [date, setDate] = useState("");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(true);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onCompletePress = () => {
    // fetch(`{api}/`);
    navigation.navigate("Thank You");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            record a donation made to save lives and earn life points.
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
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 5 }}>
          <Button mode="contained" onPress={showDatepicker}>
            <MaterialCommunityIcons name="calendar" size={16} />
            date of donation
          </Button>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onCompletePress()}
        >
          <Text style={styles.buttonTitle}>record donation</Text>
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
