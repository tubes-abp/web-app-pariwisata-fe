import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import './style.scss'

const OrganismsAuthLogin = ({ isOwner, handleLogin }) => {
  const [form] = Form.useForm();

  return (
    <div className="o-login-form">
      <div className="o-login-form__title">
        <h1>Login { isOwner? 'Owner':'Cashier' }</h1>
        <h3>Managemen dan Monitoring Pariwisata dengan mudah dan cepat.</h3>
        <p>Silakan masukkan username dan password yang sudah terdaftar untuk menikmati layanan.</p>
      </div>
      <Form 
        form={form} 
        layout="vertical"         
        onFinish={handleLogin}
      >        
        <Form.Item
          name="email"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: 'email',
              message: "Email is not valid!",
            },
          ]}
        >
          <Input size="large" placeholder='Alamat Email' />
        </Form.Item>
        <Form.Item
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" placeholder='Password' />
        </Form.Item>                 
        <Form.Item shouldUpdate className="btn-form">
          {() => (              
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
            >
              Masuk                  
            </Button>              
          )}
        </Form.Item>        
      </Form>
      <div className="o-login-form__link">
        {
          isOwner &&
          <div>
            <p>Belum Memiliki Akun?</p>
            <Link to="/">Daftar Disini</Link>
          </div>
        }
        <Link to={`/login/${isOwner?'cashier':'owner'}`}>Login As {isOwner? 'Cashier': 'Owner'}</Link>
      </div>
    </div>
  )
}

export default OrganismsAuthLogin
