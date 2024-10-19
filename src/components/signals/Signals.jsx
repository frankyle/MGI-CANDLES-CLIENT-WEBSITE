import React from "react"
import Back from "../common/Back"
import "../home/recent/recent.css"
import img from "../images/BTCUSD_Tp.JPG"
import WeeklyFocast from "../trades/WeeklyFocast"

const Signals = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Today Signals' title='Earn while Learnig' cover={img} />
        <div className='container recent'>
          <WeeklyFocast/>
        </div>
      </section>
    </>
  )
}

export default Signals
