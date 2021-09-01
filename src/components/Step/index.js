import React from 'react'
import { Steps } from 'antd'

const { Step } = Steps

function StepComponent (props) {
  return (
    <div>
     <Steps current={props.active}>
    <Step title="Register" />
    <Step title="Personalize"  />
    <Step title="Submit"  />
  </Steps>
    </div>
  )
}

export default StepComponent
