import React, { useReducer } from "react";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 999),
          title: `Blog post ${state.length + 1}`,
        },
      ];
    //spread existing state into new array, add new object
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload); // - filter - only leave elements that do
    // not match action.payload id. Returns a new array
    default:
      return state;
  }
};

// function that gets passed to createDataContext with
// a key value. this then returns another anonymous function
// with dispatch and an acttion type

// we need to add dispatch as a paramater then return a function that calls dispatch
// this is because we need access to dispatch in createDataContext -dispatch isn't available on this
// file. In createDataContext we useReducer to get the dispatch value. THE INNER FUNCTION IS THE ONLY
// THING THAT GETS CALLED IN OUR COMPONENTS

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: "add_blogpost" });
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

// destructure Context and Provider
// from createDataContext - the arguments are the blogReducer, the function and the initial state value
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  []
);
