const child = require("child_process");
const yargs = require("yargs");

const key = 123;

const argv = yargs.command(
    "imagen",
    "Imagen en blanco y negro",
    {
        key: {
            describe: "Contraseña de acceso",
            demand: true,
            alias: "k"
        }
    },
    (args) => {
        if (args.key == key){
        child.exec('node server.js', (err, stdout) => {
            err ? console.log(err) : console.log(stdout)
            console.log("Credenciales correctas")
        })
      }  
        else {
            console.log("Credenciales incorrectas")
        }
    }
).help().argv