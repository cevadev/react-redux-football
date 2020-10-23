import { createStore } from 'redux';

//definimos la data de nuestro estado inicial llamado initialState
const initialState = {
    //como estado inicial queremos un lugar para almacenar jugadres, otro lugar para titulares y otro para suplentes
    jugadores: [
        {
            id: 1,
            nombre: "Juan Fernando",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 2,
            nombre: "Antonio Solis",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 3,
            nombre: "Mariano Pelaez",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 4,
            nombre: "Juan Fernando",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 5,
            nombre: "Antonio Solis",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 6,
            nombre: "Mariano Pelaez",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 7,
            nombre: "Juan Fernando",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 8,
            nombre: "Antonio Solis",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
        {
            id: 9,
            nombre: "Mariano Pelaez",
            foto: "https://api.ed.team/files/avatars/001803a2-cf00-4a26-8bac-c77c15dcb1d2.jpg",
        },
    ],
    titulares: [],
    suplentes: [],
};

/**
 * Store funciona como el lugar de almacenamiento de nuestra informacion. createStore params:
 * reducer -> es una funcion pura encargada de hacer los cambios en la app. La funcion reducer recibe 2 parametros
 *      param1: actual state -> el estado actual significa el como yo tengo almacenada la data en la app actualmente.
 *                      Para nuestro ejemplo, declaramos el valor inicial de nuestro state será el objeto initialState
 *      param2: action -> es un objeto que indica que cambios debemos realizar en el estado de la app. el reducer lee la accion
 *                        que se le pasa y en base a dicha accion podremos modificar el estado. Luego de modificar el estado podremos
 *                        retornar un nuevo estado.
 */
function reducerEntrenador(state = initialState, action){
    
    /**
     * recibimos la acción pero debemos validar el tipo es decir, elnombre de la accion
     */
    if(action.type === 'AGREGAR_TITULAR'){
        //Agregamos al jugador al arreglo titulares. Para ello retornamos un nuevo objeto 
        return{
            //este objeto llevará lo que ya contiene el state
            ...state,
            //Primero, titulares sera igual a lo ya contiene titulares y lo concatenamos con el objeto que viene del action
            titulares: state.titulares.concat(action.jugador),
            //validamos que el jugador seleccionado ya no pueda ser incluido nuevamente dentro de titulares
            //filtramos el array jugadores para que solo conserve los jugadores que no sean igual al jugador que viene del action
            jugadores: state.jugadores.filter(jugador => jugador.id !== action.jugador.id)
        }
    }

    if(action.type === 'AGREGAR_SUPLENTE'){
        return{
            ...state,
            suplentes: state.suplentes.concat(action.jugador),
            jugadores: state.jugadores.filter(jugador => jugador.id !== action.jugador.id)
        }
    }

    if(action.type === 'QUITAR_TITULAR'){
        return{
            ...state,
            titulares: state.titulares.filter(jugador => jugador.id !== action.jugador.id),
            //le pasamos el jugador que sale de titular para el array de jugadores disponibles
            jugadores: state.jugadores.concat(action.jugador)
        }
    }

    if(action.type === 'QUITAR_SUPLENTE'){
        return{
            ...state,
            suplentes: state.suplentes.filter(jugador => jugador.id !== action.jugador.id),
            //le pasamos el jugador que sale de suplente para el array de jugadores disponibles
            jugadores: state.jugadores.concat(action.jugador)
        }
    }

    return state;
}

 export default createStore(reducerEntrenador)