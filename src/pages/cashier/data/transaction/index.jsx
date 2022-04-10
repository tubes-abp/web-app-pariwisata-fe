import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Space, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined,
  DeleteOutlined  
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { delete_data, get_data } from '../../../../redux/actions/main';

const CashierDataTransaction = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  // const search = useLocation().search;
  // const name = new URLSearchParams(search).get('name');

  const [initialTransactionList, setInitialTransactionList] = useState()

  const activeMenu = {
    key: 'data-transaction',
    openKey: 'data',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this patient?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_data(`transactions`, id, 'transactions'));
      },
    });
  }
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
  
  // useEffect(() => {
  //   setInitialPatientList([
  //     {
  //       key: 1,
  //       cust_name: "Angga Wira",
  //       cashier_name: "Putri KW",
  //       product: "Tiket Wahana",
  //       quantity: 2,
  //       total_price: 50000,
  //       notes: "Beli nih",
  //     },
  //   ])
  // }, []);

  useEffect(() => {
    dispatch(get_data('/transactions', 'transactions'));    
  }, [dispatch]);

  const { transactions } = useSelector(state => state.main);
  useEffect(() => {
    let modifyData = transactions.map((dt) => ({
      ...dt,
      cashier_name: dt.cashier.name,
      product: dt.product.name,
    }))
    setInitialTransactionList(modifyData);
  }, [transactions]);

  // useEffect(() => {
  //   if(!name) {
  //     dispatch(get_data('patients', 'patient_list'));
  //   }
  // }, [dispatch, name]);

  // const patientList = useSelector(state => state.admin?.patient_list)  
  // useEffect(() => {    
  //   if(patientList.length === 0 && name) {
  //     dispatch(get_data('patients', 'patient_list'));
  //   } else {
  //     let modifyData = patientList.map((dt) => ({
  //       ...dt,
  //       birthDate: format(new Date(dt.birthDate), 'dd MMMM yyyy'),
  //       gender: dt.gender === 'L'? 'Laki-Laki': 'Perempuan',
  //     }))
  //     if(name) {
  //       setInitialPatientList(modifyData?.filter((dt) => dt.name.includes(name)));
  //     } else {
  //       setInitialPatientList(modifyData);
  //     }
  //   }
  // }, [dispatch, name, patientList]);

  const handleSearch = (key) => {
    history.push(`/admin/data/patient?name=${key}`);
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
        dataIndex: 'purchase amount',
        key: 'purchase amount',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/admin/data/patient/detail/${record.key}`}>
                <FolderOutlined />
              </Link>
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
