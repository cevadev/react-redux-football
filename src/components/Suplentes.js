import React from 'react';
import { connect } from 'react-redux';

import '../styles/styles.scss';

function Suplentes(props){
    const suplentes = props.suplentes;
    return(
        <section>
            <h2>Suplentes</h2>
            <div className="suplentes">
                {
                    suplentes.map(jugador => (
                        <article className="suplente" key={jugador.id}>
                            <div>
                                <img src={jugador.foto} alt={jugador.nombre}/>
                                <button onClick={() => props.quitarSuplente(jugador)}>X</button>
                            </div>
                            <h3>{jugador.nombre}</h3>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}

const mapStateToProps = state =>(
    {
        suplentes: state.suplentes
    }
)

const mapDispatchToProps = dispatch =>(
    {
        quitarSuplente(jugador){
            dispatch(
                {
                    type: 'QUITAR_SUPLENTE',
                    jugador
                }
            )
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Suplentes)