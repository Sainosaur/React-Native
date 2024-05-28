import { useContext } from "react"
import authStorageContext from "../contexts/authStorageContext"

const useAuthStorage = () => {
    return useContext(authStorageContext)
}

export default useAuthStorage