import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd';

import './style.scss'
import { Link } from 'react-router-dom';

const OrganismsAuthRegister = ({ handleRegister }) => {
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
        onFinish={handleRegister}
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
          name="password"
          label="Password"
          required={false}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Massukan Password"  />
        </Form.Item>
        <Form.Item
          name="confirm"
          required={false}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Ulangi Password" />
        </Form.Item>
        <Form.Item shouldUpdate className="btn-form">
          {() => (              
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
            >
              Daftar                  
            </Button>              
          )}
        </Form.Item>        
      </Form>
      <div className="o-register-form__link">
        <p>Sudah Memiliki Akun?</p>
        <Link to="/login/owner">Masuk Disini</Link>
      </div>
    </div>
  )
}

export default OrganismsAuthRegister
