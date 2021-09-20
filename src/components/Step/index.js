import React from 'react'
import { Steps } from 'antd'
import { isMobile } from 'react-device-detect'
const { Step } = Steps

function StepComponent (props) {
  function moveToStepOne () {
    document.getElementsByClassName(
      'content-center'
    )[0].parentElement.style.display = 'inline'
    setCurrent(1)
  }
  async function moveForward () {
    const { controller } = window.threekit
 
    props.setCurrent(2)
    const response = await controller.saveConfiguration()
    window.config = response;
    document.getElementsByClassName(
      'content-center'
    )[0].parentElement.style.display = 'none'
   
  }
  return (
    <div className='step-comp'>
      <Steps current={props.active}>
        <Step
          title='Intro'
          onClick={() => {
            window.location.reload()
          }}
        />
        <Step
          title='Build'
          onClick={() => {
            props.setCurrent(1);
            document.getElementsByClassName(
              'content-center'
            )[0].parentElement.style.display = 'inline'
            document.getElementsByClassName(
              'ant-layout-content'
            )[0].style.backgroundImage =
              'url(https://solutions-engineering.s3.amazonaws.com/astro/foliage-no-astro.png)'
         
          }}
        />

        <Step
          title='Submit'
          onClick={() => (props.active == 1 ? moveForward() : null)}
        />

      </Steps>
    </div>
  )
}

export default StepComponent
