import React from 'react'
import { Steps } from 'antd'

const { Step } = Steps


function StepComponent(props) {
  return (
    <div className='step-comp'>
      <Steps current={props.active}>
        <Step title='Intro' onClick={() => {
          window.location.reload()
        }} />
        <Step title='Build' onClick={() => props.setCurrent(1)} />

        <Step title='Submit' />
      </Steps>
    </div>
  )
}

export default StepComponent
