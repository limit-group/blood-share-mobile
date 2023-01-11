import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

export default function CreateFeedScreen({ navigation }) {
  const [desc, setDesc] = useState("");

  const onFeedPress = () => {
    navigation.navigate("Complete")
  };

  return ( 
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Write about the drive..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDesc(text)}
          value={desc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onFeedPress()}>
          <Text style={styles.buttonTitle}>Start Post</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
