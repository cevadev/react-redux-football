import React, { useEffect, createRef } from 'react';

//{ connect } -> nos permite conectarnos al store para leer los datos que requiere nuestro componente Jugadores
import { connect } from 'react-redux';

import '../styles/styles.scss';

function Jugadores(props){
    const jugadores = props.jugadores

       const gridJugadores = createRef()

  useEffect(() => {
    setScrollContainer()
    document.addEventListener('click', setScrollContainer)
  }, []) 
  
  // Función que fija el tamaño del grid de los jugadores
  const setScrollContainer = (desktop = true) => {
    let container = gridJugadores.current
    if (container) {
      const generatedGrid = () => {
        let items = container.getElementsByClassName('jugador')
        let itemsLength = items.length
        let bp = window.matchMedia("(min-width: 640px)").matches ? window.matchMedia("(min-width: 1024px)").matches ? 4 : 2 : 1

        const getWidth = () => {
          let n = bp + (itemsLength > bp ? 0.3 : 0)
          return (itemsLength / n) * 100
        }
        return `
                display: grid;
                grid-template-columns: repeat(${itemsLength}, 225px);
                grid-gap: 1rem;
                width : ${getWidth()}%;
              `
      }
      let styles = !desktop && window.matchMedia("(min-width: 1024px)").matches ? `display: grid; grid-row-gap: 1rem;` : generatedGrid()
      container.setAttribute('style', styles)
    }
  }


    return(
        <section>
            <h2>Jugadores</h2>
            <div className="contenedor-jugadores">
                <div ref={gridJugadores} onClick={() => setScrollContainer.bind(this)}>
                    {
                        //recorremos el array de jugadores. por cada jugador dibujamos un card
                        jugadores.map(jugador => (
                            <article className="jugador" key={jugador.id}>
                                <img src={jugador.foto} alt={jugador.nombre}/>
                                <h3>{jugador.nombre}</h3>
                                <div>
                                    <button onClick={() => props.agregarTitular(jugador)}>Poner de titular</button> {' '}
                                    <button onClick={() => props.agregarSuplente(jugador)}>Poner de suplente</button>
                                </div>
                            </article>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

/**
 * funcion connect -> recibe 2 funciones: Ambas funciones pueden ser objetos null o vacio {} en el caso no ser utilizadas
 *      mapStateToProps -> mapea (recibe) lo que tenemos en el state y lo convierte (retorna un objeto) en props (propiedades)
 *      mapDispatchToProps -> mapea las funciones (actions) para convertirlas en propiedades
 */
const mapStateToProps = state =>(
    {
        //con el state recibido creamos un objeto con los siguientes atributos
        //pasamos los jugadores del state al atributo jugadores. Al tener este objeto y su propiedad jugadores ahora lo podemos
        //pasar por medio de propiedades (props) al objeto Jugadores
        jugadores: state.jugadores 
    }
)

//mapDispatchToProps es una funcion que recibe una funcionn dispatch() y retorna algo (por el momento un objeto vacio)
const mapDispatchToProps = dispatch =>(
    {
        //este tipo de propiedades son las encargadas de llevar las acciones que van a ser leidas por el reducer
        //para poder cambiar el estado. definimos la funcion agregarTitular(jugador) que recibe un jugador
        //la funcion agregarTitular() estará disponibles en los props
        agregarTitular(jugador){
            //invocamos a la funcion disptach de redux y creamos un objeto
            dispatch(
                {
                    type: 'AGREGAR_TITULAR', //identificador
                    jugador
                }
            )
        },

        agregarSuplente(jugador){
            dispatch(
                {
                    type: 'AGREGAR_SUPLENTE',
                    jugador
                }
            )
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Jugadores)