import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { post_data } from '../../../redux/actions/main'
import CoverImg from '../../../assets/images/login_img.png'
import OrganismsAuthRegister from '../../../components/organisms/auth/register'

import './style.scss'

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = (values) => {
    delete values['confirm'];
    values = {
      ...values,
      birthday: values.birthday.format('YYYY-MM-DD'),
    };
    console.log("data: ", values)
    dispatch(post_data("/owners", values, history, '/login/owner'));
  }
  return (
    <div className='p-register'>
      <div className="p-register__form">
        <OrganismsAuthRegister handleRegister={handleRegister} />
      </div>
      <div className='p-register__cover'>
        <img src={CoverImg} alt="" />
      </div>
    </div>
  )
}

export default Register
