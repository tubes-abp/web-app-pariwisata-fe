import React, { useEffect } from 'react'
import { Form, Input, DatePicker, Button, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsOwnerCashierForm = ({ goBack, initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  useEffect(() => form.resetFields(), [initialFormData, form]);  
  
  return (
    <div className="o-owner-cashier-form">      
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialFormData.data}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Fullname"
              name="name"              
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please input your Fullname!",
                }            
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone_number"
              required={false}
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                }            
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Birth Date"
              name="birthday"
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={12}>
            {
              initialFormData.data.email === '' && 
              <>
                <Form.Item
                  label="Email"
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
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            }
          </Col>
        </Row>  
        <Space size="middle">
          <Form.Item shouldUpdate>
            {() => (              
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
              >
                { initialFormData.title } Cashier
              </Button>
            )}
          </Form.Item>
          <Form.Item >
            <Button type="text" className="text-danger" onClick={goBack}>
              <span className="text-danger">Cancel</span>
            </Button>
          </Form.Item>
        </Space>
      </Form>      
    </div>
  )
}

export default OrganismsOwnerCashierForm
