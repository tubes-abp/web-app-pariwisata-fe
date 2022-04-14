import React from 'react'
import { Form, Input, Button, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsWidgetFormChangePassword = ({ initialFormData, handleSubmit }) => {  
  const [form] = Form.useForm();
  return (
    <div className="o-widget-form-change-password">      
      <div className="o-widget-form-change-password__center">
        <Form 
          form={form} 
          layout="vertical" 
          initialValues={initialFormData.data}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Old Password"
            name="old_password"
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
          <Form.Item
            label="New Password"
            name="new_password"
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
          <Space size="middle">
            <Form.Item shouldUpdate>
              {() => (              
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Change Password
                </Button>
              )}
            </Form.Item>
          </Space>
        </Form>      
      </div>
    </div>
  )
}

export default OrganismsWidgetFormChangePassword
