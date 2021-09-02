import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'

import StepComponent from '../../components/Step'
import SubmitOrder from '../../components/SubmitOrder'

import {
  Player,
  Form,
  Buttons,
  AwaitPlayerLoad,
} from '../../../threekit/components'
function Configurator(props) {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState()

  return (
    <div>
      <div className='content'>
        <div>
          <div
            style={{
              margin: 'auto',

            }}
          >
            {props.current == 1 ? <Buttons title={' '} attribute='Hoodie Finish' /> : null}

          </div>
          <Player height="50vh" />

        </div>
      </div>
    </div>
  )
}

export default Configurator
