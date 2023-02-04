import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../utils/styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import {
  Button,
  Checkbox,
  Chip,
  Modal,
  Portal,
  ProgressBar,
  Provider,
  RadioButton,
  TextInput,
  Title,
} from "react-native-paper";
import axios from "axios";
export default function CreateEFeedScreen({ navigation }) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [show, setShow] = useState(false);
  const [when, setWhen] = useState("");
  const [date, setDate] = useState(new Date());
  const [patientName, setPatientName] = useState("");
  const [mode, setMode] = useState("outlined");
  const [requestType, setRequestType] = React.useState("self");
  const [relationship, setRelationship] = useState("");
  const [needed, setNeeded] = useState("");
  const onFeedPress = () => {
    console.log(location)
    // axios
    //   .post(`${api}/requests`, {
    //     when,
    //     requestType,
    //     bloodGroup,
    //     needed,
    //     relationship,
    //     patientName,
    //   })
    //   .then((res) => {
    //     if (res.status == 201) {
    //       navigation.navigate("Complete");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 30 };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(true);
  };

  const [value, setValue] = useState("");
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
  const pickDay = () => {
    setWhen(new Date());
  };

  // location
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.latitude)
      setLongitude(location.longitude)
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text.longitude);
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.input}>
          <Title>
            Blood group: <Text style={styles.primary}>{bloodGroup}</Text>
          </Title>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 5,
              }}
            >
              <>
                <Chip
                  mode={mode}
                  value={"A_POSITIVE"}
                  onPress={(value) => {
                    setBloodGroup("A_POSITIVE");
                    setVisible(false);
                  }}
                >
                  A +
                </Chip>
                <Chip
                  mode={mode}
                  onPress={() => {
                    setBloodGroup("A_NEGATIVE");
                    setVisible(false);
                  }}
                >
                  A -
                </Chip>
                <Chip
                  mode={mode}
                  onPress={() => {
                    setBloodGroup("AB_NEGATIVE");
                    setVisible(false);
                  }}
                >
                  AB-
                </Chip>
                <Chip
                  mode={mode}
                  onPress={() => {
                    setBloodGroup("AB_POSITIVE");
                    setVisible(false);
                  }}
                >
                  AB+
                </Chip>
              </>
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
              <Chip
                mode={mode}
                onPress={() => {
                  setBloodGroup("B_POSITIVE");
                  setVisible(false);
                }}
              >
                B +
              </Chip>
              <Chip
                mode={mode}
                onPress={() => {
                  setBloodGroup("B_NEGATIVE");
                  setVisible(false);
                }}
              >
                B -
              </Chip>
              <Chip
                mode={mode}
                onPress={() => {
                  setBloodGroup("O_NEGATIVE");
                  setVisible(false);
                }}
              >
                O -
              </Chip>
              <Chip
                mode={mode}
                onPress={() => {
                  setBloodGroup("O_POSITIVE");
                  setVisible(false);
                }}
              >
                O +
              </Chip>
            </View>
          </Modal>
        </Portal>
        <View style={styles.input}>
          <Button onPress={showModal} mode="outlined">
            Select
          </Button>
        </View>

        <View style={styles.input}>
          <Title>Raise Request for:</Title>
          <View style={{ margin: 10 }}>
            <RadioButton.Group
              onValueChange={(newValue, value) => {
                setValue(newValue);
                setRequestType(value);
              }}
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
                <RadioButton value="self" />
                <Text>Others</Text>
                <RadioButton value="others" />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        {value == "others" ? (
          <>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Patient Name:"
              placeholder="john doe"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setPatientName(text)}
              value={patientName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Relationship to patient:"
              placeholder="e.g father"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setRelationship(text)}
              value={relationship}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </>
        ) : (
          ""
        )}

        <View style={styles.input}>
          <Title>When?</Title>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingLeft: 30,
            paddingRight: 30,
            // paddingTop: 5,
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

        {/* <View style={styles.input}>
          <Title>Where?</Title>
          <Button style={styles.rounded} mode="text">
            <Entypo name="location" size={16} /> my location
          </Button>
        </View> */}
        <View style={styles.input}>
          <Title>Number of blood units:</Title>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingLeft: 30,
              paddingRight: 30,
              // paddingTop: 5,
            }}
          >
            <Text>Maximum: 4 </Text>
            <Text>
              Needed: <Text style={styles.primary}>{needed}</Text>
            </Text>
          </View>

          <Slider
            style={{ width: 300, height: 50, color: "#fc7d7b" }}
            minimumValue={1}
            step={1}
            onValueChange={(value) => setNeeded(value)}
            maximumValue={4}
            minimumTrackTintColor="#fc7d7b"
            maximumTrackTintColor="#000000"
          />
          <Button mode="contained" onPress={onFeedPress}>
            Start Request <MaterialCommunityIcons name="arrow-right" />
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
