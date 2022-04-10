import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { post_data } from '../../../../redux/actions/main';
import OrganismsOwnerCashierForm from '../../../../components/organisms/owner/cashier/form';
import MoleculesGoBack from '../../../../components/molecules/goBack';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'

const OwnerCashierAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      label: 'Add',
      url: '/owner/cashier/add',
    },
  ];
  const initialFormData = {
    title: 'Create',
    data: {
      name: '',
      phone_number: '',      
      birthday: moment(),
      email: '',
      password: '',
    }
  }
  const goBack = () => {
    history.push('/owner/cashiers');
  }  
  const handleCreate = (data) => {
    data = {
      ...data,
      birthday: data.birthday.format('YYYY-MM-DD'),
    };
    console.log(data);
    dispatch(post_data("/cashiers", data, history, '/owner/cashiers'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-owner-cashier-add">
        <MoleculesGoBack title={`${initialFormData.title} Cashier`} goBack={goBack} />
        <OrganismsOwnerCashierForm
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default OwnerCashierAdd
