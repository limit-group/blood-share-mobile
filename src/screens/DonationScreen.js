import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { AnimatedFAB, List, Searchbar } from "react-native-paper";

export default function DonationScreen({
  navigation,
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) {
  const [isExtended, setIsExtended] = React.useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  const toDonor = () => {
    navigation.navigate("donated")
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
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
      </ScrollView>
      <AnimatedFAB
        icon={"arrow-right"}
        label={"donated now"}
        color="#000"
        extended={isExtended}
        onPress={toDonor}
        visible={visible}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    backgroundColor: "#ffffff",
  },
});
