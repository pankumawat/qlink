const alertStyle = {
    width: "20%",
    height: "30%",
    "min-width": "35vh",
    "min-height": "5vh",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center",
    "color": "black",
    "margin": "20px"
}
const successAlert = {
    ...alertStyle,
    "background-color": "#90EE90",
}
const failureAlert = {
    ...alertStyle,
    "background-color": "#FFCCCC",
}

const showSnackbar = (isSuccess, message, timeout) => {
    const snackbar = document.getElementById("snackbar")
    snackbar.style["background-color"] = isSuccess ? "#90EE90" : "#FFCCCC";
    snackbar.innerHTML = message;
    snackbar.className = "show";
    setTimeout(() => {
        snackbar.className = "";
    }, timeout ? timeout : 2000);
}
const showError = (error, timeout) => {
    showSnackbar(false, error, timeout)
}

const showSuccess = (message, timeout) => {
    showSnackbar(true, message, timeout)
}

const silentUrlChangeTo = (url) => {
    window.history.pushState({}, null, url);
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})