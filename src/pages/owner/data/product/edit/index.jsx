import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import OrganismsOwnerDataProductForm from '../../../../../components/organisms/owner/data/product/form';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import { get_data, update_data } from '../../../../../redux/actions/main';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const OwnerDataProductEdit = () => {  
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
    dispatch(get_data(`/products/${id}`, 'product'));
  }, [dispatch, id]);
  const { product } = useSelector(state => state.main)

  const initialFormData = {
    title: 'Edit',
    data: {
      ...product,
    },
  };

  const goBack = () => {
    history.push('/owner/data/product');
  }  
  const handleEdit = (dataEdit) => {
    dataEdit = {
      ...dataEdit,
      price: parseInt(dataEdit.price)
    }    
    console.log(dataEdit);
    dispatch(update_data(`/products/${id}`, dataEdit, history, '/owner/data/product'));
  };

  return (    
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-owner-data-product-edit">
        <MoleculesGoBack title={`${initialFormData.title} Admin`} goBack={goBack} />        
        <OrganismsOwnerDataProductForm
          goBack={goBack}
          initialFormData={initialFormData}
          handleSubmit={(values) => handleEdit(values)} 
        />
      </div>
    </LayoutsCms>
  )
}

export default OwnerDataProductEdit
