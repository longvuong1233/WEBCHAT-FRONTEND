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

const logout = async() => {
    try {
        const result = await axios.post("/start/logout")

        return {...result }
    } catch (error) {
        return { result: false, ...error.response }
    }

}

const verifyEmail = async() => {
    try {
        const result = await axios.post("/start/verifyemail")
        console.log(result, "a")
        return {...result }
    } catch (error) {
        return { result: false, ...error.response }
    }
}

export default { signin, signup, logout, verifyEmail }