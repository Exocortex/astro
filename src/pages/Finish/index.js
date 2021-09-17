import React from 'react'
import { Button, notification } from 'antd'

function finishIt(){
  if(window.config == undefined){
    notification.open({
      message: 'Error',
      description: 'You have not configured an Astro, please go home and start from there!',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  } else{
    navigator.clipboard.writeText(
      window.location.origin + '/share?tkcsid=' + window.config.shortId
    )
    notification.open({
      message: 'URL Copied to Clipboard',
      description: 'Share this digital Astro with your friends and colleagues',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }

}
function Finish (props) {
  return (
    <div className='finish-screen'>
      <div className='finish-content'>
        <h1>You did it! Your Astro is so cool!</h1>
        <p>
          So what happens next? We'll let you know if you're one of the lucky
          1,000 to receive your own plush Astro in the mail before December
          31st, 2021. Until then, check out the amazing products that power this
          experience, Sales Cloud and Revenue Cloud.
        </p>
        <Button className='final-btn'>Learn More</Button>
        <Button className='final-btn'>Dreamforce Home</Button>
        {window.config == undefined ? null :  <Button
          className='final-btn'
          onClick={() => finishIt()}
        >
          Share your design!
        </Button>}
       
      </div>
    </div>
  )
}

export default Finish
