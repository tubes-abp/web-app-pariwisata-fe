import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd';

import './style.scss'

const OrganismsAuthRegister = ({ handleLogin }) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";

  return (
    <div className="o-register-form">
      <div className="o-register-form__title">
        <h1>Daftar Owner</h1>
        <h3>Managemen dan Monitoring Pariwisata dengan mudah dan cepat.</h3>
        <p>Silahkan mendaftar untuk menikmati layanan yang diberikan untuk anda.</p>
      </div>
      <Form 
        form={form} 
        layout="vertical"         
        onFinish={handleLogin}
      >
        <Form.Item
          label="Informasi Pribadi"
          name="name"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input size="large" placeholder='Nama Lengkap' />
        </Form.Item>
        <Form.Item
          name="birthday"
        >
          <DatePicker size="large" placeholder="Birthday" format={dateFormat} />
        </Form.Item>
        <Form.Item
          name="phone_number"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input size="large" placeholder='Phone Number' />
        </Form.Item>
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
          label="Password "
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" placeholder='Buat Password' />
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
          <Input.Password size="large" placeholder='Ulangi Password' />
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
    </div>
  )
}

export default OrganismsAuthRegister
