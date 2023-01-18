import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { List, Searchbar } from "react-native-paper";

export default function DonationScreen() {
  return (
    <View style={styles.container}>
      <List.Item
        title="makini hospital"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="hospital-marker" />}
      />
      <List.Item
        title="makini hospital"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="hospital-marker" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
});
