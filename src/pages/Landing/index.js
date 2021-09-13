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

const { TextArea } = Input

function Landing(props) {
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

  function handleChange(e) {
    let keyName = e.target.id
    setUserInfo({ ...userInfo, [keyName]: e.target.value })
  }

  async function saveAndContinue() {
    const { controller } = window.threekit

    const response = await controller.saveConfiguration()
    console.log(inventory)
    let currentConfig = {
      Color: window.threekit.configurator.getConfiguration().Color,
      Style: window.threekit.configurator.getConfiguration().Style,
    }

    inventory.forEach(e => {
      if (e.color == currentConfig.Color && e.style == currentConfig.Style) {
        console.log('MATCHING', e)
        console.log('inventory left: ', e.quantity)
      }
    })
    console.log(currentConfig)

    // NEED THIS TO WORK
    // console.log(response)
    setConfig(response)
    setCurrent(2)
  }
  return (
    <div>
      <StepComponent active={current} />
      <div className='content'>
        {current == 0 ? (
          <div>
            {' '}
            <h3>
              {props.vip
                ? 'Enter your details to receive your own personalized Astro!'
                : 'Register for a chance to win your very own personalized Astro!'}
            </h3>
            <p>
              By registering, you agree to the processing of your personal data
              by Salesforce as described in the{' '}
              <a href='https://www.salesforce.com/company/privacy/full_privacy/' target='_blank'>
                Privacy Statement
              </a>
              .
            </p>
            <br />
            <Button onClick={() => setCurrent(1)}>Proceed</Button>
          </div>
        ) : null}
        {current == 1 || current == 2 ? (
          <Configurator current={current} inventory={inventory} />
        ) : null}
        {current == 2 ? <Button onClick={() => setCurrent(3)}>Proceed</Button> : null}

        {current == 1 ? (
          <AwaitPlayerLoad>
            <Button onClick={() => saveAndContinue()}>Proceed</Button>
            {/* <Button onClick={() => getThumbnail()}>Get Thumbnail</Button> */}

            {/* <Snapshot /> */}
          </AwaitPlayerLoad>
        ) : null}
        {current == 3 ? (
          <div>
            {' '}
            <h3>
              {props.vip
                ? 'Enter your details to receive your own personalized Astro!'
                : 'Register for a chance to win your very own personalized Astro!'}
            </h3>
            <p>
              By registering, you agree to the processing of your personal data
              by Salesforce as described in the{' '}
              <a href='https://www.salesforce.com/company/privacy/full_privacy/' target='_blank'>
                Privacy Statement
              </a>
              .
            </p>
            {Object.keys(userInfo).map(e => {
              let string = e.replace(/([A-Z])/g, ' $1')
              return (
                <div>
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
        {current == 4 ? (
          <SubmitOrder config={config} userInfo={userInfo} />
        ) : null}
        {/* <AwaitPlayerLoad>
          <Form />
        </AwaitPlayerLoad> */}
      </div>
    </div>
  )
}

export default Landing
