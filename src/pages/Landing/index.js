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
function Landing (props) {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState()
  const [userInfo, setUserInfo] = useState({
    name: undefined,
    email: undefined,
    company: undefined,
    address: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    vip: undefined,
  })
  useEffect(() => {
    // Update the document title using the browser API
    setUserInfo({ ...userInfo, vip: props.vip })
  }, [])

  function handleChange (e) {
    let keyName = e.target.id
    setUserInfo({ ...userInfo, [keyName]: e.target.value })
  }

  async function saveAndContinue () {
    const { controller } = window.threekit

    const response = await controller.saveConfiguration()
    console.log(response)
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
              By filling in this form you are consenting to share your
              information with Threekit & Salesforce.
            </p>
            {Object.keys(userInfo).map(e => {
              return (
                <div>
                  {e == 'vip' ? null : (
                    <Input
                      onChange={handleChange}
                      placeholder={e}
                      key={e}
                      style={{ width: '200px', margin: '5px' }}
                      id={e}
                      value={userInfo[e]}
                    />
                  )}
                </div>
              )
            })}
            <br />
            <Button onClick={() => setCurrent(1)}>Proceed</Button>
          </div>
        ) : null}
        {current > 0 ? <Configurator current={current} /> : null}

        {current == 1 ? (
          <AwaitPlayerLoad>
            <Button onClick={() => saveAndContinue()}>Proceed</Button>
            {/* <Button onClick={() => getThumbnail()}>Get Thumbnail</Button> */}

            {/* <Snapshot /> */}
          </AwaitPlayerLoad>
        ) : null}

        {current == 2 ? (
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
