import React, { useState, useEffect } from 'react'
import { Input, Button, Result } from 'antd'
import StepComponent from '../../components/Step'
import SubmitOrder from '../../components/SubmitOrder'
import Configurator from '../../components/Configurator'
import {
  Player,
  Form,
  Snapshot,
  AwaitPlayerLoad,
} from '../../../threekit/components'
import WebFont from 'webfontloader';

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
    address: undefined,
    vip: undefined,
  })
  const [inventory, setInventory] = useState([])
  useEffect(() => {
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
    setCurrent(2)
    // document.getElementById('threekit-player').style.width = '20%'
    // document.getElementById('threekit-player').style.float = 'right'
  }
  return (
    <div className="landing">
      <StepComponent active={current} />
      <div className='content'>
        {current == 0 ? (
          <div >
            <div className="landing-welcome">
            <h1>
              {/* {props.vip == 'true'
                ? 'Enter your details to receive your own personalized Astro!'
                : 'Register for a chance to win your very own personalized Astro!'} */}
              Configure-a-character with Sales Cloud!
            </h1>
            <h3>
              Help Astro figure out what to wear and get your very own
              unique-to-you Astro plushie.
            </h3>
            <h3>
              Better hurry! The first _____ people to configure a character will
              get this awesome Sales Cloud swag. Hit 'next' to start your
              fashion adventure with Astro.
            </h3>
            <p>
              By registering, you agree to the processing of your personal data
              by Salesforce as described in the{' '}
              <a
                href='https://www.salesforce.com/company/privacy/full_privacy/'
                target='_blank'
              >
                Privacy Statement
              </a>
              .
            </p>
              </div>

       
            <br />
            <div className='content-center'>
              <Button className='control-btn' onClick={() => setCurrent(1)}>
                Next
              </Button>
            </div>
          </div>
        ) : null}
        {current == 1 || current == 2 ? (
          <div >
            <Configurator current={current} inventory={inventory} />
            {current == 2 ? (
              <div >
                {' '}
                <h3>
                  {props.vip
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
                    <div >
                      {e == 'vip' ? null : (
                        <TextArea
                          onChange={handleChange}
                          placeholder={
                            string.charAt(0).toUpperCase() + string.slice(1)
                          }
                          key={e}
                          rows={e == 'address' ? 4 : 1}
                          // autoSize={true}
                          style={{ width: '200px', margin: '5px' }}
                          id={e}
                          value={userInfo[e]}
                        />
                      )}
                    </div>
                  )
                })}
                <br />
                <SubmitOrder config={config} userInfo={userInfo} />
              </div>
            ) : null}
          </div>
        ) : null}
        {current == 2 ? (
          <div className='content-center button-container' >
            <Button className='control-btn' onClick={() => setCurrent(1)}>
              Back
            </Button>

            {/* <Button className='control-btn' onClick={() => setCurrent(3)}>
              Next
            </Button> */}
          </div>
        ) : null}

        {current == 1 ? (
          <AwaitPlayerLoad>
            <div className='content-center' >
              <Button
                className='control-btn'
                onClick={() => {
                  window.location.reload()
                }}
              >
                Back
              </Button>

              <Button className='control-btn' onClick={() => saveAndContinue()}>
                Next
              </Button>
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
