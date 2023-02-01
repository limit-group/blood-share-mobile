import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import styles from "../utils/styles";
import { Button, RadioButton, TextInput } from "react-native-paper";

// import { api } from "../../constants/index";

export default function CompleteProfileScreen({ navigation }) {
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [dob, setDob] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const date = dob.getFullYear() + "/" + dob.getMonth() + "/" + dob.getDate();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDob(currentDate);
    setShow(true);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: dob,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onCompletePress = () => {
    navigation.navigate("BloodShare", { screen: "Home"});
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flex: 1, marginLeft: 30 }}>
          <Text style={[{ fontWeight: "bold", fontSize: 28 }]}>
            Complete Profile.
          </Text>
        </View>
        {/* {image ? (
          <Image
            source={{ uri: image }}
            style={[styles.logo, { width: 200, height: 70 }]}
          />
        ) : (
          <Image
            style={styles.logo}
            source={require("../../assets/icon.png")}
          />
        )} */}

        <TextInput
          style={styles.input}
          label="Full Name"
          left={<TextInput.Icon icon={"square-edit-outline"} />}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          label="Email"
          left={<TextInput.Icon icon={"email-outline"} />}
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Picker
          selectedValue={bloodType}
          mode="dropdown"
          // mode="dialog"
          style={[styles.input, { borderColor: "#000", borderWidth: 3}]}
          onValueChange={(itemValue, itemIndex) => setBloodType(itemValue)}
        >
          <Picker.Item
            label="type O-"
            value="O_NEGATIVE"
            style={{ fontWeight: "bold" }}
          />
          <Picker.Item
            label="type O+"
            value="O_POSITIVE"
            style={{ fontWeight: "bold" }}
          />
          <Picker.Item
            label="type A+"
            value="A_POSITIVE"
            style={{ fontWeight: "bold" }}
          />
          <Picker.Item
            label="type AB+"
            value="AB_POSITIVE"
            style={{ fontWeight: "bold" }}
          />
          <Picker.Item
            label="type AB-"
            value="AB_NEGATIVE"
            style={{ fontWeight: "bold" }}
          />
          <Picker.Item
            label="type B+"
            value="B_POSITIVE"
            style={{ fontWeight: "bold" }}
          />
          <Picker.Item
            label="type B-"
            value="B_NEGATIVE"
            style={{ fontWeight: "bold" }}
          />
          <Picker.Item
            label="Blood Group"
            value=""
            // style={{ color: "#aaaaaa" }}
          />
        </Picker>
        <Button
          onPress={showDatepicker}
          mode="outlined"
          textColor="#000"
          style={styles.pickButton}
        >
          <MaterialCommunityIcons name="calendar" />
          {show ? date : "Date of Birth"}
        </Button>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          label="Body Weight(in Kgs)"
          left={<TextInput.Icon icon={"weight-lifter"} />}
          onChangeText={(text) => setBodyWeight(text)}
          value={bodyWeight}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <RadioButton.Group
          onValueChange={(newValue) => setGender(newValue)}
          value={gender}
        >
          <View style={[styles.input, { flexDirection: "row" }]}>
            <Text>Male</Text>
            <RadioButton value="male" />

            <Text>Female</Text>
            <RadioButton value="female" />

            <Text>Non binary</Text>
            <RadioButton value="non-binary" />
          </View>
        </RadioButton.Group>
        <Button onPress={pickImage} mode="outlined" style={styles.pickButton}>
          <MaterialCommunityIcons name="camera" size={16} /> profile picture
        </Button>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onCompletePress()}
        >
          <Text style={styles.buttonTitle}>complete</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}