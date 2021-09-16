import React, { useState, useEffect } from 'react'
import { Input, Spin, notification } from 'antd'
import { useAttribute, usePlayerLoadingStatus } from 'threekit/hooks'
import Loading from '../Loading'
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
import { isMobile } from 'react-device-detect'

function Configurator(props) {
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
      setDisplayStyle({ ...style, values: tempLogo })
    }
  }, [style, color, displayColor, displayStyle])

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

  useEffect(() => { }, [displayStyle])

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
    let temp = { ...style }
    let filtered = temp.values.filter(value => {
      if (activeArray.includes(value.value)) {
        return true
      }
      return false
    })
    console.log('filtered')
    console.log(filtered)
    let bool
    filtered = filtered.map(element => {
      if (element.value === style.value) {
        bool = true
      }
      let e = { ...element }
      e.colorValue = generateUrlString(element.value)
      return e
    })
    if (!bool) {
      setStyle(filtered[0].value)
      openNotification(e)
    }
    setDisplayStyle({ ...displayStyle, values: filtered })
  }

  return (
    <div
      style={isMobile ? {} : {
        float: props.current == 2 ? 'left' : 'none',
        width: props.current == 2 ? '70%' : '100%',
      }}
    >
      <div className='content-center'>
        <div>
          <div>
            {props.current == 1 ? (
              <div>
                {displayColor ? (
                  <div>
                    <center>

                      <ColorSwatch
                        size='50px'
                        id='color-options-box'
                        options={displayColor.values}
                        handleClick={e => handleColor(e)}
                        selected={color.value}
                        title={isMobile ? undefined : 'Select Color'}
                      ></ColorSwatch>
                      <ColorSwatch
                        size='50px'
                        id='logo-options-box'
                        options={displayStyle.values}
                        handleClick={setStyle}
                        selected={style.value}
                        title={isMobile ? undefined : 'Select Style'}

                      ></ColorSwatch>
                    </center>
                  </div>
                ) : null}
              </div>
            ) : null}
            {/* <div > */}
            <Player></Player>
            <Loading />

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configurator
