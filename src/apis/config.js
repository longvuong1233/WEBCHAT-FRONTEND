const axios = require("axios")

const instance = axios.create({
    baseURL: 'https://localhost:3000'

});

export default instance