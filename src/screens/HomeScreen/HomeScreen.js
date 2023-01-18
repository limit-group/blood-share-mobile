import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StatusBar, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        style={styles.search}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <MapView
        style={styles.map}
        // showsUserLocation={true}
        // loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  search: {
    padding: 5,
  },
});
