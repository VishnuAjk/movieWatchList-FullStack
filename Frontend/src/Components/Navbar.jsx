import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import navStyles from "../styles/navbar.module.css"
import { fetchUserStatus, userSelector } from '../Redux/Reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Redux/Reducers/userSlice';

const Navbar = () => {

  const { userInfo, status } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserStatus());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(signOut())
      .then(() => {
        navigate('/user/signin');
      });
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }


  return (
    <>
    <div className={navStyles.navbar}>
      <div className={navStyles.logoContainer} onClick={()=>{ navigate('/')}}>
        <img src="https://st4.depositphotos.com/18657574/21819/v/450/depositphotos_218194638-stock-illustration-movie-vector-icon-isolated-transparent.jpg" alt="logo" />
      </div>

      {userInfo?(<>
        <div className={navStyles.linksContainer}>
        <div>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            WatchList
          </NavLink>
        </div>
        <div>
          <NavLink to="/movies/add" className={({ isActive }) => (isActive ? 'active' : '')}>
            Add Movie
          </NavLink>
        </div>
        <div>
          <button onClick={handleLogout}>Sign Out</button>
        </div> 
        </div>

      </>):(
        <div className={navStyles.linksContainer}>
        <div>
            <NavLink to="user/signin"
                    className={({ isActive }) => (isActive ? 'active' : '')}>SignIn</NavLink>
        </div>
        <div>
            <NavLink to="user/signup"
                    className={({ isActive }) => (isActive ? 'active' : '')}>SignUp</NavLink>
        </div> 
      </div>)}
      
    </div>
    <Outlet/>
    </>
  )
}

export default Navbar;
