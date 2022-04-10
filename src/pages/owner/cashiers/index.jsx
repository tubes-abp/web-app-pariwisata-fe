import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Space, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
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
  // const search = useLocation().search;
  // const name = new URLSearchParams(search).get('name');

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
  
  // useEffect(() => {
  //   setInitialPatientList([
  //     {
  //       key: 1,
  //       name: "Syafiq",
  //       email: "fiq@gmail.com",
  //       birthday: "2001-01-10",
  //       phone: "081231312313",        
  //     },      
  //     {
  //       key: 2,
  //       name: "Syafiq",
  //       email: "fiq@gmail.com",
  //       birthday: "2001-01-10",
  //       phone: "081231312313",        
  //     },      
  //     {
  //       key: 3,
  //       name: "Syafiq",
  //       email: "fiq@gmail.com",
  //       birthday: "2001-01-10",
  //       phone: "081231312313",        
  //     },      
  //   ])
  // }, []);

  useEffect(() => {
    dispatch(get_data('/cashiers', 'cashiers'));    
  }, [dispatch]);

  const { cashiers } = useSelector(state => state.main);
  useEffect(() => {
    let modifyData = cashiers.map((dt) => ({
      ...dt,
      birthday: format(new Date(dt.birthday), 'dd MMMM yyyy'),
    }))
    setInitialCashiers(modifyData);
  }, [cashiers]);
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
