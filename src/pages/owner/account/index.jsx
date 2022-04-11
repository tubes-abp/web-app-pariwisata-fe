import React, { useEffect } from 'react'
import moment from 'moment';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import OrganismsWidgetFormChangePassword from '../../../components/organisms/widget/form/changePassword';
import { change_password, get_data, update_data } from '../../../redux/actions/main';
import OrganismsOwnerAccountForm from '../../../components/organisms/owner/account/form';
import LayoutsCms from '../../../layouts/cms';

import './style.scss'

const OwnerAccount = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const activeMenu = {
    key: 'account',
    openKey: '',
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
    dispatch(get_data(`/owners/current`, 'owner'));
  }, [dispatch, id]);
  const { owner } = useSelector(state => state.main)

  const initialFormData = {
    title: 'Update',
    data: {
      ...owner,
      birthday: moment(owner.birthday, 'YYYY-MM-DD')
    },
  };

  const goBack = () => {
    history.push('/owner/cashiers');
  }  
  const handleEdit = (dataEdit) => {
    dataEdit = {
      ...dataEdit,
      birthday: dataEdit.birthday.format('YYYY-MM-DD'),
    }    
    console.log(dataEdit);
    dispatch(update_data(`/owners`, dataEdit, history, '/owner/account'));
    dispatch(get_data(`/owners/current`, 'owner'));
  };
  const handleEditPassword = (dataEdit) => {    
    dataEdit = {
      ...dataEdit,
    }    
    console.log(dataEdit);
    dispatch(change_password(`/owners/change-password`, dataEdit, history, "/login/owner"));
  };

  return (    
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-owner-account">
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsOwnerAccountForm
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

export default OwnerAccount
