import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input } from 'antd';

import { get_data, post_transaction } from '../../../../../redux/actions/main';
import OrganismsCashierDataTransactionForm from '../../../../../components/organisms/cashier/data/transaction/form';
import OrganismsWidgetCardProduct from '../../../../../components/organisms/widget/card/product'
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const CashierDataTransactionAdd = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const productQuery = new URLSearchParams(search).get('product');
  const [productList, setProductList] = useState([]);
  const [transactionNew, setTransactionNew] = useState([]);

  const activeMenu = {
    key: 'data-transaction',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Cashier',
      url: '/cashier/dashboard',
    },
    {
      label: 'Data',
      url: '/cashier/data/transaction',
    },
    {
      label: 'Transaction',
      url: '/cashier/data/transaction/add',
    },
    {
      label: 'Add',
      url: '/cashier/data/transaction/add',
    },
  ];

  useEffect(() => {
    dispatch(get_data('/products', 'products'));    
  }, [dispatch]);
  const { products } = useSelector(state => state.main);
  useEffect(() => {    
    if(products.length === 0 && productQuery) {
      dispatch(get_data('/products', 'products'));
    } else {
      if(productQuery) {
        setProductList(products.filter(
          (dt) => dt.name.toLowerCase().includes(productQuery.toLowerCase())
        ));
      } else {
        setProductList(products);
      }
    }
  }, [dispatch, products, productQuery]);

  const initialFormData = {
    title: 'Create',
    data: {
      buyer_name: ''      
    }
  }
  const goBack = () => {
    history.push('/cashier/data/transaction');
  }  
  const addProduct = (data) => {
    setTransactionNew([
      ...transactionNew,
      {
        ...data,
        quantity: 1,
      }
    ])
  }
  const handleQuantity = (quantity, id) => {
    let newData = transactionNew.map((dt) => (
      dt.id === id && dt.stock >= quantity && quantity > 0 ? {
        ...dt,
        quantity
      } : dt
    ))    
    setTransactionNew(newData)
  }
  const handleDeleteItem = (id) => {    
    let newData = transactionNew.filter((data) => data.id !== id);
    setTransactionNew(newData);
  }
  const handleSearch = (key) => {
    history.push(`/cashier/data/transaction/add?product=${key}`);
  }

  const handleCreate = (data) => {
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
          <Col span={12} className="o-cashier-data-transaction-add__products">
            <div className="o-cashier-data-transaction-add__products-search">
              <h3>Products</h3>
              <Search placeholder="input search text" defaultValue={productQuery} onSearch={handleSearch}/>
            </div>
            <div className="o-cashier-data-transaction-add__products-list">
              {
                productList.map((product) => ( 
                  product.stock > 0 &&
                  <OrganismsWidgetCardProduct 
                    data={product} 
                    addProduct={addProduct}
                  />
                ))
              }
            </div>
          </Col>
          <Col span={12}>
            <OrganismsCashierDataTransactionForm
              goBack={goBack}
              products={transactionNew}
              initialFormData={initialFormData}
              handleQuantity={handleQuantity}
              handleDeleteItem={handleDeleteItem}
              handleSubmit={(values) => handleCreate(values)} 
            />
          </Col>
        </Row>
      </div>
    </LayoutsCms>
  )
}

export default CashierDataTransactionAdd
