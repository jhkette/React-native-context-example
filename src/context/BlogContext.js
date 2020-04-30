import React, { useReducer } from "react";
import createDataContext from "./createDataContext";
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload
    
    case 'edit_blogpost':
      return state.map(blogPost => {
        // if blogpost.id == action.payload.id return the action.payload else
        // just return the prior blogpost. I'm using a ternary operator to do this.
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    //spread existing state into new array, add new object
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload); // - filter - only leave elements that do
    // not match action.payload id. Returns a new array
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
  const response = await jsonServer.get('/blogposts');
  dispatch({type: 'get_blogposts', payload: response.data})
  }

}

// function that gets passed to createDataContext with
// a key value. this then returns another anonymous function
// with dispatch and an acttion type

// we need to add dispatch as a paramater then return a function that calls dispatch
// this is because we need access to dispatch in createDataContext -dispatch isn't available on this
// file. In createDataContext we useReducer to get the dispatch value. THE INNER FUNCTION IS THE ONLY
// THING THAT GETS CALLED IN OUR COMPONENTS

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', {title, content});
   
    if(callback){
    callback();
    }
  };
};


const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {title, content});
    dispatch({ type: "edit_blogpost", payload: {id, title, content}});
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

// destructure Context and Provider
// from createDataContext - the arguments are the blogReducer, the function and the initial state value
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
