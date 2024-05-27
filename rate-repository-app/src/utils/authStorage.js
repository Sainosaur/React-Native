import Asyncstorage from "@react-native-async-storage/async-storage"

class AuthStorage {
    constructor(namespace = "auth") {
        this.namespace = namespace
    } 

    async getAccessToken() {
        const token = await Asyncstorage.getItem(`${this.namespace}:token`)

        return JSON.parse(token)
    }

    async setAccessToken(accessToken) {
        const token = JSON.stringify(accessToken)
        return await Asyncstorage.setItem(`${this.namespace}:token`, token)
    }

    async removeAccessToken() {
        return await Asyncstorage.removeItem(`${this.namespace}:token`)
    }
}

export default AuthStorage