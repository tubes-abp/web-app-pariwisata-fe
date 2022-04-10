import React, { useEffect } from 'react'
import moment from 'moment';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MoleculesGoBack from '../../../../components/molecules/goBack';
import OrganismsWidgetFormChangePassword from '../../../../components/organisms/widget/form/changePassword';
import { get_data, update_data } from '../../../../redux/actions/main';
import OrganismsOwnerCashierForm from '../../../../components/organisms/owner/cashier/form';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'

const OwnerCashierEdit = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const activeMenu = {
    key: 'data-cashier',
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
      label: 'Edit',
      url: '/owner/cashier/edit',
    },
  ];

  useEffect(() => {
    dispatch(get_data(`/cashiers/${id}`, 'cashier'));
  }, [dispatch, id]);
  const { cashier } = useSelector(state => state.main)

  const initialFormData = {
    title: 'Edit',
    data: {
      ...cashier,
      birthday: moment(cashier.birthday, 'YYYY-MM-DD')
    },
  };

  const goBack = () => {
    history.push('/owner/cashiers');
  }  
  const handleEdit = (dataEdit) => {
    delete dataEdit['email']    
    dataEdit = {
      ...dataEdit,
      password: "1234",
      birthday: dataEdit.birthday.format('YYYY-MM-DD'),
    }    
    console.log(dataEdit);
    dispatch(update_data(`/cashiers/${id}`, dataEdit, history, '/owner/cashiers'));
  };
  const handleEditPassword = (dataEdit) => {    
    dataEdit = {
      ...dataEdit,
      id: parseInt(id),
    }    
    dispatch(update_data(`admins/password`, dataEdit, history, '/admin/data/admin'));
  };

  return (    
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-owner-cashier-edit">
        <MoleculesGoBack title={`${initialFormData.title} Admin`} goBack={goBack} />        
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsOwnerCashierForm 
              goBack={goBack}
              initialFormData={initialFormData}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <OrganismsWidgetFormChangePassword
              goBack={goBack}
              initialFormData={initialFormData.data}
              handleSubmit={(values) => handleEditPassword(values)} 
            />
          </TabPane>
        </Tabs>  
      </div>
    </LayoutsCms>
  )
}

export default OwnerCashierEdit
