import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import styles from "../utils/styles";
import {
  ActivityIndicator,
  Button,
  Chip,
  HelperText,
  RadioButton,
  Snackbar,
  TextInput,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { api } from "../utils/api";
import { getValue } from "../utils/auth";
import { getError } from "../utils/error";

export default function EditProfile({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState("");
  const onDismissSnackBar = () => setVisible(false);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [dob, setDob] = useState(new Date());
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = React.useState("");
  const date = dob.getFullYear() + "-" + dob.getMonth() + "-" + dob.getDate();

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

  const onCompletePress = async () => {
    setLoading(true);
    const token = await getValue("token");
    const data = {
      gender,
      bloodType,
      email,
      bodyWeight,
      dob,
      email,
      fullName,
      image,
    };
    axios
      .post(`${api}/auth/profiles/update`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        if (res.status == 200) {
          await save("profile", "complete");
          setLoading(false);
          // navigation.navigate("BloodShare", { screen: "Home" });
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(getError(err));
        setVisible(true);
        console.log(err);
      });
  };

  React.useEffect(() => {
    const findUser = async () => {
      const token = await getValue("token");
      axios
        .get(`${api}/auth/profiles`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError(getError(err));
          setVisible(true);
        });
    };

    findUser().catch((err) => console.log(err));
  }, []);

  return (
    <View style={[styles.container]}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flex: 1, marginLeft: 30 }}>
          {/* <HelperText>You know about us, help us know you too.</HelperText> */}
        </View>
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {profile.avatar ? (
            <Image
              source={{ uri: profile.avatar }}
              style={{
                flex: 1,
                height: 140,
                width: "50%",
                borderRadius: 50,
                alignSelf: "center",
                objectFit: "cover",
                marginTop: 20,
                marginBottom: 0,
                margin: 33,
              }}
            />
          ) : (
            <Image
              style={{
                flex: 1,
                height: 150,
                width: "50%",
                borderRadius: 50,
                alignSelf: "center",
                objectFit: "cover",
                marginTop: 10,
                marginBottom: 0,
                margin: 33,
              }}
              source={require("../../assets/avatar.png")}
            />
          )}
          <Chip
            icon="camera"
            onPress={pickImage}
            mode="outlined"
            style={{ height: 50, top: 80 }}
          >
            edit
          </Chip>
        </View>

        <TextInput
          style={styles.input}
          label="Full Name"
          placeholder="john doe"
          mode="outlined"
          left={<TextInput.Icon icon={"square-edit-outline"} />}
          onChangeText={(text) => setFullName(text)}
          value={profile.name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          placeholder="johndoe@gmail.com"
          keyboardType="email-address"
          left={<TextInput.Icon icon={"email-outline"} />}
          onChangeText={(text) => setEmail(text)}
          value={profile.email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          mode="outlined"
          placeholder="e.g 50"
          label="Body Weight(in Kgs)"
          keyboardType="numeric"
          left={<TextInput.Icon icon={"weight-lifter"} />}
          onChangeText={(text) => setBodyWeight(text)}
          value={profile.bodyWeight}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <RadioButton.Group
          onValueChange={(newValue) => setGender(newValue)}
          value={profile.gender}
        >
          <View style={[styles.input, { flexDirection: "row" }]}>
            <Text>Male</Text>
            <RadioButton value="MALE" />

            <Text>Female</Text>
            <RadioButton value="FEMALE" />

            <Text>Non binary</Text>
            <RadioButton value="NON_BINARY" />
          </View>
        </RadioButton.Group>
        {loading ? (
          <ActivityIndicator animating={true} size={50} />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onCompletePress()}
          >
            <Text style={styles.buttonTitle}>Save</Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
      <Snackbar
        visible={visible}
        style={{ backgroundColor: "#fc7d7b" }}
        duration={1000}
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
