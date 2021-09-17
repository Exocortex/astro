import React from 'react'
import { Button } from 'antd'

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
        <Button className="final-btn">Learn More</Button>
        <Button className="final-btn">Dreamforce Home</Button>

      </div>
    </div>
  )
}

export default Finish
