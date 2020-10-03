import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, Button, Input, ListItem } from "react-native-elements";
import Spacer from "../components/Spacer";
import Divider from "../components/Divider";
import { FontAwesome5 } from "@expo/vector-icons";

const WorkFormScreen = ({ navigation }) => {
  const { portfolio } = navigation.state.params;
  return (
    <SafeAreaView style={styles.container}>
      <Spacer>
        <Text style={styles.text}>
          Showcase your work through collections of photos and videos
        </Text>
      </Spacer>
      <Spacer>
        <Button
          buttonStyle={styles.button}
          title="Add a collection"
          onPress={() => navigation.navigate("CollectionCreate")}
          icon={
            <FontAwesome5
              name="camera"
              solid
              size={25}
              color="white"
              style={{ marginHorizontal: 10 }}
            />
          }
        />
      </Spacer>
      <Spacer>
        <Button
          buttonStyle={styles.button}
          title="Add a video"
          onPress={() => navigation.navigate("VideosCreate")}
          icon={
            <FontAwesome5
              name="video"
              solid
              size={25}
              color="white"
              style={{ marginHorizontal: 10 }}
            />
          }
        />
      </Spacer>
      <Spacer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161716",
    color: "white",
  },
  button: {
    backgroundColor: "#00ad8e",
    borderRadius: 25,
  },
  text: {
    color: "white",
    fontSize: 25,
    margin: 10,
  },
  collectionContainer: {
    backgroundColor: "#161716",
  },
});

export default WorkFormScreen;
