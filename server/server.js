const express = require('express');
const db = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const htmlPdf = require('html-pdf')
const app = express();
const PORT = 3002;
var path = require('path');

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
    db.query("SELECT * FROM presupuestos WHERE id = " + id + "",
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
    db.query("SELECT * FROM presupuestos WHERE Cliente like '%" + data + "%' OR direccion like '%" + data + "%' ORDER BY id DESC",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        });
});

app.post("/api/deleteFromId/:id", (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM presupuestos WHERE id = " + id + "",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result);
        });
});

const GeneratePdf = (id, fecha, cliente, direccion, cp, telefono, mail, necesidades, trabajos, tiempo, importe, tipo, total, estado, garantia, alfirmar, alempezar, alfinalizar, nota, title) => {
    let imgSrc = 'file://' + __dirname + '/Logo.png';
    imgSrc = path.normalize(imgSrc);
    console.log(imgSrc)
    try {
        const htmlToPdfOptions = {
            "type": "PDF",
            "format": "A4",
            "renderDelay": "10",
            "margin": "0cm",
            "border": "0",
        }

        const htmlContent = `
        <html>
            <head>
            <style>

                body{
                    font-family: Calibri;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                
                .datos{
                    float:left;
                    color:#243841;
                    padding-top:5px;
                    padding-left:3px;
                    border: 2px solid #92D050;
                    width:60%;
                    margin-left: 20px;
                }

                .info{
                    z-index:1000;
                    float:right;
                    background-color: #92D050;
                    color:white;
                    font-size:17px;
                    text-align:center;
                    padding-top:-10px;
                    padding-bottom:10px;
                    width:23%;
                    height:80px;
                    margin-right: 20px;
                    margin-top: 15px;
                }

                .miparrafo {
                    margin: 7px;
                }

                .presu{
                    width:100%; 
                    display: inline-block;
                    color:#243841;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    text-align:center;
                }

                .trabajos{
                    display:block;
                    width:90%;
                    font-size:13px;
                    line-height: 1.8;
		            text-align: justify;
                    padding-right: 20px;
                    margin: 0px 60px 0px 50px;
                }
                .importe{
                    border: 2px solid #243841;
                }

                .azul{
                    text-align:center;
                    width:100%;
                    height:20px;
                    background-color:  #243841;
                    color:white;
                    font-weight:bold;
                }

   
                table{
                    padding:0px;
                    width:93%;
                    margin: auto;
                    border: 1px solid #243841;
                    text-align:center;
                }

                tr{
                    border: 1px solid #243841;

                }


                .textHeader{
                    color: #243841;
                    text-align:center;
                    display: inline-block;
                    width:50%;
                }

                .imgIzq{
                    display: inline-block;
                    width:24%;

                }

                .imgDer{
                    display: inline-block;
                    width:24%;
                }

            </style>
            </head>
            <body>
                <div id="pageHeader" >
                        <span class="imgIzq">
                            <img src="https://pbs.twimg.com/profile_images/3573701444/7ca0713f9433117a555c6f5675ee13c3_400x400.jpeg" width="100" height="100" style="margin-left:70px;">
                        </span>

                        <span class="textHeader">
                            <h2 style="margin:0; padding:0;">TEJADOS COFAM Madrid</h2>
                            <p style="margin:0; padding:0;">Técnicos en Tejados y Cubiertas</p>
                            <p style="margin:0; margin-top:10px; padding:0;">637 902 421 / 677 858 937</p>
                            <p style="margin:0; padding:0;">info@tejados-cofam.es | www.tejados-cofam.es</p>

                        </span>
                        <span class="imgDer">
                            Nº de Presupuesto: ${id}
                        </span>

                </div>
                
                <div class='datos'>
                    <p class='miparrafo'><span style='font-weight:bold'>Cliente: </span>${cliente}</p>
                    <p class='miparrafo'><span style='font-weight:bold'>Dirección: </span>${direccion}, ${cp}</p>
                    <p class='miparrafo'><span style='font-weight:bold'>Tel.: </span>${telefono}</p>
                    <p class='miparrafo'><span style='font-weight:bold; '>e-mail: </span>${mail}</p>
                </div>
                    
                <div class='info'>
                    <p >Presupuesto: <span style='font-weight:bold'>${id}</span> </p>
                    <p >Fecha: <span style='font-weight:bold'>${fecha}</span></p>
                </div>  
                <br>
                <div class='presu'>
                    <p class='miparrafo'>De acuerdo a sus necesidades, les detallamos a continuación el siguiente presupuesto:</p>
                    <p class='miparrafo' style='font-weight:bold; font-size:18px;' >${necesidades}</p>
                </div>
                <div class='azul'>TRABAJOS A REALIZAR</div>
                <div class='trabajos'>
                    ${trabajos}
                </div> 
                <div class='trabajos'>
                    ${nota}
                </div>
                 <table style='padding:20px; page-break-before:always;' >
                    ${garantia ? "<tr><td style='text-align:justify; font-size:13px;'><span style='font-weight:bold; text-align:justify;'>NOTA:</span> Nosotros damos una garantía de " + garantia + ", pero no la damos para que el cliente lo vea nada más, sino porque estamos seguros de la eficacia de nuestro trabajo.<br><br><hr><br><br></td></tr></tr>" : ""}               
                    <tr >
                        <td>TIEMPO DE EJECUCIÓN: ${tiempo}<br><br><br><br></td>
                    </tr>
                    <tr style='text-align:left'>
                        <td style='text-align:left; font-size:13px; '>
                            <span style='font-weight:bold'>EN EL PRESENTE PRESUPUESTO NO ESTA INCLUIDO:</span><br>
                            <ul>
                                <li>LICENCIAS Y PERMISOS DE TRABAJO</li>
                                <li>EL GASTO DE LA LUZ Y EL AGUA</li>
                                <li>IVA CORESPONDIENTE </li>
                            </ul>
                            <br><br>
                        </td>
                    </tr>
                    <tr style='text-align:left'>
                        <td style='text-align:left; font-size:13px; '>
                            <span style='font-weight:bold'>Nuestra empresa dispone de:</span><br>
                            <ul>
                                <li>Seguro de Responsabilidad Civil con Allianz con una cobertura de hasta 900.000€ </li>
                                <li>Registro de empresas acreditadas.</li>
                                <li>Cursos PRL con diplomas acreditados de 8 y 20 horas.</li>
                                <li>Reconocimientos médicos</li>
                                <li>Alta en Seguridad Social</li>
                            </ul>
                            <br><br>
                        </td>
                    </tr>      
                </table>
                
                 <table cellspacing=0>
                    <tr style='text-align:center;'>
                        <td style='width:50%; font-weight:bold;'></td>
                        <td style='width:16.5%;font-size:16px; '>IMPORTE (€)</td>
                        <td style='width:16.5%; font-size:16px;'>IVA</td>
                        <td style='width:16.5%; font-size:16px;'>TOTAL (€)</td>
                  </tr>
                  <tr style='text-align:center;'>
                        <td style='width:50%; '></td>
                        <td style='padding:10px; margin:10px;width:16.5%;font-size:16px;font-weight:bold'>${importe}</td>
                        <td style='width:16.5%;font-size:16px;font-weight:bold;'>${tipo}</td>
                        <td style='width:16.5%;font-size:16px;font-weight:bold;'>${total}</td>
                  </tr>
                </table>
                <table cellspacing=0  style='font-size:12px; border-color:white; margin-top:25px; padding:5px;'>
                    <tr style='text-align:left'>
                        <td style='text-align:left;border:1px solid #243841;padding:5px;'>
                            <span style='font-weight:bold'>Validez del Presupuesto:</span><br>
                        </td>
                        <td style='text-align:left;border:1px solid #243841;padding:5px;'>30 días</td>
                        <td style='text-align:center'>Cualquier duda, llámenos: (ES) 637 902 421</td>
                    </tr>
                    ${garantia ? "<tr style='text-align:left'><td style='text-align:left; border:1px solid #243841;padding:5px;'><span style='font-weight:bold'>Garantía:</span><br></td><td style='text-align:left;border:1px solid #243841;padding:5px;'>" + garantia + "</td></tr>" : ""}
                    <tr style='text-align:left'>
                            <td style='text-align:left; width:20%;border:1px solid #243841;padding:5px;'>
                                <span style='font-weight:bold'>Forma de Pago:</span><br>
                            </td>
                            <td style='text-align:left; width:30%;border:1px solid #243841;padding:5px;' >
                                <span>${alfirmar} al firmar el presupuesto</span><br>
                                <span>${alempezar} a la hora de empezar</span><br>
                                <span>${alfinalizar} al finalizar los trabajos</span><br>
                            </td>
                            <td style='text-align:center; width:50%;'>
                                <span style='font-weight:bold'>Cualquier trabajo no adjuntado a este escrito, será presupuestado por separado.</span>   
                            </td>
                            <td></td>
                    </tr>
                </table>
        
        `


        htmlPdf.create(htmlContent, htmlToPdfOptions).toFile("C:/Users/Pablo/Documents/PDF_COFAM/" + title, function (err, result) {
            if (err) return console.log(err);
            console.log(result);
        })
    } catch (error) {
        console.log(error);
    }
}

