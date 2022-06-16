import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { post_data } from '../../../../../redux/actions/main';
import OrganismsOwnerDataProductForm from '../../../../../components/organisms/owner/data/product/form';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const OwnerDataProductAdd = () => {
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
      price: '',            
      type: '',            
      stock: ''
    }
  }
  const goBack = () => {
    history.push('/owner/cashiers');
  }  
  const handleCreate = (data) => {
    data = {
      ...data,           
      price: parseInt(data.price)
    };    
    dispatch(post_data("/products", data, history, '/owner/data/product'));
  }  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-owner-data-product-add">
        <MoleculesGoBack title={`${initialFormData.title} Product`} goBack={goBack} />
        <OrganismsOwnerDataProductForm
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleCreate(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default OwnerDataProductAdd
