import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { get_data } from '../../../../redux/actions/main';

const CashierDataProduct = () => {  
  const dispatch = useDispatch();
  const history = useHistory();
  // const search = useLocation().search;
  // const name = new URLSearchParams(search).get('name');

  const [initialProducts, setInitialProducts] = useState()

  const activeMenu = {
    key: 'data-product',
    openKey: 'data',
  };
  const breadcrumb = [
    {
      label: 'Cashier',
      url: '/cashier',
    },
    {
      label: 'Data',
      url: '/cashier/data/product',
    },
    {
      label: 'Product',
      url: '/cashier/data/product',
    },
  ];

  useEffect(() => {
    dispatch(get_data('/products', 'products'));    
  }, [dispatch]);

  const { products } = useSelector(state => state.main);
  useEffect(() => {
    // let modifyData = products.map((dt) => ({
    //   ...dt,
    // }))
    setInitialProducts(products);
  }, [products]);

  const handleSearch = (key) => {
    history.push(`/admin/data/patient?name=${key}`);
  }
  
  const listPatient = {
    title: "List Product",
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
      },
    ],
    data: initialProducts,
  };
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-cashier-data-product">
        <OrganismsWidgetList 
          list={listPatient}
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default CashierDataProduct
