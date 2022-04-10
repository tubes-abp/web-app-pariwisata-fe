import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import { get_data, post_transaction } from '../../../../../redux/actions/main';
import OrganismsCashierDataTransactionForm from '../../../../../components/organisms/cashier/data/transaction/form';
import OrganismsWidgetCardProduct from '../../../../../components/organisms/widget/card/product'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const CashierDataTransactionAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [transactionNew, setTransactionNew] = useState([])
  const activeMenu = {
    key: 'data-transaction',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Owner',
      url: '/owner/dashboard',
    },
    {
      label: 'Cashier',
      url: '/owner/cashiers',
    },
    {
      label: 'Add',
      url: '/owner/cashier/add',
    },
  ];

  useEffect(() => {
    dispatch(get_data('/products', 'products'));    
  }, [dispatch]);
  const { products } = useSelector(state => state.main);

  const initialFormData = {
    title: 'Create',
    data: {
      buyer_name: ''      
    }
  }
  const goBack = () => {
    history.push('/cashier/transaction');
  }  
  const addProduct = (data) => {
    console.log(data)
    setTransactionNew([
      ...transactionNew,
      {
        ...data,
        quantity: 1,
      }
    ])
  }
  const handleQuantity = (quantity, id) => {
    console.log("quan", quantity, id)
    let newData = transactionNew.map((dt) => (
      dt.id === id? {
        ...dt,
        quantity
      } : dt
    ))
    console.log("modif", newData)
    setTransactionNew(newData)
  }
  const handleCreate = (data) => {    
    console.log(data);
    console.log(transactionNew);
    const transactions = transactionNew.map((product) => (
      {
        buyer_name: data.buyer_name,
        product_id: product.id,
        quantity: product.quantity
      }
    ))
    console.log("newData", transactions)
    dispatch(post_transaction(transactions, history));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-cashier-data-transaction-add">
        <MoleculesGoBack title={`${initialFormData.title} Transaction`} goBack={goBack} />
        <Row gutter={20}>
          <Col span={12}>
            {
              products.map((product) => (
                <OrganismsWidgetCardProduct 
                  data={product} 
                  addProduct={addProduct}
                />
              ))
            }
          </Col>
          <Col span={12}>
            <OrganismsCashierDataTransactionForm
              goBack={goBack}
              products={transactionNew}
              initialFormData={initialFormData}
              handleQuantity={handleQuantity}
              handleSubmit={(values) => handleCreate(values)} 
            />
          </Col>
        </Row>
      </div>
    </LayoutsCms>
  )
}

export default CashierDataTransactionAdd
