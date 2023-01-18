import React, { useState } from "react";
import {
  AppRegistry,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { Button, Title } from "react-native-paper";
import styles from "../../utils/styles";

export default function CreateFeedScreen({ navigation }) {
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

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
        {image && (
          <Image
            source={{ uri: image }}
            style={[styles.logo, { width: 200, height: 200 }]}
          />
        )}

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            tell others about upcoming blood donation drives.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="donation drive info..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDesc(text)}
          value={desc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonTitle}>drive image poster </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onFeedPress()}>
          <Text style={styles.buttonTitle}>Start Post</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
