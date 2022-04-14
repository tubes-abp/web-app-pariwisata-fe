import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { get_data } from '../../../../redux/actions/main';

const CashierDataTransaction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const keyQuery = new URLSearchParams(search).get('key');

  const [initialTransactionList, setInitialTransactionList] = useState()

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
      url: '/cashier/data/transaction',
    },
  ];

  useEffect(() => {
    dispatch(get_data('/transactions', 'transactions'));    
  }, [dispatch]);

  const { transactions } = useSelector(state => state.main);
  useEffect(() => {
    if(transactions.length === 0 && keyQuery) {
      dispatch(get_data('/transactions', 'transactions'));
    } else {
      let modifyData = transactions.map((dt) => ({
        ...dt,
        cashier_name: dt.cashier.name,
        product: dt.product.name,
        purchase_amount: "Rp"+new Intl.NumberFormat().format(dt['purchase amount'])
      }))
      if(keyQuery) {
        setInitialTransactionList(modifyData.filter(
          (dt) => dt.buyer_name.toLowerCase().includes(keyQuery.toLowerCase())
        ));
      } else {
        setInitialTransactionList(modifyData);
      }
    }
  }, [dispatch, transactions, keyQuery]);

  const handleSearch = (key) => {
    history.push(`/cashier/data/transaction?key=${key}`);
  }
  
  const listPatient = {
    title: "List Transaction",
    columns: [
      {
        title: 'Buyer Name',
        dataIndex: 'buyer_name',
        key: 'buyer_name',
      },
      {
        title: 'Cashier Name',
        dataIndex: 'cashier_name',
        key: 'cashier_name',
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Total Price',
        dataIndex: 'purchase_amount',
        key: 'purchase_amount',
      },
    ],
    data: initialTransactionList,
  };
  const goToAddTransaction = () => {
    history.push("/cashier/data/transaction/add")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-cashier-data-transaction">
        <OrganismsWidgetList 
          list={listPatient}
          goToAddPage={() => goToAddTransaction()} 
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default CashierDataTransaction
