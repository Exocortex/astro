import React from 'react'
import { Spin } from 'antd'

function Loading (props) {
  return (
    <div>
      {window.loadingProgress < 1 || window.loadingProgress == undefined ? (
        <div style={{margin: '10px'}}>
          <Spin />
        </div>
      ) : null}
    </div>
  )
}

export default Loading
