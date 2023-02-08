import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ActivityIndicator,
  Button,
  TextInput,
  Title,
} from "react-native-paper";
import styles from "../utils/styles";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";
import { api } from "../utils/api";

export default function CreateDonationScreen({ navigation }) {
  const [facility, setFacility] = useState("");
  const [value, setValue] = useState("");
  const [donor_number, setDonation] = useState("");
  const [date, setDate] = useState(new Date());
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
    axios
      .post(`${api}/donations`, { donor_number, facility, date })
      .then((res) => {
        if (res.status == 201) {
          navigation.navigate("Thank You");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.input}>
          <Title>
            Record a donation made to save lives and earn life points.
          </Title>
        </View>
        <TextInput
          style={styles.input}
          label="Facility Name"
          mode="outlined"
          left={<TextInput.Icon icon={"hospital-building"} />}
          placeholder="e.g RedCross"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFacility(text)}
          value={facility}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          label="Donor ID"
          left={<TextInput.Icon icon={"identifier"} />}
          mode="outlined"
          placeholder="e.g RC0001"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDonation(text)}
          value={donor_number}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 5 }}>
          <Button mode="contained" onPress={showDatepicker}>
            <MaterialCommunityIcons name="calendar" size={16} />
            date of donation:
          </Button>
        </View>
        {loading ? (
          <ActivityIndicator animating={true} size={50} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onCompletePress()}
          >
            <Text style={styles.buttonTitle}>Record donation</Text>
          </TouchableOpacity>
        )}
        <View style={styles.input}>
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
