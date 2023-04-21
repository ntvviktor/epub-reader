import {User} from "firebase/auth";
import {createContext} from "react";

export interface UserContextModel {
    user: User | undefined | null;
}

export const UserContext = createContext<UserContextModel>({} as UserContextModel);