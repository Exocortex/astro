import React, { useState, useEffect } from 'react'
import { Input, Button, notification } from 'antd'
import { useAttribute } from 'threekit/hooks';

import StepComponent from '../../components/Step'
import SubmitOrder from '../../components/SubmitOrder'
import { Tabs } from 'threekit/components'
const { TabPane } = Tabs
import {
  Player,
  Form,
  Buttons,
  ColorSwatch,
  AwaitPlayerLoad,
  TwoCol,
} from '../../../threekit/components'



function Configurator(props) {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState()
  const [color, setColor] = useAttribute('Color');
  const [style, setStyle] = useAttribute('Style');
  const [displayColor, setDisplayColor] = useState();
  const [displayStyle, setDisplayStyle] = useState();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (color && (!displayColor || !displayStyle)) {
      let temp = color.values.map((e) => {
        return { ...e, colorValue: generateColorHex(e.label) }
      })
      setDisplayColor({ ...color, values: temp })
      console.log(temp)
      setDisplayStyle(style)
    }
  }, [style, color]);

  let generateColorHex = (colorString) => {
    switch (colorString) {
      case 'White':
        return '#edeeec'
        break;
      case 'Royal':
        return '#7aa8f3'
        break;
      case 'Orange':
        return '#ffa259'
        break;
      default:
        return '#ff0000'
        break;
    }
  }

  useEffect(() => {
  }, [displayStyle]);

  const openNotification = (color) => {
    notification.open({
      message: 'Out of Stock',
      description:
        `Sorry ${style.value} in ${color} is out of stock!`,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  let generateInventoryArray = (inventory, string) => {
    let res = inventory.map((inv) => {
      if (inv.color === string && inv.quantity > 0) {
        return inv.style
      }
    })
    return res.filter(function (x) {
      return x !== undefined;
    });
  }

  let handleColor = async (e) => {
    setColor(e)
    setDisplayStyle(style)
    let arrayInventory = {
      Royal: generateInventoryArray(props.inventory, "Royal"),
      Orange: generateInventoryArray(props.inventory, "Orange"),
      White: generateInventoryArray(props.inventory, "White")
    }
    let activeArray = arrayInventory[e]
    let temp = style
    let filtered = temp.values.filter((value) => {
      if (activeArray.includes(value.value)) {
        return true
      } return false
    })
    console.log(filtered)
    let bool
    filtered.forEach(element => {
      if (element.value === style.value) {
        bool = true
      }
    });
    if (!bool) {
      setStyle(filtered[0].value)
      openNotification(e)
    }
    setDisplayStyle({ ...displayStyle, values: filtered })
  }

  return (
    <div>
      <div className='content'>
        <div>
          <div

          >
            {props.current == 1 ? (
              <div>
                {displayColor ?
                  <div style={{
                    display: 'flex',
                    margin: 'auto',
                    width: '100%',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    padding: '5vw',
                    zIndex: "10",
                  }}>
                    <ColorSwatch options={displayColor.values} handleClick={(e) => handleColor(e)} selected={color.value}>
                    </ColorSwatch>
                    <Buttons options={displayStyle.values} handleClick={setStyle} selected={style.value}>
                    </Buttons>
                  </div> : null
                }

              </div>
            ) : null}
            {/* <div > */}
            <Player ></Player>

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configurator
