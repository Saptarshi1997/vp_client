import { toast } from "react-toastify";

export function validateRegisterData(stateData) {
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

    if (stateData.fullName == null || stateData.fullName == undefined || stateData.fullName.length == 0) {
        toasterWarn('Full name is required!');
        errorCount++;
    } else if (stateData.userName == null || stateData.userName == undefined || stateData.userName.length == 0) {
        toasterWarn('User name is required!');
        errorCount++;
    } else if (stateData.email == null || stateData.email == undefined || stateData.email.length == 0) {
        toasterWarn('Email id is required!');
        errorCount++;
    } else if (stateData.password == null || stateData.password == undefined || stateData.password.length == 0) {
        toasterWarn('Password is required!');
        errorCount++;
    } else if (stateData.password.length < 5) {
        toasterWarn('Password should have minimum 5 characters!');
        errorCount++;
    } else if (stateData.confPassword == null || stateData.confPassword == undefined || stateData.confPassword.length == 0) {
        toasterWarn('Confirm password is required!');
        errorCount++;
    } else if (stateData.password != stateData.confPassword) {
        toasterWarn('Password and Confirm password should be same!');
        errorCount++;
    }

    if (errorCount == 0) {
        return true;
    } else {
        return false;
    }
}