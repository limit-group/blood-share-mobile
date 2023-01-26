import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
export default function Navbar({ navigation, back }) {
  return (
    <Appbar.Header style={{ backgroundColor: "#fff" }} mode={"center-aligned"}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="" />
      <Appbar.Action
        icon="account-circle-outline"
        size={40}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
      {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({});
