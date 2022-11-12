import React,{useContext} from "react";
import "./Header.css"
import logo from "../../assets/logo.jpeg"
import Button from '@material-ui/core/Button'
import { MyContext } from "../../screens/Controller";
const LoginButton = (props) => {
    return <Button variant="contained" color="primary" onClick={() => props.handleLogin()} >Login</Button>
}
const LogoutButton = (props) => {
    return <Button variant="contained" color="secondary" onClick={() => props.handleLogout()}>Logout</Button>
}

const Header = (props) => {
    const { isAuthenticated, handleLogout, showPopup } = useContext(MyContext)
    return <div className="header-container"> 
        <div className="header-title-container">
            <img src={logo} alt="header-logo" className="header-logo" />
            <div className="header-title">Doctor Finder</div>
        </div>
        <div className="login-btn">
            {isAuthenticated && <LogoutButton handleLogout={handleLogout} />}
            {!isAuthenticated && <LoginButton handleLogin={() => { 
                showPopup("Authentication") 
            }}/>}
        </div>
    </div>
}
export default  Header
Footer