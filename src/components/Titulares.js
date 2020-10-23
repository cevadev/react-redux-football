import React from 'react';
import { connect } from 'react-redux';

import '../styles/styles.scss';
import cancha from '../cancha.svg';

function Titulares(props){
    const titulares = props.titulares;

     return(
        <section>
            <h2>Titulares</h2>
            <div className="cancha">
                {
                    titulares.map(jugador => (
                        <article className="titular" key={jugador.id}>
                            <div>
                                <img src={jugador.foto} alt={jugador.nombre}/>
                                <button onClick={() => props.quitarTitular(jugador)}>X</button>
                            </div>
                            <h3>{jugador.nombre}</h3>
                        </article>
                    ))
                }
                <img src={cancha} alt="cancha"/>
            </div>
        </section>
    )
}

const mapStateToProps = state => (
    {
        titulares: state.titulares
    }
)

const mapDispatchToProps = dispatch =>(
    {
        quitarTitular(jugador){
            dispatch(
                {
                    type: 'QUITAR_TITULAR',
                    jugador
                }
            )
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Titulares)