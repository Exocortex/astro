import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'

import { Player } from '../../../threekit/components'
import Loading from "../../components/Loading"
function ReturnConfig(props) {
  useEffect(() => {
    window.loadingProgress = undefined
  })
  return (
    <div>
      <div className='content'>
        <div>
          <Player style={{ height: '50vh' }} />
        </div>
      </div>
    </div>
  )
}

export default ReturnConfig
