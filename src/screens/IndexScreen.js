import React, { useContext,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  // import state, addBlogPost from useContext
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
  
  //Never call getBlogPosts()  -an api call -by itself as it would get called everytime component renders in
  // an infinite loop. We have to use useEffect

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () =>{
      getBlogPosts(); // the reason why we are adding a listener here rather than changing
      // value from array added as parameter. This is because we are fetching data from an
      // api not from the local state. If it was local state we could add value in array passed
      // as param at the end. 
    })


    // only invoked from useEffect if screen totally unmounted. Prevents memory leak.
    return () => {
      listener.remove(); 
    }
  }, [])

  return (
    <View>
     
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={35} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
