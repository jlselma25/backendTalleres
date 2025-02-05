const { Router } = require('express');
const { obtenerVersion,crearVersion,eliminarVersion,LoginUsuario,ComprobarUsuario} = require('../controllers/versiones');


const router = Router();


router.get('/LoginUsuario/', LoginUsuario );
router.get('/ComprobarUsuario/', ComprobarUsuario );
router.get('/:version', obtenerVersion );
router.post('/new', crearVersion);
router.delete('/borrar/:id', eliminarVersion);
//router.get('/:version/:id', obtenerVersion);


module.exports = router;