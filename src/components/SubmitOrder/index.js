import React, { useState } from 'react'
import { Button, Result, notification, Modal } from 'antd'

function SubmitOrder (props) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

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
      window.location.href + 'share?tkcsid=' + props.config.shortId
    )
    notification.open({
      message: 'URL Copied to Clipboard',
      description: 'Share this digital Astro with your friends and colleagues',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }

  async function submit () {
    const { controller } = window.threekit
    showModal()
    const response = await controller._api.orders.createOrder({
      userId: props.userInfo,
      name: 'test',
      metadata: props.userInfo,
      cart: [
        {
          configurationId: props.config.id,
          count: 1,
          metadata: {},
        },
      ],
    })
    console.log(response)
    setIsSubmitted(true)
  }
  return (
    <div>
      {/* <p>{JSON.stringify(props.userInfo)}</p> */}
      <Modal
        title='Basic Modal'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Result
          status='success'
          title='Your personalized Astro has been submitted!'
          // subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
          extra={[
            <Button type='primary' key='console' onClick={() => shareLink()}>
              Share Astro
            </Button>,
            <Button key='buy'>Return Home</Button>,
          ]}
        />
      </Modal>

      <Button onClick={() => submit()}>Submit</Button>
    </div>
  )
}

export default SubmitOrder
