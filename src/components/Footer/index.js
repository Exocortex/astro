import React from 'react'
import { Spin } from 'antd'

function Footer (props) {
  return (
    <div className="app-footer">
      {window.loadingProgress < 1 || window.loadingProgress == undefined ? (
        <div>©2020-2021 Salesforce, Inc...</div>
      ) : null}
    </div>
  )
}

export default Footer
