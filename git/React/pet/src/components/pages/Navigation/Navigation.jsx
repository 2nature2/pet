import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';

const Navigation = () => {
    return(
        <div className='nav'>
            <NavLink className='navmenu' to="/">MAIN</NavLink>
            <NavLink className='navmenu' to="/pet">PET</NavLink>
            <NavLink className='navmenu' to="/community">COMMUNITY</NavLink>
            <NavLink className='navmenu' to="/join">SIGN-UP</NavLink>
            <NavLink className='navmenu' to="/login">SIGN-IN</NavLink>
        </div>
    );
};

export default Navigation;