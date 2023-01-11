import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="search..." />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        loadingEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
