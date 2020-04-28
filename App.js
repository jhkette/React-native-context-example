import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from "./src/screens/IndexScreen";
import React from "react";
import { Provider } from "./src/context/BlogContext";
import ShowScreen from  "./src/screens/ShowScreen";
import CreateScreen from  "./src/screens/CreateScreen";

// stackNavigator for the 3 main screens
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,

  },
  {
    initialRouteName: "Index",
    defaultNavigationOpetion: {
      title: "blogs",
    },
  }
);

const App = createAppContainer(navigator);

// wrap app with provider component
export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
