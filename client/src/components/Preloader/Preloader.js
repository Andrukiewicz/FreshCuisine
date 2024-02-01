import React, { Component } from "react"
import "./Preloader.css"

class Preloader extends Component {
  preloader() {
    let preload = document.querySelector(".preloader")
    setTimeout(() => {
      preload.style.opacity = "0"
      setTimeout(() => {
        preload.style.display = "none"
      }, 1000)
    }, 2500)
  }

  componentDidMount() {
    this.preloader()
  }

  render() {
    return (
      <div className='preloader bg-white dark:bg-neutral-900'>
        <div className='pan-loader'>
          <div className='loader'></div>
          <div className='pan-container'>
            <div className='pan'></div>
            <div className='handle'></div>
          </div>
          <div className='shadow'></div>
        </div>
      </div>
    )
  }
}

export default Preloader
