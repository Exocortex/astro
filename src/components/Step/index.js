import React from 'react'
import { Steps } from 'antd'

const { Step } = Steps


function StepComponent (props) {
  return (
    <div className='step-comp'>
      <Steps current={props.active}>
        <Step title='Intro' />
        <Step title='Build' />

        <Step title='Submit' />
      </Steps>
    </div>
  )
}

export default StepComponent
