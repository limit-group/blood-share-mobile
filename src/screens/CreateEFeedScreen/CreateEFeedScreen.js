import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
export default function CreateEFeedScreen({ navigation }) {
  const [bloodType, setBloodType] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000))
  const [desc, setDesc] = useState("");

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

  const onFeedPress = () => {
    navigation.navigate("Complete");
  };

  const pickLocation = () => {};

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Choose blood group.</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Blood Type Required..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setBloodType(text)}
          value={bloodType}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Additional info.</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="emergency info..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDesc(text)}
          value={desc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>when?</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingLeft: 30, paddingRight: 30 }}>
          <Button mode="contained" onPress={pickLocation}>
            immediately
          </Button>
          <Button mode="contained" onPress={showDatepicker}>
            <MaterialCommunityIcons name="calendar" size={16} />
          </Button>
        </View>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>where?</Text>
        </View>
        <TouchableOpacity style={styles.pickButton} onPress={pickLocation}>
          <Text style={styles.pickButtonTitle}>
            <Entypo name="location" size={16} /> share live location.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onFeedPress()}>
          <Text style={styles.buttonTitle}>find a donor</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
