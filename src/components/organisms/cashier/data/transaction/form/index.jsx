import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import OrganismsCashierDataTransactionItem from '../item';

import './style.scss'

const OrganismsCashierDataTransactionForm = ({ goBack, products, initialFormData, handleQuantity, handleDeleteItem, handleSubmit }) => {  
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => form.resetFields(), [initialFormData, form]);
  useEffect(() => {
    let total = 0
    products.forEach((product) => {
      total += (parseInt(product.price) * product.quantity)      
    });
    console.log("total", total)
    setTotalPrice(total)
  }, [products])
  
  return (
    <div className="o-cashier-data-transaction-form">
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={initialFormData.data}
        onFinish={handleSubmit}
      >        
        <div className="o-cashier-data-transaction-form__items">
          <h1>Items</h1>
          <div className="o-cashier-data-transaction-form__items-product">
            {
              products.map((product, idx) => (
                <OrganismsCashierDataTransactionItem 
                  key={idx} 
                  data={product} 
                  handleQuantity={(quantity) => handleQuantity(quantity, product.id)} 
                  handleDeleteItem={handleDeleteItem}
                />
              ))
            }
          </div>          
        </div>
        <Form.Item
          label="Buyer Name"
          name="buyer_name"
          required={false}
          rules={[
            {
              required: true,
              message: "Please input your Buyer Name!",
            }            
          ]}
        >
          <Input />
        </Form.Item>
        <div className="o-cashier-data-transaction-form__total">
          <p>Total Harga</p>
          <h3>{ "Rp"+new Intl.NumberFormat().format(totalPrice)}</h3>
        </div>
        <Space size="middle">
          <Form.Item shouldUpdate>
            {() => (              
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
              >
                { initialFormData.title } Transaction
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

export default OrganismsCashierDataTransactionForm
