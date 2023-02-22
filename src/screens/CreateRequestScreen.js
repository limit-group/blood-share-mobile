import React, { useState } from "react";
import * as Location from "expo-location";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../utils/styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Chip,
  HelperText,
  Modal,
  Portal,
  ProgressBar,
  Provider,
  RadioButton,
  Snackbar,
  TextInput,
  Title,
} from "react-native-paper";
import axios from "axios";
import { api } from "../utils/api";
import { getError } from "../utils/error";
import { getValue, save } from "../utils/auth";

export default function CreateRequestScreen({ navigation }) {
  //loading
  const [loading, setLoading] = useState(false);

  //snackbar
  const [visibo, setVisibo] = React.useState(false);
  const [error, setError] = React.useState("");
  const onDismissSnackBar = () => setVisibo(false);

  const [bloodGroup, setBloodGroup] = useState("");
  const [show, setShow] = useState(false);
  const [when, setWhen] = useState("");
  const [date, setDate] = useState(new Date());
  const [patientName, setPatientName] = useState("");
  const [mode, setMode] = useState("outlined");
  const [requestType, setRequestType] = React.useState("SELF");
  const [relationship, setRelationship] = useState("");
  const [needed, setNeeded] = useState("");

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 30 };
  const [valu, setValu] = useState("");
  const [mod, setMod] = useState("outlined")
  const [mod_one, setModOne] = useState("outlined")


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(true);
    setModOne("contained")
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
    setMod("contained")
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
      save("location", JSON.stringify(location));
    })();
  }, [location]);

  const onFeedPress = async () => {
    const location = await getValue("location");
    let latitude = JSON.parse(location)["coords"]["latitude"];
    let longitude = JSON.parse(location)["coords"]["longitude"];
    const token = await getValue("token");
    const data = {
      when,
      requestType,
      bloodGroup,
      needed,
      latitude,
      longitude,
      relationship,
      patientName,
    };

    console.log(data);

    if (!data) {
      setError("All data must be filled");
      setVisibo(true);
      return;
    }
    setLoading(true);

    axios
      .post(`${api}/requests`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status == 201) {
          setLoading(false);
          navigation.navigate("BloodShare");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(getError(err));
        setVisibo(true);
        console.log(err);
      });
  };

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
                <RadioButton value="SELF" />
                <Text>Others</Text>
                <RadioButton value="OTHERS" />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        {value == "OTHERS" ? (
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
          <Title>When: </Title>
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
          <Button mode={mod} onPress={pickDay}>
            immediately
          </Button>
          <Button mode={mod_one} onPress={showDatepicker}>
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
          <HelperText>
            Your device location will be shared by donors so that they can
            easily trace where they need to donate.
          </HelperText>
          {loading ? (
            <ActivityIndicator animating={true} size={50} />
          ) : (
            <Button mode="contained" onPress={onFeedPress}>
              Start Request <MaterialCommunityIcons name="arrow-right" />
            </Button>
          )}
        </View>
      </KeyboardAwareScrollView>
      <Snackbar
        visible={visibo}
        duration={1000}
        style={{ backgroundColor: "#fc7d7b" }}
        onDismiss={onDismissSnackBar}
        action={{
          label: "OK",
          color: "white",
          onPress: () => {
            onDismissSnackBar;
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
