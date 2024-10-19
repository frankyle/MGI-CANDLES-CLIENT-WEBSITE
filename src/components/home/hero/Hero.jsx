import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Learn how to trade Pips not Dollas' subtitle='Master forex trading with  tutorials and real-time signals.' />

          <form className='flex'>
            <div className='box'>
              <span>Currency</span>
              <input type='text' placeholder='ie. AUDUSD' />
            </div>
            <div className='box'>
              <span>Tutorials</span>
              <input type='text' placeholder='ie. Price Action' />
            </div>
            <div className='box'>
              <span>Blog</span>
              <input type='text' placeholder='ie. Last Week' />
            </div>
           
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
