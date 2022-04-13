import React from 'react'
import DashboardImg from '../../../../../assets/images/dashboard-img.png'
import DashboardImg1 from '../../../../../assets/images/product-preview.jpg'
import DashboardImg2 from '../../../../../assets/images/cashier-preview.jpg'

import './style.scss'

const OrganismsOwnerDashboardCardGroup = ({ initialCardData, goToUrl }) => {  
  const imgData = [DashboardImg, DashboardImg1, DashboardImg2]
  return (
    <div className="o-owner-dashboard-card-group">
      {
        initialCardData?.map((data, key) => (
          <div className="o-owner-dashboard-card-group__card" key={key} onClick={() => goToUrl(data.url)}>
            <div className="o-owner-dashboard-card-group__card-thumbnail">
              <img src={imgData[key]} alt="" />
            </div>
            <div className="o-owner-dashboard-card-group__card-title">
              <h3>{ data.title }</h3>
              <p>{ data.desc }</p>
            </div>            
          </div>
        ))
      }
    </div>
  )
}

export default OrganismsOwnerDashboardCardGroup
