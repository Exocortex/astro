import React, { useState, useEffect } from 'react'
import { Button, Result, notification, Modal } from 'antd'
import { useHistory } from "react-router-dom";

function SubmitOrder (props) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  function shareLink () {
    navigator.clipboard.writeText(
      window.location.href + 'share?tkcsid=' + window.config.shortId  
    )
    notification.open({
      message: 'URL Copied to Clipboard',
      description: 'Share this digital Astro with your friends and colleagues',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
function goHome(){
  history.push("/finished")
}
  async function submit () {
  
    const { controller } = window.threekit
    const findUndefined = element => element == undefined
    let arr = Object.values(props.userInfo)

    if (arr.some(findUndefined)) {
      console.log(props.userInfo)
      notification.open({
        message: 'Check all form fields',
        description: 'Please ensure all fields are filled out',
        onClick: () => {
          console.log('Notification Clicked!')
        },
      })
    } else {
      const response = await controller._api.orders.createOrder({
        userId: props.userInfo,
        name: 'test',
        metadata: props.userInfo,
        cart: [
          {
            configurationId: window.config.id ,
            count: 1,
            metadata: {},
          },
        ],
      })
      console.log(response)
      goHome();


      setIsSubmitted(true)
    }
  }
  return (
    <div>
      {/* <p>{JSON.stringify(props.userInfo)}</p> */}
      <Modal
        title='Thank you!'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Result
          status='success'
          title='Your personalized Astro has been submitted!'
          // subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
          extra={[
            <Button type='primary' key='console' onClick={() => shareLink()}>
              Share Astro
            </Button>,
            <Button key='buy' href="https://salesforce.com/salescloud" target="_blank">Learn More</Button>,
          ]}
        />
      </Modal>

      <Button onClick={() => submit()}>Submit</Button>
    </div>
  )
}

export default SubmitOrder
