import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import styles from "./styles";

export default function BloodCardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://media-exp1.licdn.com/dms/image/C4D03AQGyJc1xGHv8Zg/profile-displayphoto-shrink_200_200/0/1629002177802?e=1674086400&v=beta&t=R-RrZ6TolUh9kaFp2-tchOlXG0P9ZvvZh9hE5g2-tzA",
        }}
      />
      <Card>
        <Card.Title
          style={{ textAlign: "center" }}
          title="Blood Card"
          subtitle="Present This at any health facility"
        />
        <Card.Content>
          <Title>Edwin Odhiambo</Title>
          <Paragraph>Blood Group, AB- </Paragraph>
          <Paragraph>Donation History.</Paragraph>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}
