import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';

import { get_data, update_data, update_img_product } from '../../../../../redux/actions/main';
import OrganismsOwnerDataProductForm from '../../../../../components/organisms/owner/data/product/form';
import OrganismsWidgetUploadImage from '../../../../../components/organisms/widget/uploadImage';
import MoleculesGoBack from '../../../../../components/molecules/goBack';
import LayoutsCms from '../../../../../layouts/cms';

import './style.scss'

const OwnerDataProductEdit = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const activeMenu = {
    key: 'data-product',
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
  const initialUploadData= {
    url: product?.image_url
  }

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
  const handleEditPic = (img) => {
    const dataUpload = {
      img
    }
    console.log(dataUpload)
    dispatch(update_img_product(id, dataUpload, history));
  };


  return (    
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb} >
      <div className="o-owner-data-product-edit">
        <MoleculesGoBack title={`${initialFormData.title} Product`} goBack={goBack} />        
        <Tabs defaultActiveKey="1" >
          <TabPane tab="Informasi Pribadi" key="1">
            <OrganismsOwnerDataProductForm
              goBack={goBack}
              initialFormData={initialFormData}
              handleSubmit={(values) => handleEdit(values)} 
            />
          </TabPane>
          <TabPane tab="Change Photo" key="2">
            <OrganismsWidgetUploadImage
              initialUploadData={initialUploadData}
              handleSubmit={(values) => handleEditPic(values)}
            />
          </TabPane>
        </Tabs>
      </div>
    </LayoutsCms>
  )
}

export default OwnerDataProductEdit
