const express = require('express');
const db = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())

// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM presupuestos ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {

    const id = req.params.id;
    db.query("SELECT * FROM presupuestos WHERE id = "+id+"",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.get("/api/getTrabajos", (req, res) => {
    db.query("SELECT * FROM trabajos", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.get("/api/search/:data", (req, res) => {

    let data = req.params.data.replace("'", "");
    db.query("SELECT * FROM presupuestos WHERE Cliente like '%"+data+"%' OR direccion like '%"+data+"%' ORDER BY id DESC",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.post("/api/savePresupuesto", (req, res) => {
    const fecha = req.body.fecha;
    const cliente = req.body.cliente;
    const direccion = req.body.direccion;
    const cp = req.body.cp;
    const telefono = req.body.telefono;
    const mail = req.body.mail;
    const necesidades = req.body.necesidades;
    const trabajos =  req.body.trabajos;
    const tiempo = req.body.tiempoInicio;
    const importe = req.body.importe;
    const tipo = req.body.tipo;
    const total = 0.0;
    const estado = '';
    const garantia = '';
    const alfirmar = req.body.alfirmar;
    const alempezar = req.body.alempezar;
    const alfinalizar = req.body.alfinalizar;
    const nota = '';
    db.query("INSERT INTO `presupuestos` (`ID`, `Fecha`, `Cliente`, `Direccion`, `Localidad`, `Telefono`, `email`, `Datos_Presupuesto`, `Trabajos_Realizar`, `Tiempo_Ejecucion`, `Importe`, `Tipo_IVA`, `Total`, `estado`, `Garantia`, `Firmar`, `Empezar`, `Finalizar`, `Nota2`) VALUES (NULL, '" + fecha + "', '" + cliente + "', '" + direccion + "', '" + cp + "', '" + telefono + "', '" + mail + "', '" + necesidades + "', '" + trabajos + "', '" + tiempo + "', " + importe + ", '" + tipo + "', " + total + ", '" + estado + "', '" + garantia + "', '" + alfirmar + "', '" + alempezar + "', '" + alfinalizar + "', '" + nota + "' )",
    (err, result) => {
        if (err) {
            console.log(err)
        }
        res.redirect('http://localhost:3000/Buscador')
    });

});



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})