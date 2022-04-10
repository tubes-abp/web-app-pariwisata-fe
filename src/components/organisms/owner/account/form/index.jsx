import React, { useEffect } from 'react'
import { Form, Input, DatePicker, Button, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsOwnerAccountForm = ({ initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  useEffect(() => form.resetFields(), [initialFormData, form]);  
  
  return (
    <div className="o-owner-account-form">
      <div className="o-owner-account-form__center">
        <Form 
          form={form} 
          layout="vertical" 
          initialValues={initialFormData.data}
          onFinish={handleSubmit}
        >          
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
          <Space size="middle">
            <Form.Item shouldUpdate>
              {() => (              
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  { initialFormData.title }
                </Button>
              )}
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  )
}

export default OrganismsOwnerAccountForm
