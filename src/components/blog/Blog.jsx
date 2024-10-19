import React from "react"
import Back from "../common/Back"
import "../home/recent/recent.css"
import img from "../images/hero5.jpg"
import ForexBlogPage from "./ForexBlogPage"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Pips Catch' title='Best Trades - Weekly' cover={img} />
        <div className='container recent'>
          {/* <RecentCard /> */}
          <ForexBlogPage/>
        </div>
      </section>
    </>
  )
}

export default Blog
