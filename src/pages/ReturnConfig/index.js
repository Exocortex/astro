import React, { useState, useEffect } from 'react'

import {
  Player,

} from '../../../threekit/components'
function ReturnConfig (props) {


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
