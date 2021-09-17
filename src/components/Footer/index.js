import React from 'react'
import { Spin } from 'antd'

function Footer(props) {
  return (
    <div className='app-footer'>
      <img className="footer-logo" src="https://solutions-engineering.s3.amazonaws.com/astro/sfxthreekit.png" />
      <div className="footer-text"><p>©2020-2021 Salesforce, Inc. All rights reserved.</p>
        <p className="small-text">
          No purchase necessary. The first two thousand (2000) Eligible Participants who complete and submit the entry form with valid information on or before December 31, 2021 may be sent a gift. Eligible Participants include those who are residents of the U.S. (including D.C.) and Canada (excluding Quebec) that are at least 18 years old as of the date of entry. Employees of Salesforce or its affiliates, government employees, including all federal, state, territory, province, county, city, district or municipal government employees are not eligible to participate. Limit one (1) gift per Eligible Participant subject to verification of eligibility and availability of gift. Salesforce reserves the right to change quantity and type of gift at any time. Gift cannot be combined with other offers, is non-transferable and not redeemable for cash. Offer subject to change at any time. Salesforce is not responsible for inaccurate or incomplete entry form information, technical failures of any kind that may prevent or delay entry submission including the unavailability or inaccessibility of the website, or any errors which may occur in the offer or administration of this giveaway or the processing of entries.
        </p>
      </div>
    </div>
  )
}

export default Footer
