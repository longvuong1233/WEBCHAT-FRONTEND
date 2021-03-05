import axios from "../config"

const getTokenRoomChat = async(nameRoom) => {
    try {
        const result = await axios.get("/callvideo/token", {
            params: {
                identity: nameRoom
            }
        })
        return { result: true, ...result.data }
    } catch (error) {
        return { err: false, ...error.response }
    }
}





export default {
    getTokenRoomChat

}