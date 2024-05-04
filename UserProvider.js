import React, { createContext, useState } from "react";

const UserType = createContext();

const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    return (
        <UserType.Provider value={{ userId, setUserId }}>
            {children}
        </UserType.Provider>
    );
};

export { UserType, UserProvider };

//userType -> create and access user data
//provider -> access and mange data for futher use
