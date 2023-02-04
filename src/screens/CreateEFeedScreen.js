import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../utils/styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  Button,
  Checkbox,
  RadioButton,
  TextInput,
  Title,
} from "react-native-paper";
export default function CreateEFeedScreen({ navigation }) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [show, setShow] = useState(false);
  const [when, setWhen] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [desc, setDesc] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [mode, setMode] = useState("outlined");
  const [value, setValue] = React.useState("first");

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

  const pickDay = () => {
    setWhen("now");
  };

  const blood = () => {};

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.input}>
          <Title>Blood group.</Title>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 5,
          }}
        >
          <Button mode={mode} onPress={() => setBloodGroup()}>
            A +
          </Button>
          <Button mode={mode} onPress={setBloodGroup}>
            A -
          </Button>
          <Button mode={mode} onPress={setBloodGroup}>
            AB-
          </Button>
          <Button mode={mode} onPress={setBloodGroup}>
            AB+
          </Button>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 5,
          }}
        >
          <Button mode={mode} onPress={setBloodGroup}>
            B +
          </Button>
          <Button mode={mode} onPress={setBloodGroup}>
            B -
          </Button>
          <Button mode={mode} onPress={setBloodGroup}>
            O -
          </Button>
          <Button mode={mode} onPress={setBloodGroup}>
            O +
          </Button>
        </View>
        <View style={styles.input}>
          <Title>Raise Request for</Title>
          <View style={{ margin: 10 }}>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Self</Text>
                <RadioButton value="first" />
                <Text>Others</Text>
                <RadioButton value="second" />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        <TextInput
          style={styles.input}
          mode="outlined"
          label="Patient Name:"
          placeholder="john doe"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDesc(text)}
          value={desc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Relationship to patient:"
          placeholder="e.g father"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDesc(text)}
          value={desc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.input}>
          <Title>When?</Title>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 5,
          }}
        >
          <Button mode="contained" onPress={pickDay}>
            immediately
          </Button>
          <Button mode="contained" onPress={showDatepicker}>
            <MaterialCommunityIcons name="calendar" size={16} />
            upcoming
          </Button>
        </View>

        <View style={styles.input}>
          <Title>where?</Title>
          <Button style={styles.rounded} mode="text">
            <Entypo name="location" size={16} /> my location
          </Button>
          <Button mode="contained" onPress={onFeedPress}>
            Request
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
