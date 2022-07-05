import React, { PropsWithChildren } from "react";
import { IUser, ROLE } from "../types/user";

export const DEFAULT_STATE: IUser = {
    about: "",
    avatar: "",
    email: "",
    firstName: "",
    id: 0,
    isActive: false,
    lastName: "",
    roles: {
        Name: ROLE.BASIC
    },
    username: ""
};

const UserContext = React.createContext<[IUser, React.Dispatch<React.SetStateAction<IUser>>]>([
    DEFAULT_STATE,
    () => undefined
]);

export const useUser = () => React.useContext(UserContext);

const UserProvider: React.FC<PropsWithChildren<object>> = (props) => {
    const [user, setUser] = React.useState(DEFAULT_STATE);

    return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