app.post("/api/savePresupuesto", (req, res) => {
    const fecha = req.body.fecha;
    const cliente = req.body.cliente;
    const direccion = req.body.direccion;
    const cp = req.body.cp;
    const telefono = req.body.telefono;
    const mail = req.body.mail;
    const necesidades = req.body.necesidades;
    const trabajos = req.body.trabajos;
    const tiempo = req.body.tiempoInicio;
    const importe = req.body.importe;
    const tipo = req.body.tipo;
    const total = req.body.totalImp;
    const estado = '';
    const garantia = req.body.garantia;
    const alfirmar = req.body.alfirmar;
    const alempezar = req.body.alempezar;
    const alfinalizar = req.body.alfinalizar;
    const nota = req.body.nota;

    db.query("INSERT INTO `presupuestos` (`ID`, `Fecha`, `Cliente`, `Direccion`, `Localidad`, `Telefono`, `email`, `Datos_Presupuesto`, `Trabajos_Realizar`, `Tiempo_Ejecucion`, `Importe`, `Tipo_IVA`, `Total`, `estado`, `Garantia`, `Firmar`, `Empezar`, `Finalizar`, `Nota2`) VALUES (NULL, '" + fecha + "', '" + cliente + "', '" + direccion + "', '" + cp + "', '" + telefono + "', '" + mail + "', '" + necesidades + "', '" + trabajos + "', '" + tiempo + "', " + importe + ", '" + tipo + "', " + total + ", '" + estado + "', '" + garantia + "', '" + alfirmar + "', '" + alempezar + "', '" + alfinalizar + "', '" + nota + "' )",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            db.query("SELECT MAX(ID) as id FROM presupuestos",
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                let id = result[0].id
                const title = id + "_" + fecha + "_" + cliente + ".pdf" // Añadir numero aleatorio o ID
                GeneratePdf(id, fecha, cliente, direccion, cp, telefono, mail, necesidades, trabajos, tiempo, importe, tipo, total, estado, garantia, alfirmar, alempezar, alfinalizar, nota, title)
                res.redirect('http://localhost:3000/Buscador')
            });    
        });
});



