// 1. El servidor debe ser levantado por instrucción de una aplicación Node que use el
// paquete Yargs para capturar los argumentos en la línea de comando. Se deberá
// ejecutar el comando para levantar el servidorsolosielvalordelapropiedad“key”es
// la correcta (123).(3 Puntos)
// 2. El servidor debe disponibilizar una ruta raíz que devuelva unHTMLconelformulario
// para el ingreso de la URL de la imagen a tratar.(2 Puntos)
// 3. Los estilos de este HTML deben ser definidos por un archivo CSS alojado en el
// servidor.(2 Puntos)
// 4. El formulario debe redirigir a otra ruta del servidor que deberá procesar la imagen
// tomada por la URL enviada del formulario con el paquete Jimp. La imagen debeser
// procesada en escaladegrises,concalidadaun60%yredimensionadaaunos350px
// de ancho. Posteriormente debe ser guardadaconnombre“newImg.jpg”ydevueltaal
// cliente.(3 Puntos)

const http = require("http");
const fs = require("fs");
const url = require("url");
const jimp = require("jimp");

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    
    if(req.url == ('/')){
        fs.readFile('formulario.html', 'utf8', (err, formulario) => {
            res.end(formulario)
        })
    }
    if (req.url == '/estilos'){
        res.writeHead(200, { 'Content-Type': 'text/css'})
        fs.readFile('estilos.css', (err, css) => {
            res.end(css)
        })
    }
    if (req.url.includes('/imagen')){
        const params = url.parse(req.url, true).query;
        jimp.read(params.imagenUrl, (err, imagen) => {
            imagen
            .resize(350, jimp.AUTO)
            .quality(60)
            .greyscale()
            .writeAsync('newImg.jpg')
            .then (() => {
                fs.readFile('newImg.jpg', (err, ImagenModificada) => {
                    res.writeHead(200, {
                        'Content-Type':'image/jpeg'})
                        res.end(ImagenModificada)
                })
            })      
        })
    }
}).listen(8080, () => console.log('Servidor Esperando'));