import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
// import { format } from 'date-fns';

import OrganismsOwnerDashboardHighlight from '../../../components/organisms/owner/dashboard/highlight'
import OrganismsOwnerDashboardCardGroup from '../../../components/organisms/owner/dashboard/cardGroup'
import LayoutsCms from '../../../layouts/cms'
// import { get_data } from '../../../redux/actions/admin'
import './style.scss'

const OwnerDashboard = () => {
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
      url: '/owner/cashier',
      img_url: '',
    },
  ];
  
  // const dispatch = useDispatch()  
  // useEffect(() => {    
  //   dispatch(get_data("patients", "patient_list"))
  //   dispatch(get_data("doctors", "doctor_list"))
  //   dispatch(get_data("outpatients", "outpatient_list"))
  //   dispatch(get_data("nurses", "nurses_list"))
  //   dispatch(get_data("work-schedules", "schedule_list"))
  //   // eslint-disable-next-line
  // }, [])  
  // const { patient_list, doctor_list, outpatient_list, nurses_list, schedule_list } = useSelector(state => state.admin)  
  
  useEffect(() => {
    // let today = schedule_list.filter(dt => dt.date === format(new Date(Date.now()), 'yyyy-MM-dd'))
    // let outpatientToday = outpatient_list.filter(dt => dt.date === format(new Date(Date.now()), 'yyyy-MM-dd'))
    // let availDoctor = today.map(dt => dt.doctor.name).filter((value, index, self) => self.indexOf(value) === index);
    // let availNurse = today.map(dt => dt.nurse.name).filter((value, index, self) => self.indexOf(value) === index);
    
    setHighlightData([
      {
        title: "Total Product",
        total: 300,
      },
      {
        title: "Total Transaction",
        total: 300,
        available: 10,
      },
      {
        title: "Total Categories",
        total: 200,
      },
    ]);
  }, []);

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
