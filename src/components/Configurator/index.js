import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'

import StepComponent from '../../components/Step'
import SubmitOrder from '../../components/SubmitOrder'
import { Tabs } from 'threekit/components'
const { TabPane } = Tabs
import {
  Player,
  Form,
  Buttons,
  AwaitPlayerLoad,
} from '../../../threekit/components'
function Configurator (props) {
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
            {props.current == 1 ? (
              <div>

                <Tabs>
                  <TabPane label='Color'>
                    <Buttons title={' '} attribute='Color' />
                    </TabPane>
                  <TabPane label='Logo'>
                    <Buttons title={' '} attribute='Style' />
                    </TabPane>
                
                </Tabs>
                
              </div>
            ) : null}
          </div>
          <Player style={{ height: '50vh' }} />
        </div>
      </div>
    </div>
  )
}

export default Configurator
