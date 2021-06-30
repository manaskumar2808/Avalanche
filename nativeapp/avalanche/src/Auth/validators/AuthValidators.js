export const userNameValidator = (value) => {
    if(value.trim().length < 2) {
        return "Username must be atleast 2 characters long";
    } 
    return null;
}

export const emailValidator = (value) => {
    if(value.indexOf('@') === -1) {
        return "Email address is not valid!";
    }
    return null;
}

export const passwordValidator = (value) => {
    if(value.trim().length < 8) {
        return "Password must be atleast 8 characters";
    }
    return null;
}

export const passwordConfirmValidator = (value, passwordValue) => {
    if(value !== passwordValue) {
        return "Password did't match!";
    }
    return null;
}

export const firstNameValidator = (value) => {
    return null;
}

export const lastNameValidator = (value) => {
    return null;
}

export const phoneNoValidator = (value) => {
    if(value.trim().length > 0  && value.trim().length < 10) {
        return "Please enter a valid phone No.";
    }
    return null;
}

export const ageValidator = (value) => {
    value = parseInt(value);
    if(value < 1 || value > 120) {
        return "Your age is not valid!";
    }
    return null;
}

export const profileImageValidator = (value) => {
    return null;
}

export const themeImageValidator = (value) => {
    return null;
}

export const bioValidator = (value) => {
    return null;
}