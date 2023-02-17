import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Button, Divider, Menu } from "react-native-paper";
export default function Navbar({ navigation, back, props }) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={{ backgroundColor: "#fff" }} mode={"center-aligned"}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={props.name} />

      <Menu
        visible={visible}
        style={{ background: '#ffffff'}}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
      >
        <Menu.Item onPress={() => {}} title="Logout" />
      </Menu>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({});
