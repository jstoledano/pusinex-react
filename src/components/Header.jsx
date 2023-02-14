import React from 'react'
import pusinexLogo from '../assets/pusinex.svg'

const Header = () => {
  return (
    <header>
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            <img src={pusinexLogo} width="60px" alt="Icono PUSINEX" className="me-2" />
            <span className="fs-4">PUSINEX</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <a className="me-3 py-2 text-dark text-decoration-none" href="#"><i className="fa fa-key-modern" aria-hidden="true"></i> Administración</a>
            <a className="me-3 py-2 text-dark text-decoration-none" href="#"><i className="fa fa-cloud-download" aria-hidden="true"></i> Descarga</a>
            <a className="py-2 text-dark text-decoration-none" href="#"><i className="fa fa-python" aria-hidden="true"></i> Acerca de</a>
        </nav>
        </div>

        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">PUSINEX</h1>
        <p className="fs-5 text-muted">
            Plano Urbano Seccional con Números Exteriores
        </p>
        </div>
    </header>
  )
}

export default Header
