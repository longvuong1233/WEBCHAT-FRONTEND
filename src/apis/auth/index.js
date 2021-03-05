import axios from "../config"

const signin = async(user) => {
    const { email, password } = user
    try {
        let fetch = await axios.post("/start/signin", {
            "email": email,
            "password": password
        })
        return { result: true, ...fetch.data }
    } catch (error) {
        return { result: false, ...error.response }
    }
}

const signup = async(credential) => {
    const { email, password, displayName } = credential
    try {
        let fetch = await axios.post("/start/signup", {
            "email": email,
            "password": password,
            "displayName": displayName
        })
        return { result: true, ...fetch.data }
    } catch (error) {
        return { result: false, ...error.response }
    }
}

const checkAuth = async(token) => {
    try {
        let fetch = await axios.post("/start/checkauth", {}, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        })

        return { result: true, ...fetch.data }
    } catch (error) {
        return { result: false, ...error.response }
    }
}
const logout = async() => {
    try {
        const result = await axios.post("/start/logout")

        return {...result }
    } catch (error) {
        return { result: false, ...error.response }
    }

}

const verifyEmail = async(token) => {
    try {

        const result = await axios.post("/start/verifyemail", {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        return {...result }
    } catch (error) {
        return { result: false, ...error.response }
    }
}

const forgotpassword = async(email) => {
    try {
        const result = await axios.post("/start/forgotpassword", { email })
        return {...result }
    } catch (err) {
        return { result: false, ...err.response }
    }
}

const resetpassword = async(token) => {
    try {
        const result = await axios.post("/start/resetpassword", { token })
        return {...result }
    } catch (err) {
        return { result: false, ...err.response }
    }
}

const changePassword = async(email, newPassword) => {
    try {
        const result = await axios.post("/start/changePassword", { email, newPassword })
        return {...result }
    } catch (err) {
        return { result: false, ...err.response }
    }
}

const getAllUsers = async(token) => {
    try {

        const result = await axios.get("/start/allusers", {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return {...result }
    } catch (err) {
        return { result: false, ...err.response }
    }
}

const setAvatar = async(token, url) => {
    try {
        const result = await axios.post("/start/setavatar", { url }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return {...result }
    } catch (err) {
        console.log(err)
    }
}


export default { signin, signup, logout, verifyEmail, forgotpassword, resetpassword, changePassword, getAllUsers, checkAuth, setAvatar }