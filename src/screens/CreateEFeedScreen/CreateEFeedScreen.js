import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../utils/styles";


export default function CreateEFeedScreen({ navigation }) {
  const [bloodType, setBloodType] = useState("");
  const [desc, setDesc] = useState("");

  const onFeedPress = () => {
    navigation.navigate("Complete");
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
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            announce an emergency blood situation.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Blood Type Required..."
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setBloodType(text)}
          value={bloodType}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Where is the emergency..."
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
