import React from 'react'

import './style.scss'

const OrganismsOwnerDashboardHighlight = ({ initialHighlightData }) => {  
  return (
    <div className="o-owner-dashboard-highlight">
      {
        initialHighlightData?.map((highlight, key) => (
          <div className="o-owner-dashboard-highlight__card" key={key}>
            <div className="o-owner-dashboard-highlight__card-title">
              <h3>{ highlight.title }</h3>
            </div>
            <h2 className="o-owner-dashboard-highlight__card-total">{ highlight.total }</h2>
            <h2 className="o-owner-dashboard-highlight__card-other">
              { 
                highlight.available ? `Today: ${highlight.available}` 
                : highlight.today && `Today: ${highlight.today}` 
              }
            </h2>
          </div>
        ))
      }
    </div>
  )
}

export default OrganismsOwnerDashboardHighlight
