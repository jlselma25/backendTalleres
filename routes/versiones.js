const { Router } = require('express');
const { obtenerVersion,crearVersion,eliminarVersion,LoginUsuario,ComprobarUsuario,CambiarContrasena} = require('../controllers/versiones');


const router = Router();


router.get('/LoginUsuario/', LoginUsuario );
router.get('/ComprobarUsuario/', ComprobarUsuario );
router.get('/CambiarContrasena/', CambiarContrasena );
router.get('/:version', obtenerVersion );
router.post('/new', crearVersion);
router.delete('/borrar/:id', eliminarVersion);
//router.get('/:version/:id', obtenerVersion);


module.exports = router;