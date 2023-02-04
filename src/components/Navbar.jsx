import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
export default function Navbar({ navigation, back, props }) {
  return (
    <Appbar.Header style={{ backgroundColor: "#fff" }} mode={"center-aligned"}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={props.name} />

      <Appbar.Action icon="dots-vertical" />
   
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({});
