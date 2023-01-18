import axios from "axios";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Card,
  FAB,
  IconButton,
  Text,
} from "react-native-paper";
import { api } from "../../utils/api";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function DonationFeedScreen({ navigation }) {
  const [efeeds, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/e-feeds")
      .then((res) => {
        setFeed(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <IconButton centered={true} icon="loading" />
      ) : (
        <ScrollView>
          {efeeds.length > 0 ? (
            <>
              {efeeds.map((feed) => {
                <Card mode="contained">
                  <Card.Title
                    title={`Blood Type: ${feed.bloodType}`}
                    subtitle={feed.createdAt}
                    left={LeftContent}
                  />
                  <Card.Content>
                    <Text variant="bodySmall">{feed.description}</Text>
                  </Card.Content>
                </Card>;
              })}
            </>
          ) : (
            <View>
              <Text style={{ textAlign: "center" }}>No Emergencies</Text>
            </View>
          )}
        </ScrollView>
      )}
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
