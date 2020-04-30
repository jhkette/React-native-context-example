## React native. Advanced example of useContext

This project uses a file called createDataContext to add some functionality
that makes it a bit more like redux. The createDataContext functions returns
a  <Context.Provider> with a set of values that are passing in the in the BlogContext,js
file or what could be a userContext.js file. These values (below ) are passed into the createDataContext
function. 

``` js
// destructure Context and Provider
// from createDataContext - the arguments are the blogReducer, the function and the initial state value
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
```

It's just a demo CRUD blog app. 