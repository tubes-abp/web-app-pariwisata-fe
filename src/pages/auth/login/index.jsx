import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { auth_login } from '../../../redux/actions/main'
import CoverImg from '../../../assets/images/login_img.png'
import OrganismsAuthLogin from '../../../components/organisms/auth/login'

import './style.scss'

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();  

  const handleLogin = (values) => {
    console.log("data: ", values)
    dispatch(auth_login("owner", values, history))
  }
  
  const token = window.localStorage.getItem('token')
  const role = window.localStorage.getItem('role')

  if(token && role) {
    const { from } = location.state || { from: { pathname: `/${role}/dashboard` } };
    history.replace(from)
  }

  return (
    <div className='p-login'>
      <div className="p-login__form">
        <OrganismsAuthLogin isOwner={true} handleLogin={handleLogin} />
      </div>
      <div className='p-login__cover'>
        <img src={CoverImg} alt="" />
      </div>
    </div>
  )
}

export default Login
