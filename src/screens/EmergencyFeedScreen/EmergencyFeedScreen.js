import React, { useState } from "react";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, FAB, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function DonationFeedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={{ paddingBottom: 2 }}>
          <Card.Title title="edwin " subtitle="2mins" left={LeftContent} />
          <Card.Content>
            <Text variant="bodySmall">
              Card content eete etebf ghjjjjj yjyj yuyuyi iyi sdsd sadasd adwefe{" "}
            </Text>
          </Card.Content>
          <Card.Cover
            source={{ uri: "https://picsum.photos/600" }}
            style={{ padding: 5 }}
          />
        </Card>
        <Card>
          <Card.Title title="edwin " subtitle="2mins" left={LeftContent} />
          <Card.Content>
            <Text variant="bodySmall">
              Card content eete etebf ghjjjjj yjyj yuyuyi iyi sdsd sadasd adwefe{" "}
            </Text>
          </Card.Content>
          <Card.Cover
            source={{ uri: "https://picsum.photos/400" }}
            style={{ padding: 5 }}
          />
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Emergency Post")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
