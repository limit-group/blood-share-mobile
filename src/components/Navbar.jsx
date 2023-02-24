import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Avatar, Button, Divider, Menu } from "react-native-paper";
export default function Navbar({ navigation, back, props }) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={styles.header} mode={"small"}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={props.name} />

      <Avatar.Image size={24} source={require("../../assets/avatar.png")} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: "10",
    backgroundColor: "#fff", 
  }
});
