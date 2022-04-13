import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { get_data } from '../../../../redux/actions/main';
import OrganismsWidgetCardProduct from '../../../../components/organisms/widget/card/product';

const CashierDataProduct = () => {  
  const dispatch = useDispatch();
  // const history = useHistory();
  const search = useLocation().search;
  const keyQuery = new URLSearchParams(search).get('key');

  const [initialProducts, setInitialProducts] = useState([])

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
    if(products.length === 0 && keyQuery) {
      dispatch(get_data('/products', 'products'));
    } else {
      let modifyData = products.map((dt) => ({
        ...dt,
        // price: "Rp"+new Intl.NumberFormat().format(dt['price'])
      }))
      if(keyQuery) {
        setInitialProducts(modifyData.filter(
          (dt) => dt.name.toLowerCase().includes(keyQuery.toLowerCase())
        ));
      } else {
        setInitialProducts(modifyData);
      }
    }
  }, [dispatch, products, keyQuery]);

  // const handleSearch = (key) => {
  //   history.push(`/cashier/data/product?key=${key}`);
  // }
  
  // const listPatient = {
  //   title: "List Product",
  //   columns: [
  //     {
  //       title: 'Name',
  //       dataIndex: 'name',
  //       key: 'name',
  //     },
  //     {
  //       title: 'Price',
  //       dataIndex: 'price',
  //       key: 'price',
  //     },
  //     {
  //       title: 'Type',
  //       dataIndex: 'type',
  //       key: 'type',
  //     },
  //     {
  //       title: 'Stock',
  //       dataIndex: 'stock',
  //       key: 'stock',
  //     },
  //   ],
  //   data: initialProducts,
  // };
  
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-cashier-data-product">
        <h1>List Product</h1>
        {/* <OrganismsWidgetList 
          list={listPatient}
          handleSearch={handleSearch}
        /> */}
        <div className="p-cashier-data-product__list">
          {
            initialProducts.map((product) => (
              <div className="p-cashier-data-product__list-item">
                <OrganismsWidgetCardProduct
                  data={product}
                />
              </div>
            ))
          }
        </div>
      </div>      
    </LayoutsCms>
  )
}

export default CashierDataProduct
