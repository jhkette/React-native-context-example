import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";

const createScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  return (
    <View>
      <Text>Create</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default createScreen;
