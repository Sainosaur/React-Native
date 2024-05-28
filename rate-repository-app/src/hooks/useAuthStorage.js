import { useContext } from "react"
import authStorageContext from "../utils/authStorageContext"

const useAuthStorage = () => {
    return useContext(authStorageContext)
}

export default useAuthStorage