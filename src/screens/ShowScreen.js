import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  // get state from useContext
  const { state } = useContext(Context);
  // use find to get the blogPost that matches the id from the navigation.getParam
  const blogPost = state.find((blog) => blog.id == id);

  return (
    <View>
      <Text>{blogPost.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
