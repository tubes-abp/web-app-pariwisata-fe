import React from 'react'
import forbiddenImg from '../../assets/images/forbidden.png'
import { Link } from "react-router-dom";
import './style.scss'

const Forbidden = ({ url }) => {
  return (
    <div className="p-not-found">
      <img src={forbiddenImg} alt="" />
      <h1>Oops! You are not Authorized!</h1>
      <Link to={`/${url}/dashboard`} >
        <div className="btn">
          Return To Home
        </div>
      </Link>
    </div>
  )
}

export default Forbidden