app.post("/api/updatePresupuesto", (req, res) => {
    const id = req.body.id;
    const fecha = req.body.fecha;
    const cliente = req.body.cliente;
    const direccion = req.body.direccion;
    const cp = req.body.cp;
    const telefono = req.body.telefono;
    const mail = req.body.mail;
    const necesidades = req.body.necesidades;
    const trabajos = req.body.trabajos;
    const tiempo = req.body.tiempoInicio;
    const importe = req.body.importe;
    const tipo = req.body.tipo;
    const total = req.body.totalImp;
    const estado = '';
    const garantia = req.body.garantia;
    const alfirmar = req.body.alfirmar;
    const alempezar = req.body.alempezar;
    const alfinalizar = req.body.alfinalizar;
    const nota = req.body.nota;

    db.query(`UPDATE  presupuestos SET Fecha = '${fecha}', Cliente = '${cliente}', Direccion = '${direccion}', Localidad = '${cp}', Telefono = '${telefono}', email = '${mail}', Datos_Presupuesto =  '${necesidades}', Trabajos_Realizar =  '${trabajos}', Tiempo_Ejecucion =  '${tiempo }' , Importe =  '${importe}', Tipo_IVA = '${tipo}', Total =  '${total}', estado =  '${estado}', Garantia =  '${garantia}', Firmar = '${alfirmar}', Empezar =  '${alempezar}', Finalizar =  '${alfinalizar}', Nota2 =  '${nota }' WHERE id = ${id} `,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            const title = id + "_" + fecha + "_" + cliente + ".pdf" // Añadir numero aleatorio o ID

            GeneratePdf(id, fecha, cliente, direccion, cp, telefono, mail, necesidades, trabajos, tiempo, importe, tipo, total, estado, garantia, alfirmar, alempezar, alfinalizar, nota, title)
            res.redirect('http://localhost:3000/Buscador')
        });

});





app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})