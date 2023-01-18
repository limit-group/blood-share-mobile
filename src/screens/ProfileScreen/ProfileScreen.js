import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Headline,
  Paragraph,
  Portal,
} from "react-native-paper";
import styles from "../../utils/styles";


export default function ProfileScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View>
        {/* <Image
          style={[styles.logo,{ width: 200, height: 200 } ]}
          source={require("../../../assets/blood.jpg")}
        /> */}
        <Headline>Edwin Odhiambo</Headline>
        <Paragraph>123 Kisii, Kenya.</Paragraph>
      </View>
      <View>
        <Headline></Headline>
        <Divider />
        <Button onPress={() => navigation.navigate("CompleteProfile")}>
          Update Profile
        </Button>
        <Divider />
        <Button onPress={() => navigation.navigate("NewPassword")}>
          Change Password.
        </Button>
        <Divider />
        <Button onPress={() => navigation.navigate("Home")}>Logout</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>Are you sure you want to logout?</Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => console.log("Cancel")}>Cancel</Button>
              <Button onPress={() => console.log("Ok")}>Logout</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Divider />
        <Button onPress={() => navigation.navigate("Home")}>
          Privacy Policy
        </Button>
        <Paragraph>&copy; Limit Group.</Paragraph>
      </View>
    </View>
  );
}

