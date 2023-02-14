import React from 'react'
import logoINE from '../assets/ine_150x53.png'

const Footer = () => {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md">
          <img className="mb-2" src={logoINE} alt="" />

        </div>
        <div className="col-8 col-md">
          <small className="d-block mb-3 text-muted">&copy; 2017–2022</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
