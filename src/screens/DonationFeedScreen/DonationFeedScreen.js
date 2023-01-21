import axios from "axios";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Card, FAB, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

export default function DonationFeedScreen({ navigation }) {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/feeds")
      .then((res) => {
        setFeeds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
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
            source={require("../../../assets/blood.jpg")}
            style={{ padding: 5 }}
          />
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        color={styles.primary}
        onPress={() => navigation.navigate("Donation Post")}
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
