import React from "react"
import Heading from "../../common/Heading"
import "./price.css"
import PriceCard from "./PriceCard"

const Price = () => {
  return (
    <>
      <section className='price padding'>
        <div className='container'>
        <Heading 
          title='Choose Your Package' 
          subtitle='A special thanks to all our amazing clients and team for their continued support!'/>
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Price
