import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { auth_login_owner } from '../../../../redux/actions/main'
import CoverImg from '../../../../assets/images/login_img.png'
import OrganismsAuthLogin from '../../../../components/organisms/auth/login'

import './style.scss'

const LoginCashier = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (values) => {
    console.log("data: ", values)
    dispatch(auth_login_owner("cashier", values, history))
  }
  return (
    <div className='p-login-cashier'>
      <div className="p-login-cashier__form">
        <OrganismsAuthLogin handleLogin={handleLogin} />
      </div>
      <div className='p-login-cashier__cover'>
        <img src={CoverImg} alt="" />
      </div>
    </div>
  )
}

export default LoginCashier
