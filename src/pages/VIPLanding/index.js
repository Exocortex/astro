import React from 'react'
import StepComponent from '../../components/Step'
function VIPLanding (props) {
  return (
    <div >
      <StepComponent active={0}/>
      <div className="content">
      <h1>VIPs - am I vip? {JSON.stringify(props.vip)}</h1>

      </div>
    </div>
  )
}

export default VIPLanding
