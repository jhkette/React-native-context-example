import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import {EvilIcons} from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  // get state from useContext
  const { state } = useContext(Context);
  // use find to get the blogPost that matches the id from the navigation.getParam
  const blogPost = state.find((blog) => blog.id == id);

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    
});


ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Edit", {id: navigation.getParam("id") })}>
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};


export default ShowScreen;
