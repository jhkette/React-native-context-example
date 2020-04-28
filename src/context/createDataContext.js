import React, { useReducer } from "react";
// here parameters are the reducer, actions and the initial state
export default (reducer, actions, initialState) => {
  const Context = React.createContext();
  
  // destructure children in same way you would for provider
  const Provider = ({ children }) => {
    // use state and dispatch and reducer
    const [state, dispatch] = useReducer(reducer, initialState);
   
    //action === {addblogpost: dispatch => {return () =>{} )}}
    // boundactions  is like a hash table - the key values look like code above^
    const boundActions = {};
    for (let key in actions){ //for each key in actions (passed as a parameter)

      // add function as key to boundaction, call with dispatch. Dispatch, is a function
      // from react that sends an action to a reducer
      boundActions[key] = actions[key](dispatch);;   
    }
    
    // return Context.Provider - these values are now associated with context
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider> )
  };

  return { Context, Provider };
};
