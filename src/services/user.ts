import { API } from "../config/api";
import axios from ".";
import { storage } from "../storage";
import { ISignIn, ISignUp, IUser, SignInResponse } from "../types/user";

function signIn(creds: ISignIn) {
    return axios
        .post<SignInResponse>(API.SIGN_IN, creds, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (res) => {
            await storage.setToken(res.data.token);
            return res.data.user;
        });
}

function signUp(creds: ISignUp) {
    return axios
        .post<SignInResponse>(API.SIGN_UP, creds, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (res) => {
            await storage.setToken(res.data.token);
            return res.data.user;
        });
}

function signInWithToken() {
    return axios.get<IUser>(API.TOKEN).then((res) => res.data);
}

function signOut() {
    // TODO: api call to set active to false
    return storage.removeToken();
}

const userService = {
    signIn,
    signInWithToken,
    signOut,
    signUp
};

export default userService;
