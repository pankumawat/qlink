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