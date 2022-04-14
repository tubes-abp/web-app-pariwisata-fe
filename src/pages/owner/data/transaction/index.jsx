import React, { useEffect, useState } from 'react'
import { Space, Modal } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { 
  ExclamationCircleOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { delete_data, get_data } from '../../../../redux/actions/main';

const OwnerDataTransaction = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const keyQuery = new URLSearchParams(search).get('key');

  const [initialTransactionList, setInitialTransactionList] = useState()

  const activeMenu = {
    key: 'data-transaction',
    openKey: 'data',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this transaction?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_data(`/transactions`, id, 'transactions'));
      },
    });
  }
  const breadcrumb = [
    {
      label: 'Owner',
      url: '/owner',
    },
    {
      label: 'Data',
      url: '/owner/data/patient',
    },
    {
      label: 'Transaction',
      url: '/owner/data/transaction',
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
    history.push(`/owner/data/transaction?key=${key}`);
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
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <p 
                className="text-danger"
                onClick={() => askToDelete(record.key)}
              >
                <DeleteOutlined />
              </p>
            </Space>
          )
        },
      },
    ],
    data: initialTransactionList,
  };

  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-owner-data-product">
        <OrganismsWidgetList 
          list={listPatient}
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default OwnerDataTransaction
