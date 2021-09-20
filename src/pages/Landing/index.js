import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import StepComponent from '../../components/Step'
import SubmitOrder from '../../components/SubmitOrder'
import Configurator from '../../components/Configurator'
import {
  Player,
  Form,
  Snapshot,
  AwaitPlayerLoad,
} from '../../../threekit/components'
import WebFont from 'webfontloader'
import { isMobile } from 'react-device-detect'
const { TextArea } = Input

function Landing (props) {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState()
  const [userInfo, setUserInfo] = useState({
    firstName: undefined,
    lastName: undefined,
    jobTitle: undefined,
    workEmail: undefined,
    phone: undefined,
    country: undefined,
    shippingAddress: undefined,
    vip: undefined,
  })
  const [inventory, setInventory] = useState([])
  const [allGone, setAllGone] = useState(false)
  function handleAllGone () {
    setAllGone(true)
  }
  const startConfig = () => {
    message.info(isMobile ? 'Tap swatches once to see see info and again to apply!' : 'Select a color and style to make Astro your own!')
    setCurrent(1);
    document.getElementsByClassName(
      'content-center'
    )[0].parentElement.style.display = 'inline'
    document.getElementsByClassName(
      'ant-layout-content'
    )[0].style.backgroundImage =
      'url(https://solutions-engineering.s3.amazonaws.com/astro/foliage-no-astro.png)'
  }
  useEffect(() => {
    // document.getElementsByClassName('ant-layout-content')[0].style.backgroundImage = "url(https://solutions-engineering.s3.amazonaws.com/astro/astro-sweater-design.png)"
    // Update the document title using the browser API
    setUserInfo({ ...userInfo, vip: props.vip })
    fetch('https://astro-api.demo.threekit.com/get-inventory/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setInventory(data)
      })
  }, [])

  function handleChange (e) {
    let keyName = e.target.id
    setUserInfo({ ...userInfo, [keyName]: e.target.value })
  }

  async function saveAndContinue () {
    const { controller } = window.threekit

    const response = await controller.saveConfiguration()
    console.log(inventory)
    let currentConfig = {
      Color: window.threekit.configurator.getConfiguration().Color,
      Style: window.threekit.configurator.getConfiguration().Style,
    }

    inventory.forEach(e => {
      if (e.color == currentConfig.Color && e.style == currentConfig.Style) {
      }
    })
    console.log(currentConfig)

    // NEED THIS TO WORK
    // console.log(response)
    setConfig(response)
    window.config = response
    setCurrent(2)
    document.getElementsByClassName(
      'content-center'
    )[0].parentElement.style.display = 'none'

    // document.getElementById('threekit-player').style.width = '20%'
    // document.getElementById('threekit-player').style.float = 'right'
  }
  function moveToStepOne () {
    document.getElementsByClassName(
      'content-center'
    )[0].parentElement.style.display = 'inline'
    setCurrent(1)
  }
  return (
    <div className='landing'>
      <StepComponent active={current} setCurrent={setCurrent} config={config} />
      <div className='content'>
        {current == 0 ? (
          <div>
            <div className='landing-welcome'>
              <h1>
                {/* {props.vip == 'true'
                ? 'Enter your details to receive your own personalized Astro!'
                : 'Register for a chance to win your very own personalized Astro!'} */}
                Configure-a-Character with Sales Cloud!
              </h1>
              <h3>
                Help Astro figure out what to wear and get your very own
                unique-to-you Astro plushie.
              </h3>
              <p className='left-align'>
                Better hurry! The first 2000 Eligible Participants who complete
                their Astro and submit a valid entry form on or before December
                31, 2021 may be sent a plush version of their Astro. Hit “next”
                to start your fashion adventure with Astro.
              </p>
            </div>

            <br />
            <div className='content-center'>
              <Button className='control-btn' onClick={startConfig}>
                Next
              </Button>
            </div>
          </div>
        ) : null}
        {current == 1 || current == 2 ? (
          <div>
            <Configurator
              current={current}
              inventory={inventory}
              isAllGone={() => handleAllGone()}
            />
            {current == 2 ? (
              <div className='submit-form'>
                {' '}
                <h3>
                  {props.vip == 'true'
                    ? 'Enter your details to receive your own personalized Astro!'
                    : 'Register for a chance to win your very own personalized Astro!'}
                </h3>
                <p>
                  By registering, you agree to the processing of your personal
                  data by Salesforce as described in the{' '}
                  <a
                    href='https://www.salesforce.com/company/privacy/full_privacy/'
                    target='_blank'
                  >
                    Privacy Statement
                  </a>
                  .
                </p>
                {Object.keys(userInfo).map(e => {
                  let string = e.replace(/([A-Z])/g, ' $1')
                  return (
                    <div style={{margin: 'auto'}}>
                      {e == 'vip' ? null : (
                        <TextArea
                          onChange={handleChange}
                          placeholder={
                            string.charAt(0).toUpperCase() + string.slice(1)
                          }
                          key={e}
                          rows={e == 'shippingAddress' ? 4 : 1}
                          // autoSize={true}
                          style={{ width: '300px', margin: '5px' }}
                          id={e}
                          value={userInfo[e]}
                        />
                      )}
                    </div>
                  )
                })}
                <SubmitOrder config={window.config} userInfo={userInfo} />
              </div>
            ) : null}
          </div>
        ) : null}
        {current == 2 ? (
          <div className='content-center button-container'>
            <Button className='control-btn back' onClick={() => moveToStepOne()}>
              Back
            </Button>

            {/* <Button className='control-btn' onClick={() => setCurrent(3)}>
              Next
            </Button> */}
          </div>
        ) : null}

        {current == 1 ? (
          <AwaitPlayerLoad>
            <div className='content-center'>
              <Button
                className='control-btn back'
                onClick={() => {
                  window.location.reload()
                }}
              >
                Back
              </Button>
              {allGone ? null : (
                <Button
                  className='control-btn'
                  onClick={() => saveAndContinue()}
                >
                  Next
                </Button>
              )}

              {/* <Button onClick={() => getThumbnail()}>Get Thumbnail</Button> */}

              {/* <Snapshot /> */}
            </div>
          </AwaitPlayerLoad>
        ) : null}

        {/* {current == 3 ? (
          <SubmitOrder config={config} userInfo={userInfo} />
        ) : null} */}
        {/* <AwaitPlayerLoad>
          <Form />
        </AwaitPlayerLoad> */}
      </div>
    </div>
  )
}

export default Landing
