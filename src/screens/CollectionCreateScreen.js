import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { Text, Button, Image, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import Loading from "../components/Loading";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import cloudinaryUpload from "../api/cloudinary";
import { addCollection } from "../store/actions/myPortfolio";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CollectionCreateScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pickImage = async () => {
    try {
      let permission = await ImagePicker.getCameraPermissionsAsync();
      if (permission.granted === false) {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
          Alert.alert("Error", "Permission to access camera roll is required!");
          return;
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("Error", "You need to add a photo to your collection");
      return;
    }
    setLoading(true);
    try {
      const response = await cloudinaryUpload(image);
      console.log(response);
      const data = {
        title,
        description,
        image: response.secure_url,
        imageId: response.public_id,
      };

      dispatch(addCollection(data));
    } catch (err) {
      console.log(err);
      return;
    }
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Spacer>
            <Text style={styles.title}>
              A visual representation of your projects and career
            </Text>
          </Spacer>
          <Spacer>
            <Input
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              value={title}
              onChangeText={setTitle}
              label="Title"
            />
          </Spacer>
          <Spacer>
            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={styles.description}
              value={description}
              onChangeText={setDescription}
            />
          </Spacer>
          <Spacer>
            <Text style={styles.text}>
              You can always add more photos later
            </Text>
          </Spacer>
          <Spacer>
            <Button
              buttonStyle={styles.button}
              title="Add a photo"
              onPress={() => pickImage()}
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

          <View style={styles.imageContainer}>
            {image && (
              <Image
                source={{ uri: image }}
                style={styles.image}
                containerStyle={styles.imageContainerStyle}
              />
            )}
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <Spacer>
              <Button
                buttonStyle={styles.button}
                title="Create Collection"
                onPress={handleSubmit}
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
          </View>
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
  text: {
    color: "white",
    margin: 10,
  },
  inputStyle: {
    color: "white",
    fontSize: 18,
  },
  labelStyle: {
    color: "white",
    fontSize: 18,
  },
  title: {
    color: "white",
    margin: 10,
    fontSize: 25,
  },
  imageContainerStyle: {
    borderRadius: 25,
    overflow: "hidden",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 0.9 * width,
    height: 0.3 * height,
  },
  label: {
    color: "white",
    marginBottom: 10,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    borderColor: "rgba(250,250,250,0.6)",
    borderBottomWidth: 1,
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default CollectionCreateScreen;
