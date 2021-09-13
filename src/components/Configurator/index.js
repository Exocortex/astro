import React, { useState, useEffect } from 'react'
import { Input, Spin, notification } from 'antd'
import { useAttribute, usePlayerLoadingStatus } from 'threekit/hooks'

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

function Configurator (props) {
  const [current, setCurrent] = useState(0)
  const [config, setConfig] = useState()
  const [color, setColor] = useAttribute('Color')
  const [style, setStyle] = useAttribute('Style')
  const [displayColor, setDisplayColor] = useState()
  const [displayStyle, setDisplayStyle] = useState()
  const [step, setStep] = useState(0)
  const loading = usePlayerLoadingStatus();
  useEffect(() => {
    if (color && (!displayColor || !displayStyle)) {
      let tempColor = color.values.map(e => {
        return { ...e, colorValue: generateColorHex(e.label) }
      })
      let tempLogo = style.values.map(logo => {
        return { ...logo, colorValue: generateUrlString(logo.value) }
      })
      setDisplayColor({ ...color, values: tempColor })
      console.log(tempColor)
      setDisplayStyle({ ...style, values: tempLogo })
    }

console.log('loading' + window.loadingProgess)
  }, [style, color])

  let generateColorHex = colorString => {
    switch (colorString) {
      case 'White':
        return '#edeeec'
        break
      case 'Royal':
        return '#7aa8f3'
        break
      case 'Orange':
        return '#ffa259'
        break
      default:
        return '#ff0000'
        break
    }
  }

  let generateUrlString = logo => {
    console.log(logo)
    switch (logo) {
      case 'Salesforce':
        return 'url(https://solutions-engineering.s3.amazonaws.com/media/web-assets/Salesforce+Logo.png)'
        break
      case 'Adventure':
        return 'url(https://solutions-engineering.s3.amazonaws.com/media/web-assets/Astro+on+Adventure.png)'
        break
      case 'Sales Cloud':
        return 'url("https://solutions-engineering.s3.amazonaws.com/media/web-assets/Salesforce+Cloud.png")'
        break
      case 'Fanny Pack':
        return 'url("https://solutions-engineering.s3.amazonaws.com/media/web-assets/Bag.png")'
        break
      case 'Pride':
        return 'url("https://solutions-engineering.s3.amazonaws.com/media/web-assets/Pride.png")'
        break
      default:
        return '#ff0000'
        break
    }
  }

  useEffect(() => {}, [displayStyle])

  const openNotification = color => {
    notification.open({
      message: 'Out of Stock',
      description: `Sorry ${style.value} in ${color} is out of stock!`,
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }

  let generateInventoryArray = (inventory, string) => {
    let res = inventory.map(inv => {
      if (inv.color === string && inv.quantity > 0) {
        return inv.style
      }
    })
    return res.filter(function (x) {
      return x !== undefined
    })
  }

  let handleColor = async e => {
    setColor(e)
    let tempLogo = style.values.map(logo => {
      return { ...logo, colorValue: generateUrlString(logo.value) }
    })
    setDisplayStyle({ ...style, values: tempLogo })
    let arrayInventory = {
      Royal: generateInventoryArray(props.inventory, 'Royal'),
      Orange: generateInventoryArray(props.inventory, 'Orange'),
      White: generateInventoryArray(props.inventory, 'White'),
    }
    let activeArray = arrayInventory[e]
    let temp = style
    let filtered = temp.values.filter(value => {
      if (activeArray.includes(value.value)) {
        return true
      }
      return false
    })
    console.log(filtered)
    let bool
    filtered.forEach(element => {
      if (element.value === style.value) {
        bool = true
      }
      element.colorValue = generateUrlString(element.value)
    })
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
          <div>
            {props.current == 1 ? (
              <div>
                {displayColor ? (
                  <div>
                    <ColorSwatch
                      size='50px'
                      id='color-options-box'
                      options={displayColor.values}
                      handleClick={e => handleColor(e)}
                      selected={color.value}
                    ></ColorSwatch>
                    <ColorSwatch
                      size='50px'
                      id='logo-options-box'
                      options={displayStyle.values}
                      handleClick={setStyle}
                      selected={style.value}
                    ></ColorSwatch>
                  </div>
                ) : null}
              </div>
            ) : null}
            {/* <div > */}
            <Player></Player>
            {window.loadingProgess == undefined || window.loadingProgess < 1 ? <div><p>Loading..</p><Spin/></div> : null}

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configurator
