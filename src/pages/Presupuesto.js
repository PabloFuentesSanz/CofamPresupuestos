import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


function Presupuesto() {


    const [datos, setDatos] = useState({
        cliente: '',
        direccion: '',
        cp: '',
        telefono: '',
        mail: '',
        fecha: '',
        necesidades: '',
        trabajos: '',
        tiempoInicio: '',
        timepoFin: '',
        garantia: '',
        alfirmar: '0%',
        alempezar: '0%',
        alfinalizar: '100%',
        importe: '',
        tipo: '',
        total: '',
        nota: '',
    })

    const [post, setPost] = useState([])
    const [trabajos, setTrabajos] = useState([])
    const { id } = useParams();



    const handleInput = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        console.log(datos)
    }

    useEffect(() => {
        const axiosPost = async () => {
            const response = await axios('http://localhost:3002/api/getTrabajos');
            setTrabajos(response.data)
        }
        axiosPost();
    }, [])

    useEffect(() => {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

    });

    useEffect(() => {
        const axiosPost = async () => {
            const response = await axios('http://localhost:3002/api/getFromId/' + id);
            setPost(response.data[0])

        }
        if(id){
            axiosPost();
        }
    }, [])

    useEffect(() => {
        if (id) {

            if (post.Fecha) {
                setDatos({
                    ...datos,
                    ['fecha']: post.Fecha.split('/').reverse().join('-')
                })
            }
            if (post.Trabajos_Realizar) {
                document.getElementById("div_editor1").getElementsByTagName("rte-content")[0].firstChild.contentDocument.firstChild.lastChild.innerHTML = post.Trabajos_Realizar
                
            }
            if (post.Nota2) {
                document.getElementById("div_editor2").getElementsByTagName("rte-content")[0].firstChild.contentDocument.firstChild.lastChild.innerHTML = post.Nota2
            }
        }

    }, [post])

    const trabajosMap = trabajos.map((trabajo) =>
        <option value={trabajo.Nombre}>
            {trabajo.Nombre}
        </option>

    )
    

    const submitForm = (event) =>{
        event.preventDefault();
        document.getElementById("editor1").value = document.getElementById("div_editor1").getElementsByTagName("rte-content")[0].firstChild.contentDocument.firstChild.lastChild.innerHTML;
        document.getElementById("form1").submit();
    }


    return (
        <div className="container mt-3">

            <h1 className="mb-4">Nuevo Presupuesto</h1>
            <Form id="form1" action="http://localhost:3002/api/savePresupuesto" method="POST">
                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Cliente:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nombre del cliente" name="cliente" onChange={handleInput} defaultValue={id ? post.Cliente : ''} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Dirección:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="C/ Ejemplo nº 2" name="direccion" onChange={handleInput} defaultValue={id ? post.Direccion : ''} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        CP y Ciudad:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="28053 / Madrid" name="cp" onChange={handleInput} defaultValue={id ? post.Localidad : ''} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Teléfono:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="+34 638781148" name="telefono" onChange={handleInput} defaultValue={id ? post.Telefono : ''} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        E-mail:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="ejemplo@ejemplo.com" name="mail" onChange={handleInput} defaultValue={id ? post.email : ''} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Fecha:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" name="fecha" onChange={handleInput} defaultValue={id ? datos.fecha : ''} />
                    </Col>
                </Form.Group>
                <p>De acuerdo a sus necesidades, les detallamos a continuación el siguiente presupuesto:</p>
                <FloatingLabel as={Row} controlId="" className="mb-3" >
                    <Col sm="12">
                        <Form.Control

                            as="textarea"
                            style={{ height: '150px' }}
                            name="necesidades" onChange={handleInput}
                            defaultValue={id ? post.Datos_Presupuesto : ''}
                        />
                    </Col>
                </FloatingLabel>
                <Form.Label>Trabajos a realizar:</Form.Label>
                <Form.Select defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Seleccione los trabajos</option>
                    {trabajosMap}
                </Form.Select>
                <input type="hidden" id="editor1" name="trabajos"/>
                <div id="div_editor1">

                </div> 

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Tiempo de Ejecución:
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="text" name="tiempoInicio" onChange={handleInput} defaultValue={id ? post.Tiempo_Ejecucion : ''} />
                    </Col>
                    días
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Garantía:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" defaultValue={id ? post.Garantia : ''} name="garantia" onChange={handleInput} />
                    </Col>
                    <Col sm="2">
                        <p>años</p>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Al Firmar:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" name="alfirmar" onChange={handleInput} defaultValue={id ? post.Firmar : '0%'} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Al Empezar:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" defaultValue={id ? post.Empezar : '0%'} name="alempezar" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Al Finalizar:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" defaultValue={id ? post.Finalizar : '100%'} name="alfinalizar" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Importe:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="number" name="importe" onChange={handleInput} defaultValue={id ? post.Importe : ''} />
                    </Col>
                    <Col sm="2">
                        <Form.Select aria-label="Default select example" name="tipo" onChange={handleInput}  >
                            <option value="Pendiente">Pendiente</option>
                            <option value="General (21%)">General 21%</option>
                            <option value="Reducido (10%)">Reducido 10%</option>
                        </Form.Select>
                    </Col>
                    €
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Total:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" disabled name="total" onChange={handleInput} defaultValue={id ? post.Total : ''} />
                    </Col>
                </Form.Group>
                <Form.Label>Nota adicional:</Form.Label>
                <div id="div_editor2"></div>

                <Button variant="primary" type="submit" className="mb-5 mx-4 mt-3">
                    Generar y Guardar Nuevo Presupuesto
                </Button>
                <Button variant="primary"  onClick={submitForm} className="mb-5 mt-3">
                    Guardar
                </Button>
            </Form>
        </div>
    )
}

export default Presupuesto