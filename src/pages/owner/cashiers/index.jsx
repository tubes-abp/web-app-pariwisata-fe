import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Space, Modal } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  ExclamationCircleOutlined,
  EditOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../components/organisms/widget/list';
import LayoutsCms from '../../../layouts/cms';

import './style.scss'
import { delete_data, get_data } from '../../../redux/actions/main';

const OwnerCashiers = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const keyQuery = new URLSearchParams(search).get('key');

  const [initialCashiers, setInitialCashiers] = useState()

  const activeMenu = {
    key: 'cashiers',
    openKey: '',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this cashier?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_data(`/cashiers`, id, 'cashiers'));
      },
    });
  }
  const breadcrumb = [
    {
      label: 'Owner',
      url: '/owner/dashboard',
    },
    {
      label: 'Cashiers',
      url: '/owner/data/cashiers',
    },
  ];

  useEffect(() => {
    dispatch(get_data('/cashiers', 'cashiers'));    
  }, [dispatch]);

  const { cashiers } = useSelector(state => state.main);
  useEffect(() => {    
    if(cashiers.length === 0 && keyQuery) {
      dispatch(get_data('/cashiers', 'cashiers'));
    } else {
      let modifyData = cashiers.map((dt) => ({
        ...dt,
        birthday: format(new Date(dt.birthday), 'dd MMMM yyyy'),
      }))
      if(keyQuery) {
        setInitialCashiers(modifyData.filter(
          (dt) => dt.name.toLowerCase().includes(keyQuery.toLowerCase())
        ));
      } else {
        setInitialCashiers(modifyData);
      }
    }
  }, [dispatch, cashiers, keyQuery]);

  const handleSearch = (key) => {
    history.push(`/owner/cashiers?key=${key}`);
  }
  
  const listCashier = {
    title: "List Cashier",
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Birth Date',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/owner/cashier/edit/${record.key}`}>
                <EditOutlined />
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
    data: initialCashiers,
  };
  const goToAddCashier = () => {
    history.push("/owner/cashier/add")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-owner-cashiers">
        <OrganismsWidgetList 
          list={listCashier}
          goToAddPage={() => goToAddCashier()} 
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default OwnerCashiers
