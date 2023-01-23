import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// DateTimePickerAndroid.open(params: AndroidNativeProps)
// DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])
import styles from "../utils/styles";

// import { api } from "../../constants/index";

export default function CompleteProfileScreen({ navigation }) {
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

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onCompletePress = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={[styles.logo, { width: 200, height: 200 }]}
          />
        ) : (
          <Image
            style={styles.logo}
            source={require("../../../assets/icon.png")}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Picker
          selectedValue={bloodType}
          style={styles.input}
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
            label="blood type"
            value=""
            style={{ color: "#aaaaaa" }}
          />
        </Picker>
        <TouchableOpacity style={styles.pickButton} onPress={showDatepicker}>
          <Text style={styles.pickButtonTitle}>
            <MaterialCommunityIcons name="calendar" size={16} />
            {show ? date : "Date of Birth"}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Body Weight(in Kgs)"
          onChangeText={(text) => setBodyWeight(text)}
          value={bodyWeight}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <Text style={styles.pickButtonTitle}>
            <MaterialCommunityIcons name="camera" size={16} /> profile picture
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onCompletePress()}
        >
          <Text style={styles.buttonTitle}>complete</Text>
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
