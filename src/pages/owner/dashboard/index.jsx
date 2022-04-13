import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { get_data } from '../../../redux/actions/main'; 
import OrganismsOwnerDashboardHighlight from '../../../components/organisms/owner/dashboard/highlight'
import OrganismsOwnerDashboardCardGroup from '../../../components/organisms/owner/dashboard/cardGroup'
import LayoutsCms from '../../../layouts/cms'

import './style.scss'

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [highlightData, setHighlightData] = useState([])
  const breadcrumb = [
    {
      label: 'Owner',
      url: '/owner',
    },
    {
      label: 'Dashboard',
      url: '/owner/data/owner',
    },    
  ];
  const activeMenu = {
    key: 'dashboard',
    openKey: '',
  };  
  const card_data = [
    {
      title: "Product Data",
      desc: "See list of product in this UMKM",
      url: '/owner/data/product',
      img_url: '',
    },
    {
      title: "Transaction Data",
      desc: "See list of transaction in this UMKM",
      url: '/owner/data/transaction',
      img_url: '',
    },
    {
      title: "Manage Cashier",
      desc: "See list cashier to create or edit or delete data",
      url: '/owner/cashiers',
      img_url: '',
    },
  ];
  
  useEffect(() => {    
    dispatch(get_data("/products", "products"));
    dispatch(get_data('/transactions', 'transactions'));
    // eslint-disable-next-line
  }, [])
  const { products, transactions } = useSelector(state => state.main)  
  
  useEffect(() => {
    const sum = transactions.map(data => data['purchase amount']).reduce((a, b) => a + b, 0);
    const currency = new Intl.NumberFormat().format(sum);

    setHighlightData([
      {
        title: "Total Product",
        total: products.length,
      },
      {
        title: "Total Transaction",
        total: transactions.length,
      },
      {
        title: "Total Income",
        total: "Rp"+currency,
      },
    ]);
  }, [products, transactions]);

  const goToUrl = (url) => {
    history.push(url);
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className='p-owner-dashboard'>        
        <OrganismsOwnerDashboardHighlight initialHighlightData={highlightData} />
        <OrganismsOwnerDashboardCardGroup 
          initialCardData={card_data} 
          goToUrl={goToUrl}
        />
      </div>
    </LayoutsCms>
  )
}

export default OwnerDashboard
