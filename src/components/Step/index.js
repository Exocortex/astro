import React from 'react'
import { Steps } from 'antd'

const { Step } = Steps


function StepComponent(props) {
  return (
    <div className='step-comp'>
      <Steps current={props.active}>
        <Step title='Intro' onClick={() => props.setCurrent(0)} />
        <Step title='Build' onClick={() => props.setCurrent(1)} />

        <Step title='Submit' onClick={() => props.setCurrent(2)} />
      </Steps>
    </div>
  )
}

export default StepComponent
