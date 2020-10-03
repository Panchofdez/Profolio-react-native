import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button, Card } from "react-native-elements";

const Categories = ({ setCategory }) => {
  return (
    <ScrollView
      style={{ marginBottom: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => setCategory(["architect"])}>
        <Card
          image={require("../../assets/architecture.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Architecture
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory(["art"])}>
        <Card
          image={require("../../assets/art.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Art
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setCategory(["business", "analyst", "manager", "consultant"])
        }
      >
        <Card
          image={require("../../assets/business.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Business
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory(["dance"])}>
        <Card
          image={require("../../assets/dance.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Dance
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory(["design"])}>
        <Card
          image={require("../../assets/design.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Design
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory(["engineer"])}>
        <Card
          image={require("../../assets/engineer.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Engineering
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory(["fashion", "model"])}>
        <Card
          image={require("../../assets/fashion.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Fashion
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory(["photo"])}>
        <Card
          image={require("../../assets/photography.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Photography
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCategory(["software", "programming", "develop"])}
      >
        <Card
          image={require("../../assets/software.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Software
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCategory(["player", "coach", "athlete"])}
      >
        <Card
          image={require("../../assets/sports.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Sports
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCategory(["write", "edit"])}>
        <Card
          image={require("../../assets/writing.jpg")}
          imageStyle={{ width: 130, height: 100 }}
          containerStyle={styles.cardContainerStyle}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}
          >
            Writing
          </Text>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#181a18",
    borderWidth: 0,
    marginLeft: 10,
    marginRight: 3,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    elevation: 10,
  },
});

export default Categories;
