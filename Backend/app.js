const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
var cors = require("cors");
const neo4j = require("neo4j-driver");
const { query } = require("express");
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic("neo4j", "1234"));
const session = driver.session();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/getPlayers", function(req, res) {

  var nombre = req.body.nombre;
  var equipo = req.body.equipo;
  var edad = req.body.edad;
  var valor = req.body.valor;
  var puntuacion = req.body.puntuacion;
  var piernaBuena = req.body.piernaBuena;
  var posicion = req.body.posicion;
  var estiloDeJuego = req.body.estiloDeJuego;
  var queryResult = [];
  var contadorPropiedades = 0;
  /*console.log("nombre: "+nombre)
  console.log("equipo: "+equipo)
  console.log("edad: "+edad)
  console.log("puntuacion: "+puntuacion)
  console.log("piernaBuena: "+piernaBuena)
  console.log("posicion: "+posicion)
  console.log("estiloDeJuego: "+estiloDeJuego)*/
  
  var query = "MATCH (p:Player) ";

  //Si los campos han sido introducidos los buscamos con sus valores:
  if (nombre != "Cualquiera") {
    query = query.concat(" WHERE p.name = '" + nombre + "'");
    contadorPropiedades++;
  } 

  if (posicion != "Cualquiera" && contadorPropiedades == 0) {
    query = query.concat(" WHERE p.position = '" + posicion + "'");
    contadorPropiedades++;
  }else if( posicion != "Cualquiera" && contadorPropiedades != 0){
    query = query.concat(" AND p.position = '" + posicion + "'");
  }


  if (equipo != "Cualquiera" && contadorPropiedades == 0 ) {
    query = query.concat(" WHERE p.club = '" + equipo + "'");
    contadorPropiedades++;
  }else if( equipo != "Cualquiera" && contadorPropiedades != 0){
    query = query.concat(" AND p.club = '" + equipo + "'");
  }

  //Incluimos en la query la edad del jugador que buscamos (si es que se ha introducido)
  if (edad != "Cualquiera" && contadorPropiedades == 0 && edad.charAt(0) == '>') {
    edad = parseInt(edad.substring(1,edad.length));
    query = query.concat(" WHERE p.age > " + parseInt(edad));
    contadorPropiedades++;
  }else if( edad != "Cualquiera" && contadorPropiedades != 0 && edad.charAt(0) == '>'){
    edad = parseInt(edad.substring(1,edad.length));
    query = query.concat(" AND p.age > " + parseInt(edad));
  }else if( edad != "Cualquiera" && contadorPropiedades == 0 && edad.charAt(0) == '<'){
    edad = parseInt(edad.substring(1,edad.length));
    query = query.concat(" WHERE p.age < " + parseInt(edad));
    contadorPropiedades++;
  } else if( edad != "Cualquiera" && contadorPropiedades != 0 && edad.charAt(0) == '<'){
    edad = parseInt(edad.substring(1,edad.length));
    query = query.concat(" AND p.age < " + parseInt(edad));
  }else if( edad != "Cualquiera" && contadorPropiedades == 0 && edad.charAt(0) != '<' && edad.charAt(0) != '>'){
    query = query.concat(" WHERE p.age = " + parseInt(edad));
    contadorPropiedades++;
  }else if( edad != "Cualquiera" && contadorPropiedades != 0 && edad.charAt(0) != '<' && edad.charAt(0) != '>'){
    query = query.concat(" AND p.age = " + parseInt(edad));
  }

  //Incluimos en la query la puntuacion del jugador que buscamos (si es que se ha introducido)
  if (puntuacion != "Cualquiera" && contadorPropiedades == 0 && puntuacion.charAt(0) == '>') {
    puntuacion = parseInt(puntuacion.substring(1,puntuacion.length));
    query = query.concat(" WHERE p.overall > " + parseInt(puntuacion));
    contadorPropiedades++;
  }else if( puntuacion != "Cualquiera" && contadorPropiedades != 0 && puntuacion.charAt(0) == '>'){
    puntuacion = parseInt(puntuacion.substring(1,puntuacion.length));
    query = query.concat(" AND p.overall > " + parseInt(puntuacion));
  }else if( puntuacion != "Cualquiera" && contadorPropiedades == 0 && puntuacion.charAt(0) == '<'){
    puntuacion = parseInt(puntuacion.substring(1,puntuacion.length));
    query = query.concat(" WHERE p.overall < " + parseInt(puntuacion));
    contadorPropiedades++;
  }else if( puntuacion != "Cualquiera" && contadorPropiedades != 0 && puntuacion.charAt(0) == '<'){
    puntuacion = parseInt(puntuacion.substring(1,puntuacion.length));
    query = query.concat(" AND p.overall < " + parseInt(puntuacion));
  }else if( puntuacion != "Cualquiera" && contadorPropiedades == 0 && puntuacion.charAt(0) != '<' && puntuacion.charAt(0) != '>'){
    query = query.concat(" WHERE p.overall = " + parseInt(puntuacion));
    contadorPropiedades++;
  }else if( puntuacion != "Cualquiera" && contadorPropiedades != 0 && puntuacion.charAt(0) != '<' && puntuacion.charAt(0) != '>'){
    query = query.concat(" AND p.overall = " + parseInt(puntuacion));
  }


  if (piernaBuena != "Cualquiera" && contadorPropiedades == 0) {
    query = query.concat(" WHERE p.preferredFoot = '" + piernaBuena +"'");
    contadorPropiedades++;

  }else if( piernaBuena != "Cualquiera" && contadorPropiedades != 0){
    query = query.concat(" AND p.preferredFoot = '" + piernaBuena + "'");
  }
  
 

  
   //A partir de aqui nos centramos en el estilo de juego seleccionado

   //Si hay posicion introducida y estiloDeJuego = 'Creador de juego', quitamos la posicion añadida ya para que no crée conflicto posteriormente.
   if( posicion != 'Cualquiera' && estiloDeJuego == 'Creador de juego'){
    query = query.replace(" WHERE p.position = '" + posicion + "'", ' ' );

  }

  if (estiloDeJuego ==  'Destructor de juego' && contadorPropiedades == 0) {

    query = query.concat(" WHERE (p.interceptions > 70 AND p.position = 'CDM')");

  }else if(estiloDeJuego ==  'Destructor de juego' && contadorPropiedades != 0){
    query = query.concat(" AND (p.interceptions > 70 AND p.position = 'CDM')");    
  }
  
  
  if(estiloDeJuego ==  'Creador de juego' && contadorPropiedades == 0) {

    query = query.concat(" WHERE (p.ballControl > 70 AND  p.shortPassing > 70 AND p.longPassing > 70) "); 
    query = query.concat(" AND (p.position = 'LF' OR p.position = 'RF' OR p.position = 'LAM' OR p.position = 'CAM' OR p.position = 'RAM' OR p.position = 'LM' OR p.position = 'LCM' OR p.position = 'CM' OR p.position = 'RCM' OR p.position = 'RM')" );

  }else if(estiloDeJuego ==  'Creador de juego' && contadorPropiedades != 0 && posicion == 'Cualquiera'){
    query = query.concat(" AND (p.ballControl > 70 AND  p.shortPassing > 70 AND p.longPassing > 70) "); 
    query = query.concat(" AND (p.position = 'LF' OR p.position = 'RF' OR p.position = 'LAM' OR p.position = 'CAM' OR p.position = 'RAM' OR p.position = 'LM' OR p.position = 'LCM' OR p.position = 'CM' OR p.position = 'RCM' OR p.position = 'RM')" );
  
  }else if(estiloDeJuego ==  'Creador de juego' && contadorPropiedades == 1 && posicion != 'Cualquiera'){
    query = query.concat(" WHERE (p.ballControl > 70 AND  p.shortPassing > 70 AND p.longPassing > 70) "); 
    query = query.concat(" AND (p.position = 'LF' OR p.position = 'RF' OR p.position = 'LAM' OR p.position = 'CAM' OR p.position = 'RAM' OR p.position = 'LM' OR p.position = 'LCM' OR p.position = 'CM' OR p.position = 'RCM' OR p.position = 'RM')" );
  }
  
  
  if(estiloDeJuego ==  'Regateador' && contadorPropiedades == 0) {

    query = query.concat(" WHERE (p.dribbling > 80 AND p.skillMoves >= 4) ");

  }else if(estiloDeJuego ==  'Regateador' && contadorPropiedades != 0){
    query = query.concat(" AND (p.dribbling > 80 AND p.skillMoves >= 4) ");
  }
  
  
  if(estiloDeJuego ==  'Goleador' && contadorPropiedades == 0) {

    query = query.concat(" WHERE (p.finishing > 85) ");
  }else if(estiloDeJuego ==  'Goleador' && contadorPropiedades != 0){
    query = query.concat(" AND (p.finishing > 85) ");
  }

  //query = query.concat( " RETURN p ");
  query = query.concat( " RETURN p AS player ORDER BY p.overall DESC");
  console.log(query)
  contadorPropiedades = 0;


  const resultPromise = session.run(query).subscribe({
    onNext: function(record) {
      var element = record.get("player").properties;
      queryResult.push(element);     
    },
    onCompleted: function() {
      if (queryResult.length < 1) queryResult = [{ message: "Error" }];
      res.send(queryResult);
      // session.close();
    },
    onError: function(error) {
      console.log(error);
    }    
  });
  
});

app.listen(port, function() {
  console.log("App listening one port " + 3000);
});