import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function DirectionScreen({ route, navigation }) {
  const { lat, long } = route.params;
  console.log(route.params);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:0.4518321,
          longitude:34.24928,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
