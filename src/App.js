import React from 'react';
import { Provider } from 'react-redux';

//importamos el store para pasarlo al provider
import store from './store';

import Jugadores from './components/Jugadores';
import EquipoSeleccionado from './components/EquipoSeleccionado';

//import './styles/styles.scss';

/**
 * Componente principal App. Por medio del componente Provider hacemos posible que nuestra app acceda y lea nuestro store definido
 */
function App(){
  return(
    <Provider store={store}>
      <main>
        <h1>Football app</h1>
        <Jugadores />
        <EquipoSeleccionado />
      </main>
    </Provider>
  )
}


export default App;
