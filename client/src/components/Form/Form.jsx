import React, { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPokemon, getLasCreated, getTypes, getPokemons, cleanForm } from "../../redux/actions/actions.js"
import Card from "../Card/Card.jsx"
import estilos from "../../estilos/Form/Form.module.css"
import { Link } from "react-router-dom"

export default function Form(){
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        return () => {
            dispatch(cleanForm())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pokemonCreado = useSelector(state => state.pokemonbyname)
    const pokemon = useSelector(state => state.pokemonC)
    const pokemons = useSelector(state => state.pokemons)
    const tipos = useSelector(state => state.types)

    const [creado, setCreado] = useState({})
    const [names, setNames] = useState([])

    useEffect(() => {
        dispatch(getPokemons())
        setCreado(() => pokemonCreado)
    }, [dispatch, pokemonCreado])


    const [input, setInput] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        image: "",
        height: 0,
        weight: 0,
        types: []
       
    })

    const [errors, setErrors] = useState({})


    const handleClickBack = () => {
        dispatch(getTypes())
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value.toLowerCase()
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    
    function hanldeChangeType(e) {
        var selected = [];
        for (let option of document.getElementById('types').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setInput({
            ...input,
            types: selected,
        })
        // verifica cada cambio del input
        setErrors(validateInput({
            ...input,
            types: selected
        }))
    }

    const handleSubmitC = (e) => {
        e.preventDefault()
        Object.keys(validateInput(input)).length 
        // Si hay errores le pido que la revise
        ? alert("Please check the information!")
        // hay errores y el nombre no existe
        : !Object.keys(validateInput(input)).length  && !names.find(obj => obj.name.toLowerCase() === input.name.toLowerCase())
        //dipatch y reseteo inputs
        ? dispatch(createPokemon(input)) && setInput({
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            image: "",
            height: 0,
            weight: 0,
            types: []
        })
        : alert(`${input.name} already exists!`)


        // names.some(obj => obj.name.toLowerCase() === input.name.toLowerCase()) 
        // ? alert("El nombre ingresado ya existe")
        // : dispatch(createPokemon(input))
  
    }

    const handleBlur = () => {
        // dispatch(getPokemons())
        setNames(() =>  pokemons)
        dispatch(cleanForm())
    }

    const handleGetPokemon = () => {
        dispatch(getLasCreated(pokemon.nombre))
    }

    return (
        <>
        <div className={estilos.header}>
            <Link to={"/home"} className={estilos.Link}><button onClick={handleClickBack} className={estilos.BackButton}>GO HOME</button></Link>
            <h1 className={estilos.title}>CrEaTe PoKéMoN:</h1>
        </div>
        <div className={estilos.Padre}>
            <div className={estilos.ContenedorForm}>
            <div className={estilos.Form}>
            <form onSubmit={handleSubmitC} autoComplete="off">
        <div className={estilos.First}>
            <div className={ errors.name ? estilos.warning :estilos.DivInput}>
            {/* INPUT NAME */}
            <label className={estilos.Label}>* Name:</label>
        
            <input  className={estilos.InputFormName} type="text" name="name" placeholder="Please enter a name..." value={input.name} onChange={handleChange} onBlur={handleBlur} required></input>
            {
                errors.name ? <p>{errors.name}</p> : <p>ㅤ</p>         
            }
            </div>
            </div>
            <div className={estilos.Second}>
            <div className={errors.hp ? estilos.warning :estilos.DivInput}>
            {/* INPUT HP */}
            <label className={estilos.Label}>* Health:</label>
            <input className={estilos.InputForm} type="number" name="hp" value={input.hp}  onChange={handleChange} required></input>
            {
                errors.hp ? <p>{errors.hp}</p> : <p>ㅤ</p>         
            }
            </div>
            <div className={ errors.attack ? estilos.warning :estilos.DivInput}>
            {/* INPUT ATTACK */}
            <label className={estilos.Label}>* Attack:</label>
            <input  className={estilos.InputForm} type="number" name="attack" value={input.attack} onChange={handleChange} required></input>
            {
                errors.attack ? <p>{errors.attack}</p> : <p>ㅤ</p>
            }
            </div>
            <div className={errors.defense ? estilos.warning :estilos.DivInput}>
            {/* INPUT DEFENSE */}
            <label className={estilos.Label}>* Defense:</label>
            <input className={estilos.InputForm} type="number" name="defense" value={input.defense}  onChange={handleChange} required></input>
            {
                errors.defense ? <p>{errors.defense}</p> : <p>ㅤ</p>
            }
            </div>
            </div>
            <div className={estilos.Third}>
            <div className={errors.speed ? estilos.warning :estilos.DivInput}>
            {/* INPUT SPEED */}
            <label className={estilos.Label}>* Speed:</label>
            <input className={estilos.InputForm} type="number" name="speed" value={input.speed}  onChange={handleChange} required></input>
            {
                errors.speed ? <p>{errors.speed}</p>: <p>ㅤ</p>
            }
            </div>
            <div className={errors.height ? estilos.warning :estilos.DivInput}>
            {/* INPUT HEIGHT */}
            <label className={estilos.Label}>* Height(cm):</label>
            <input className={estilos.InputForm} type="number" name="height" value={input.height}  onChange={handleChange} required></input>
            {
                errors.height ? <p>{errors.height}</p> : <p>ㅤ</p>
            }
            </div>
            <div className={errors.weight ? estilos.warning :estilos.DivInput}>
            {/* INPUT WEIGTH */}
            <label className={estilos.Label}>* Weight(kg):</label>
            <input className={estilos.InputForm} type="number" name="weight" value={input.weight}  onChange={handleChange} required></input>
            {
                errors.weight ? <p>{errors.weight}</p> : <p>ㅤ</p>
            }
            </div>
            </div>
            <div className={estilos.Four}>
            <div className={estilos.chooseSection}>
            <div className={errors.types ? estilos.warning :estilos.DivInput}>
            {/* INPUT TYPES */}
            <label className={estilos.Label}>* Choose a type: <b className={estilos.aclaraciones}>(ctrl + click)</b></label>
            <select className={estilos.SelectInput}
				id="types"
				name="types"
				multiple="multiple"
				onChange={(e) => hanldeChangeType(e)}>
				{
                    tipos.length ? tipos.map((t, i) => <option key={i} value={`${t}`}>{`${t}`}</option>) : false
                }
			</select>
            {
                errors.types ? <p className={estilos.errorType}>{errors.types}</p> : <p className={estilos.errorType}></p>
            }
            </div>
            </div>
            {/* INPUT IMAGE */}
            <div className={estilos.imageFormInput}>
             <label className={estilos.Label}>Image:</label>
            <input className={estilos.InputFormImage} type="text" name="image" value={input.image} placeholder="Please enter a .jpg or .png url..." onChange={handleChange}></input>
            </div>
            </div>
            <button type="submit" className={estilos.create}>CREATE</button>
            </form>
            </div>
            <div className={estilos.response}>
            {
                // muestra un boton para traer el pokemon junto al mensaje de que el mismo se creo
               pokemon.nombre && <div className={estilos.responseCard}><h1>{`Pokémon ${pokemon.nombre} creado con éxito!`}</h1><button onClick={handleGetPokemon} className={estilos.buttonGet}>{"GET POKÉMON"}</button></div>
            }
            {
                // muestra el pokemon creado
               creado && creado.name && <div className={estilos.responseCard}><Card key={creado.id * 100} {...creado}></Card> </div> 
            }
            </div>
            </div>
        </div>
        </>
    )
} 

// funcion validadora de los input del usuario
function validateInput(input){
    let errors = {};
    if(!input.name || !/^[a-zA-Z]+$/.test(input.name) || input.name.length > 11){
        errors.name = "The name is required and can only contain letters";
    }
    if(input.hp <= 0 ||input.hp > 100 || !/^[0-9]*$/g.test(input.hp)){
        errors.hp = "Health must be between 1 and 100";
    }
    if(input.attack <= 0 || input.attack > 300 || !/^[0-9]*$/g.test(input.attack)){
        errors.attack = "Attack must be between 1 and 300";
    }
    if(input.defense <= 0 || input.defense > 300 || !/^[0-9]*$/g.test(input.defense)){
        errors.defense = "Defense must be between 1 and 300";
    }
    if(input.speed <= 0 || input.speed > 200 || !/^[0-9]*$/g.test(input.speed)){
        errors.speed = "Speed must be between 1 and 200";
    }
    if(input.height <= 0 || input.height > 100 || !/^[0-9]*$/g.test(input.height)){
        errors.height = "Height must be between 1 and 100";
    }
    if(input.weight <= 0 || input.weight > 300 || !/^[0-9]*$/g.test(input.weight)){
        errors.weight = "Weight must be between 1 and 300";
    }
    if(!input.types.length || input.types.length > 3 ){
        errors.types = "You must choose at least 1 type, but no more than 3"
    }
    return errors
}

//image={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png"}




