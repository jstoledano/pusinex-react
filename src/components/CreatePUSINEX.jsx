import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import axios from 'axios';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './CreatePUSINEX.css';

const PDFViewer = ({archivo}) =>  {
  const base = `http://localhost:8000`;
  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };
  const [file, setFile] = useState(`${base}${archivo}`);
  const [numPages, setNumPages] = useState(null);
  console.log(file)

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className='row Pusinex'>
      <header>
        <h3>Archivo de PUSINEX</h3>
      </header>
      <div className='Pusinex__container'>
        <div className="Pusinex__container__document">
          <Document 
            file={file} onLoadSuccess={onDocumentLoadSuccess} 
            options={options}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

const CreatePUSINEX = () => {
    const [municipios, setMunicipios] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const [localidadSeleccionada, setLocalidadSeleccionada] = useState(null);
    const [pusinex, setPusinex] = useState(null);
    const [pusinexActual, setPusinexActual] = useState(null);

    const base = `http://localhost:8000/api/`;
  
    useEffect(() => {
      // Obtener lista de municipios
      axios.get('http://127.0.0.1:8000/api/municipio/')
        .then(response => {
          setMunicipios(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    const handleMunicipioChange = (event) => {
      // Actualizar municipio seleccionado y obtener secciones correspondientes
      const municipioId = event.target.value;
      setMunicipioSeleccionado(municipioId);
      axios.get(`http://127.0.0.1:8000/api/seccion/?municipio=${municipioId}`)
        .then(response => {
          setSecciones(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      axios.get(`http://127.0.0.1:8000/api/localidad/?municipio=${municipioId}`)
        .then(response => {
          setLocalidades(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setLocalidadSeleccionada(event.target.localidad.value);
      setSeccionSeleccionada(event.target.seccion.value);

      const urlPusinex = `${base}pusinex/?id=&seccion__seccion=${seccionSeleccionada}&localidad__localidad=${localidadSeleccionada}`;

      axios.get(urlPusinex)
        .then(response => {
          setPusinex(response.data[0]);
        })
        .catch(error => {
          console.log(error);
        });

        setPusinexActual(pusinex.rev);
        console.log(pusinexActual);
    };
  
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>

        <div className='row'>
          <label className='display-3' htmlFor='municipio'>Selecciona un Municipio</label>
          <div className='col-8'>
            <select 
              id='municipio'
              name='municipio'
              className='form-select form-select-lg mb-3'
              value={municipioSeleccionado} onChange={handleMunicipioChange}>
              <option value="">Municipio</option>
              {municipios.map(municipio => (
                <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='col-3'>
            <label className='h5' htmlFor='seccion'>Selecciona una Sección</label>
            <div className='col-12'>
              <select
                id='seccion'
                name='seccion'
                className='form-select form-select-lg mb-3'>
                {secciones.map(seccion => (
                  <option key={seccion.id} value={seccion.seccion}>{seccion.seccion}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='col-9'>
            <label className='h5' htmlFor='localidad'>Selecciona una Localidad</label>
            <div className='col-12'>
              <select
                id='localidad'
                name='localidad'
                className='form-select form-select-lg mb-3'>
                {localidades.map(localidad => (
                  <option key={localidad.id} value={localidad.localidad}>{localidad.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <button className='btn btn-primary btn-lg btn-block col-6' type='submit'>Buscar</button>
          </div>
        </div>

      </form>
      
      <hr className='mb-4 mt-1' />

      <div className='row'>
        <div className='col-12'>
          {pusinex ? (
            <>
              <p className='h3'>PUSINEX</p>
              <table className='table col-6'>
              <tbody>
                <tr>
                  <th scope='row'>Distrito</th>
                  <td>{pusinex.seccion.distrito.distrito.toString().padStart(2, '0')}</td>
                </tr>
                <tr>
                  <th scope='row'>Municipio</th>
                  <td>{pusinex.seccion.municipio.municipio.toString().padStart(3, '0')} {pusinex.seccion.municipio.nombre}</td>
                </tr>
                <tr>
                  <th scope='row'>Sección</th>
                  <td>{pusinex.seccion.seccion.toString().padStart(4, '0')}</td>
                </tr>
                <tr>
                  <th scope='row'>Localidad</th>
                  <td>
                    {pusinex.localidad.localidad.toString().padStart(4, '0')} &nbsp;
                    {pusinex.localidad.nombre}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>Actualización</th>
                  <td>{pusinex.rev.f_act}</td>
                </tr>
                <tr>
                  <th scope='row'>Hojas</th>
                  <td>{pusinex.rev.hojas}</td>
                </tr>
              </tbody>
            </table>
            <hr className='mb-4 mt-1' />
            {pusinex.rev.f_act  ? (
              <div className='Pusinex'>
               <PDFViewer archivo={pusinex.rev.archivo} />
              </div>
            ) : (
              <p className='h4'>No se han agregado PUSINEX a la localidad</p>
            )}
            </>
          ) : (
            <p className='h3'>No hay PUSINEX. Selecciona una sección y  una localidad.</p>
          )}
      </div>
    </div>
    </>
  )
}

export default CreatePUSINEX
