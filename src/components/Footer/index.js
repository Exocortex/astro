import React from 'react'
import { Spin } from 'antd'

function Footer (props) {
  return (
    <div className='app-footer'>
      <img className="footer-logo" src="https://solutions-engineering.s3.amazonaws.com/astro/sfxthreekit.png"/>
      <div className="footer-text"><p>©2020-2021 Salesforce, Inc. All rights reserved.</p>
      <p>
              By registering, you agree to the processing of your personal data
              by Salesforce as described in the{' '}
              <a
                href='https://www.salesforce.com/company/privacy/full_privacy/'
                target='_blank'
              >
                Privacy Statement
              </a>
              .
            </p>
      </div>
    </div>
  )
}

export default Footer
