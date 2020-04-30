import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const createScreen = ({ navigation }) => {
  const { state, addBlogPost } = useContext(Context);

  return (
    /* pass onSubmit function down. The title, content
      are passed as parameters then added to editBlogPost */
    <BlogPostForm
      onSubmit={(title, content) => {
        addBlogPost(title, content, () => navigation.navigate("Index"));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default createScreen;
