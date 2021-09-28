import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState, useRef , useEffect} from 'react';
import Script from "react-load-script";




function NuevoPresupuesto() {

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


    const showGrantia = () => {
        if (datos.garantia === '') {
            setDatos({
                ...datos,
                garantia:
                    <>
                        <Col sm="2">
                            <Form.Control type="text" defaultValue="años" name="garantia" onChange={handleInput} />
                        </Col>
                    </>
            });
        } else {
            setDatos({ ...datos, garantia: '' });

        }
    }

    const handleInput = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        console.log(datos)
    }



    return (
        <div className="container mt-3">

            <div id="div_editor1"></div>
            <h1 className="mb-4">Nuevo presupuesto</h1>
            <Form action="http://localhost:3002/api/savePresupuesto" method="POST">
                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Cliente:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nombre del cliente" name="cliente" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Dirección:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="C/ Ejemplo nº 2" name="direccion" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        CP y Ciudad:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="28053 / Madrid" name="cp" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Teléfono:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="+34 638781148" name="telefono" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        E-mail:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="ejemplo@ejemplo.com" name="mail" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Fecha:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" name="fecha" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <FloatingLabel as={Row} controlId="" className="mb-3" >
                    <Col sm="12">
                        <Form.Control

                            as="textarea"
                            style={{ height: '150px' }}
                            name="necesidades" onChange={handleInput}
                        />
                    </Col>
                </FloatingLabel>
                <div id="editor"></div>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Tiempo de Ejecución:
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="number" placeholder="ejemplo@ejemplo.com" name="tiempoInicio" onChange={handleInput} />
                    </Col>
                    a
                    <Col sm="3">
                        <Form.Control type="number" placeholder="ejemplo@ejemplo.com" name="timpoFin" onChange={handleInput} />
                    </Col>
                    días
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Garantía:
                    </Form.Label>
                    <Col sm="1">
                        <Form.Check type="checkbox" onChange={showGrantia} />
                    </Col>
                    {datos.garantia}
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Al Firmar:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" defaultValue="0%" name="alfirmar" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Al Empezar:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" defaultValue="0%" name="alempezar" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Al Finalizar:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" defaultValue="100%" name="alfinalizar" onChange={handleInput} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Importe:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="number" name="importe" onChange={handleInput} />
                    </Col>
                    <Col sm="2">
                        <Form.Select aria-label="Default select example" name="tipo" onChange={handleInput}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="General 21%">General 21%</option>
                            <option value="Reducido 10%">Reducido 10%</option>
                        </Form.Select>
                    </Col>
                    €
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="">
                    <Form.Label column sm="2">
                        Total:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control type="text" disabled name="total" onChange={handleInput} />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-5 mx-4 mt-3">
                    Generar y Guardar Nuevo Presupuesto
                </Button>
                <Button variant="primary" type="submit" className="mb-5 mt-3">
                    Guardar
                </Button>
            </Form>
        </div>
    )
}

export default NuevoPresupuesto
