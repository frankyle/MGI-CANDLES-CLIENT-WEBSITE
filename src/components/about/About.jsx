import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/forex3.jpg"
import img1 from "../images/forex6.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Strategy' subtitle='Check out our forex jornal and work process' />

  <p>We are passionate about helping our students develop a deep understanding of forex fundamentals, including market analysis, risk management, and trading strategies. Our courses are designed to cater to traders of all levels, from beginners to seasoned professionals.
  </p>
<p>Beyond classroom instruction, we foster a supportive learning environment where students can connect with like-minded individuals and share their experiences. Our goal is to empower you to make informed trading decisions and achieve your financial objectives.
</p>
<button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src={img1} alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
