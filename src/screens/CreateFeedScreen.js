import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../utils/styles";
import { Button, Chip, TextInput, Title } from "react-native-paper";
import axios from "axios";
import api from "../utils/api";


export default function CreateFeedScreen({ navigation }) {
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onFeedPress = () => {
    axios
      .post(`${api}/feeds`, { description, image })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          navigation.navigate("Feed");
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 50,
          }}
        >
          <Title>Start post</Title>
          <Chip icon="camera" onPress={pickImage} mode="outlined">
            media
          </Chip>
        </View>
        {image && (
          <View
            style={[
              { width: "100%", height: 200, paddingLeft: 30, paddingRight: 30 },
            ]}
          >
            <Image
              source={{ uri: image }}
              style={[{ width: "100%", height: 200, paddingLeft: 30 }]}
            />
          </View>
        )}
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          mode="outlined"
          placeholder="about the donation drive..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDesc(text)}
          value={description}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <View style={{ padding: 30, paddingTop: 0 }}>
          <Button
            mode="contained"
            onPress={() => onFeedPress()}
            style={styles.rounded}
          >
            annonce drive <MaterialCommunityIcons name="share" size={16} />
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
