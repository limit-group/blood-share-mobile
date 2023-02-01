import React from "react";
import { Snackbar } from "react-native-paper";

export default function Feedback({ props }) {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismissSnackBar}
      action={{
        label: "ok",
        onPress: () => {
          // Do something
        },
      }}
    >
      {props.message}
    </Snackbar>
  );
}
