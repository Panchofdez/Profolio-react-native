import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Loading from "../components/Loading";
import { addSkills } from "../store/actions/myPortfolio";

const SkillsFormScreen = ({ navigation }) => {
  const { skills } = navigation.state.params;
  const [skill, setSkill] = useState("");
  const [skillsArr, setSkillsArr] = useState(skills || []);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleAdd = () => {
    const arr = [...skillsArr, skill];
    setSkill("");
    setSkillsArr(arr);
  };
  const handleRemove = (skillIndex) => {
    const newArr = skillsArr.filter((s, index) => index !== skillIndex);
    setSkillsArr(newArr);
  };
  const handleSubmit = () => {
    setLoading(true);
    const formData = {
      skills: skillsArr,
    };
    dispatch(addSkills(formData));
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spacer>
            <Text style={styles.title}>
              Add a list of your skills and/or services
            </Text>
          </Spacer>
          <Spacer>
            <Input
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              value={skill}
              onChangeText={setSkill}
              label="Skill"
            />
          </Spacer>
          <Spacer>
            <Button
              buttonStyle={styles.button}
              title="Add skill/service"
              onPress={() => handleAdd()}
              icon={
                <FontAwesome5
                  name="plus"
                  solid
                  size={25}
                  color="white"
                  style={{ marginHorizontal: 10 }}
                />
              }
            />
          </Spacer>
          {skillsArr.length > 0 && (
            <Spacer>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {skillsArr.map((s, index) => {
                  return (
                    <Button
                      key={index}
                      buttonStyle={styles.skillBtn}
                      title={s}
                      titleStyle={styles.btnTitle}
                      icon={
                        <FontAwesome
                          size={20}
                          color="#00ad8e"
                          name="remove"
                          style={{ marginRight: 5 }}
                        />
                      }
                      onPress={() => handleRemove(index)}
                    />
                  );
                })}
              </View>
            </Spacer>
          )}
          <Spacer>
            <Button
              buttonStyle={styles.button}
              title="Save Changes"
              onPress={() => handleSubmit()}
              icon={
                <FontAwesome5
                  name="check-circle"
                  solid
                  size={25}
                  color="white"
                  style={{ marginHorizontal: 10 }}
                />
              }
            />
          </Spacer>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
  title: {
    color: "white",
    margin: 10,
    fontSize: 25,
  },
  inputStyle: {
    color: "white",
    fontSize: 18,
  },
  labelStyle: {
    color: "white",
    fontSize: 18,
  },
  skillBtn: {
    borderColor: "#00ad8e",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "transparent",
    margin: 5,
  },
  btnTitle: {
    color: "#00ad8e",
  },
});

export default SkillsFormScreen;
