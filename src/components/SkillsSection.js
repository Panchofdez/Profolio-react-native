import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const SkillsSection = ({ skills }) => {
  return (
    <FlatList
      horizontal
      data={skills}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Button
          title={item}
          buttonStyle={styles.skillBtn}
          titleStyle={styles.btnTitle}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  skillBtn: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "transparent",
    margin: 5,
  },
  btnTitle: {
    color: "white",
  },
});

export default SkillsSection;
