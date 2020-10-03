import React from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ad8e" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161716",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    borderRadius: 100,
    borderWidth: 3,
    borderTopColor: "#00ad8e",
    borderBottomColor: "#00ad8e",
    borderColor: "white",
    width: 200,
    height: 200,
  },
});

export default Loading;
