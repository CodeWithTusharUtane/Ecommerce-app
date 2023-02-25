import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/slice/authSlice"

const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(isLoggedIn){
        return children
    }else{
        return null
    }
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if (!isLoggedIn) {
        return children
    }else{
        return null
    }
}

export default ShowOnLogin