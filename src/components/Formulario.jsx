import React, { Fragment, useState } from 'react';
import { v1 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
  //Crear State de Citas

  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  const [error, setError] = useState(false);
  //actualiza cuando se ejecula un cambio en un input
  const actualizarState = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //Extraer valores

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Agregar cita

  const submitCita = (e) => {
    e.preventDefault();

    //validar
    if (
      mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      setError(true);
      return;
    }
    //Eliminar mensaje
    setError(false);

    cita.id = uuid();

    //asignar id

    console.log(cita);

    //crear cita
    crearCita(cita);
    //reiniciar cita
    setCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {error ? (
        <p className='alerta-error'>Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>
          Nombre de Mascota
          <input
            type='text'
            name='mascota'
            className='u-full-width'
            placeholder='NombreMascota'
            onChange={actualizarState}
            value={mascota}
          />
        </label>
        <label>
          Nombre de Propietario
          <input
            type='text'
            name='propietario'
            className='u-full-width'
            placeholder='Nombre de Propietario'
            onChange={actualizarState}
            value={propietario}
          />
        </label>
        <label>
          Fecha
          <input
            type='date'
            name='fecha'
            className='u-full-width'
            onChange={actualizarState}
            value={fecha}
          />
        </label>
        <label>
          Hora
          <input
            type='time'
            name='hora'
            className='u-full-width'
            onChange={actualizarState}
            value={hora}
          />
        </label>
        <label>
          Sintomas
          <textarea
            className='u-full-width'
            name='sintomas'
            onChange={actualizarState}
            value={sintomas}></textarea>
        </label>
        <button type='submit' className='u-full-width button-primary'>
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propType = {
  crearCita: PropTypes.func.isRequired,
};
export default Formulario;
