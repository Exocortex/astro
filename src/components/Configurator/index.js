import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { useAttribute } from 'threekit/hooks';

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



function Configurator(props) {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState()
  const [color, setColor] = useAttribute('Color');
  const [style, setStyle] = useAttribute('Style');
  const [displayColor, setDisplayColor] = useState();
  const [displayStyle, setDisplayStyle] = useState();

  useEffect(() => {
    if (style && setStyle) {
      console.log(style)
    }
    setDisplayColor(color)
    setDisplayStyle(style)
  }, [style, color]);

  return (
    <div>
      <div className='content'>
        <div>
          <div

          >
            {props.current == 1 ? (
              <div>

                <Tabs>
                  <TabPane label='Color'>
                    {displayColor ? <Buttons options={displayColor.values} handleClick={setColor} selected={color.value}></Buttons> : null
                    }
                  </TabPane>
                  <TabPane label='Logo'>
                    {displayStyle ? <Buttons options={displayStyle.values} handleClick={setStyle} selected={style.value}></Buttons> : null
                    }
                  </TabPane>

                </Tabs>

              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configurator
