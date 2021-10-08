import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Buscador() {

    const [post, setPost] = useState([])

    const [buscar, setBuscar] = useState('')

    const search = (event) => {
        setBuscar(event.target.value)

    }

    useEffect(() => {
        if (buscar !== '') {
            const axiosPost = async () => {
                const response = await axios(`http://localhost:3002/api/search/${buscar}`);
                setPost(response.data)
            }
            axiosPost();
        }
    }, [search])

    useEffect(() => {
        const axiosPost = async () => {
            const response = await axios('http://localhost:3002/api/get');
            setPost(response.data)
        }
        axiosPost();
    }, [])

    const presupuestos = post.map((presupuesto) =>
        <Link to={"/Presupuesto"+ presupuesto.ID} className="enlaceList">
            <div className="row fila">
                <div className="col-sm-1">{presupuesto.ID}</div>
                <div className="col-sm-3">{presupuesto.Cliente}</div>
                <div className="col-sm-4">{presupuesto.Direccion}</div>
                <div className="col-sm-4">{presupuesto.Datos_Presupuesto}</div>
            </div>
        </Link>
    )

    return (
        <div className="container  mt-3">
            <h1 className="mb-4 title">Buscar Presupuesto</h1>
            <input className="form-control mb-3" type="text" placeholder="Buscar por cliente o dirección..." onChange={search} name="buscar" />
            <div className="lista container">
                <div className="row  tituloFila">
                    <div className="col-sm-1 th">ID</div>
                    <div className="col-sm-3 th">Cliente</div>
                    <div className="col-sm-4 th">Dirección</div>
                    <div className="col-sm-4 th">Datos</div>
                </div>
                {presupuestos}
            </div>
        </div>

    )
}

export default Buscador
