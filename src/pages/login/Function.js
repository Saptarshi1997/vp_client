import { toast } from "react-toastify";

export function validateLoginData(stateData) {
    let errorCount = 0;

    const toasterWarn = (message) => {
        toast.warn(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    if (stateData.email == null || stateData.email == undefined || stateData.email.length == 0) {
        toasterWarn('Email id is required!');
        errorCount++;
    } else if (stateData.password == null || stateData.password == undefined || stateData.password.length == 0) {
        toasterWarn('Password is required!');
        errorCount++;
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }
}