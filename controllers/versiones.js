const { response } = require('express');
const Version = require('../models/version');
const { executeQuery } = require('../database/operations');
const { generarJWT } = require('../helpers/jwt');



const versiones = [
    new Version(1, "Versión Inicial"),
    new Version(2, "Versión Beta"),
    new Version(3, "Versión Estable")
];


ComprobarUsuario = async(req, res = response ) => {
  
  const { id } = req.query; 
 
  if (id == -1){

    return res.json({
      Dni: '',
      Nombre:'',
      Password:'',
      id:-1 });
  }else{
    const query = "SELECT Id,Nombre,Password, Dni,usuario, primeravez_app FROM Empleados WHERE id =" + id;
    const data = await executeQuery(query);  

    res.json(data);
  }  

}


async function esJornadaIntensiva(fecha) {
  let resultado = false;
  const sql = `SELECT jintensiva FROM tramo_horario WHERE desde <= ? AND hasta >= ? AND empresa = 15`;

  try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute(sql, [fecha, fecha]);

      if (rows.length > 0) {
          resultado = Boolean(rows[0].jintensiva);
      }

      await connection.end();
  } catch (error) {
      console.error('Error en la consulta:', error);
  }

  return resultado;
}

GuardarPicajes= async (req, res = response) => {
  esJornadaIntensiva('2024-02-08').then(resultado => {
    console.log('¿Es jornada intensiva?', resultado);
});
}


LoginUsuario = async(req, res = response ) => {

  //const { dni} = req.params;
  //const { pass} = req.params;

  const { dni, pass } = req.query; 
 
  const query = "SELECT Id,Nombre,Password, Dni,usuario,primeravez_app FROM Empleados WHERE usuario ='" + dni + "'";

 
  const data = await executeQuery(query);  

  // const filteredData = data.map(item => ({
  //   id: item.Id,
  //   Nombre: item.Nombre,
  //   Password: item.Password,
  //   Dni: item.Dni
  // }));


 
  res.json(data);
}



CambiarContrasena = async(req, res = response ) => {

  //const { dni} = req.params;
  //const { pass} = req.params;

  const { id_empleado,nueva,anterior } = req.query; 

  var resultado ;

 
 console.log(id_empleado);
 console.log(nueva);
 console.log(anterior);





 const query =  "UPDATE empleados set password='" + nueva + "', primeravez_app='false' where id= " + id_empleado + " and password='" + anterior + "'";
 console.log(query);
 
  try{
    const data = await executeQuery(query);  
     resultado = "1";
  }

  catch {
    resultado = "2";
  }
  

 

  // const filteredData = data.map(item => ({
  //   id: item.Id,
  //   Nombre: item.Nombre,
  //   Password: item.Password,
  //   Dni: item.Dni
  // }));


 
  res.json(resultado);
}



obtenerVersiones = async(req, res = response ) => {

  //  res.send('¡Adios, mundoooooooo!');
  const query = 'SELECT * FROM versiones';
  const data = await executeQuery(query);
    res.json(data);
}

obtenerVersion = async(req, res = response ) => {

  //  res.send('¡Adios, mundoooooooo!');
  const { version} = req.params;
  
  const query = 'SELECT * FROM versiones WHERE id =' + version;
  const data = await executeQuery(query);
    res.json(data);
}

crearVersion = async (req, res = response) => {
  const { version, cambios, fecha,android, csharp } = req.body; // Obtener los datos del cuerpo de la solicitud

//   // Verificar que ambos parámetros estén presentes
  if (!version || !cambios) {
      return res.status(400).json({ error: 'Número y nombre son obligatorios' });
  }
  const query = "INSERT INTO versiones (version,cambios,fecha,android,csharp) VALUES ('" + version +  "','" + cambios + "','" + fecha + "','" + android + "','" + csharp +  "')";
 
 
 await executeQuery(query);
 res.send('OK');
}


eliminarVersion = async(req, res = response ) => {

  //  res.send('¡Adios, mundoooooooo!');
  const { id } = req.params;
  
  const query = 'DELETE FROM versiones WHERE id =' + id;
  const data = await executeQuery(query);
  res.send('Version eliminada correctamente');
}


module.exports = {  
   obtenerVersion,
   crearVersion,
   eliminarVersion,
   LoginUsuario,
   ComprobarUsuario,
   CambiarContrasena
}