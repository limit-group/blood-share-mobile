import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../utils/styles";
import { Button, TextInput } from "react-native-paper";

export default function CreateFeedScreen({ navigation }) {
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  const pickLocation = () => {};

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

  const onFeedPress = () => {
    navigation.navigate("Complete");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input}
          // multiline={true}
          numberOfLines={6}
          placeholder="about the donation drive..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDesc(text)}
          value={desc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {image && (
          <Image
            source={{ uri: image }}
            style={[{ width: "100%", height: 200 }]}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 5,
          }}
        >
          <Button style={styles.pickButton} onPress={pickImage} mode="outlined">
            <Text style={styles.pickButtonTitle}>
              <MaterialCommunityIcons name="camera" size={16} />
            </Text>
          </Button>
          <Button
            style={styles.pickButton}
            onPress={pickLocation}
            mode="outlined"
          >
            <Text style={styles.pickButtonTitle}>
              <Entypo name="location" size={16} />
            </Text>
          </Button>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => onFeedPress()}>
          <Text style={styles.buttonTitle}>
            annonce drive <MaterialCommunityIcons name="share" size={16} />
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
