import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { auth_login_owner } from '../../../redux/actions/main'
import CoverImg from '../../../assets/images/login_img.png'
import OrganismsAuthRegister from '../../../components/organisms/auth/register'

import './style.scss'

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (values) => {
    console.log("data: ", values)
    dispatch(auth_login_owner("owner", values, history))
  }
  return (
    <div className='p-register'>
      <div className="p-register__form">
        <OrganismsAuthRegister handleLogin={handleLogin} />
      </div>
      <div className='p-register__cover'>
        <img src={CoverImg} alt="" />
      </div>
    </div>
  )
}

export default Register
