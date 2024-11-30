export const ValidEmail = (email) => {
    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email)

    if(!isEmailValid) return "Email Is Not Valid"
    
    return null
}

export const ValidPassword = (password) => {

    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
    if(!isPasswordValid) return "Please use both upper and lower case alphabets, number and a special character in your Password"

    return null
}

