import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button, Checkbox, TextInput } from "react-native-paper";
export default function CreateEFeedScreen({ navigation }) {
  const [bloodType, setBloodType] = useState("");
  const [show, setShow] = useState(false);
  const [when, setWhen] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [desc, setDesc] = useState("");
  const [checked, setChecked] = React.useState(false);

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

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.footerView}>
          <Text style={styles.footerText}>choose blood group.</Text>
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
          <Button mode="contained" onPress={pickDay}>
            A +
          </Button>
          <Button mode="contained" onPress={pickDay}>
            A -
          </Button>
          <Button mode="contained" onPress={pickDay}>
            AB-
          </Button>
          <Button mode="contained" onPress={pickDay}>
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
          <Button mode="contained" onPress={pickDay}>
            B +
          </Button>
          <Button mode="contained" onPress={pickDay}>
            B -
          </Button>
          <Button mode="contained" onPress={pickDay}>
            O -
          </Button>
          <Button mode="contained" onPress={pickDay}>
            O +
          </Button>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>additional info.</Text>
        </View>
        
        <TextInput
          style={styles.input}
          // mode="outlined"
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
