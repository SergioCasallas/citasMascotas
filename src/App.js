import React, { Fragment, useState, useEffect } from 'react';

import Formulario from './components/Formulario.jsx';
import Cita from './components/Cita';

function App() {
  // citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arrego de citas
  const [citas, saveCitas] = useState(citasIniciales);

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  //Funcion que tome las citas actuales y agregue la nueva

  const crearCita = (cita) => {
    saveCitas([...citas, cita]);
  };

  //Funcion que elimina una cita por el id

  const deleteCita = (id) => {
    const newCitas = citas.filter((cita) => cita.id !== id);
    saveCitas(newCitas);
  };

  //mensaje condicional
  console.log(citas.length);
  const title = citas.length === 0 ? 'No tienes citas' : 'Administra tus citas';
  return (
    <Fragment>
      <h1>administrador de clientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario crearCita={crearCita} />
          </div>
          <div className='one-half column'>
            <h2>{title}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} deleteCita={deleteCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
