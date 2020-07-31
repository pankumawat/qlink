import { toast } from 'react-toastify';

export const getSignedUserObject = function () {
    if (isLoggedIn()) {
        return {
            loggedIn: true,
            user: JSON.parse(sessionStorage.getItem("user")),
            accessToken: sessionStorage.getItem("accessToken"),
            expireAt: sessionStorage.getItem("expireAt")
        }
    }
    return {};
}

export const isLoggedIn = function () {
    const user = sessionStorage.getItem("user");
    const accessToken = sessionStorage.getItem("accessToken");
    const expireAt = sessionStorage.getItem("expireAt");
    return (user && accessToken && expireAt && (expireAt - Date.now()) > 0) ? true : false;
}

export const getLoggedInUser = function () {
    if (isLoggedIn()) {
        return JSON.parse(sessionStorage.getItem("user"));
    }
}

export const getAccessToken = function () {
    if (isLoggedIn()) {
        return sessionStorage.getItem("accessToken");
    }
}

export const setLoginParams = function (accessToken, expireAt, user) {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("expireAt", expireAt);
    sessionStorage.setItem("user", user);
}

export const unsetLoginParams = function (accessToken, expireAt, user) {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("expireAt");
    sessionStorage.removeItem("user");
}

const toastObj = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const toasty = function() {
    return {
        warn: (text) => toast.warn(text, toastObj),
        info: (text) => toast.info(text, toastObj),
        success: (text) => toast.success(text, toastObj),
        error: (text) => toast.error(text, toastObj)
    }
}

const shareFunctions = {

}

export const globalFunction = () => shareFunctions;