// UserContext.js
import React from 'react';

//  Creates a Context object
/*
	A context object as the name states is a data type of an objext thae can be used to store information that can be shared to other components wihtin the app
	The context object is a differenct approach to passing information between components and allows easier acces by avoidig the use of prop-drilling
*/
const UserContext = React.createContext();

// The 'Provider' component allows other components to consume/use the context object and supply the necessary information needed to use the context object
export const UserProvider = UserContext.Provider;

export default UserContext;
