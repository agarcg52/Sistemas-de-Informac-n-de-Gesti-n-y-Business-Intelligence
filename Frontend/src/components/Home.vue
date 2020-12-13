<template>
  <v-app>
    <div id="AppBar" position="relative">
      <v-spacer></v-spacer>
      <v-app-bar color="blue" height="120px" dense dark>
        <div class="d-flex align-center">
          <v-img
            alt="Logo FIFA"
            class="shrink mr-2"
            contain
            src="@/assets/logofifa.jpg"
            transition="scale-transition"
            width="170"
            height="150px"
          />
          <v-toolbar-title justify-content:center>FIFAProAnalyzer</v-toolbar-title>
        </div>

        <v-spacer></v-spacer>
         <v-btn href="https://es.fifa.com/news/" rounded color="blue darken-2" dark style="margin-right: 50px">
            Últimas noticias en la FIFA
          </v-btn>
        
      </v-app-bar>
    </div>

    <div style="background-color: #ffffff">
      <div text-align="center" style="margin-left: 50px; margin-right: 50px">
        <br />
        Bienvenido a FIFAProAnalyzer!! Con nuestra innovadora aplicación serás capaz de encontrar
        al jugador ideal para tu equipo o, al menos, la mejor opción dentro del mercado 
        actual. Gracias a varios parámetros que nos deberás aportar, nuestro sistema te 
        recomendará un jugador en concreto. Esperamos que te sirva de ayuda!
        <br />
        <strong>Parámetros de búsqueda:</strong>
        <br />
        <br />


        <div id="parametros" style="float:left; margin-left: 50px">
          <div id="parametros" style="float:left; margin-left: 50px">
          </div>
          <!-- div para el textfield del equipo -->
          <div id="nombre" style="float:left; margin-right: 50px">
            <div><strong>Nombre</strong></div>
            <v-text-field v-model="jugador.nombre" label="Ej. Cristiano Ronaldo" outlined ></v-text-field>
          </div>
          
          <div id="equipo" style="float:left; margin-right: 50px">
            <div><strong>Equipo</strong></div>
            <v-text-field v-model="jugador.equipo" label="Ej. Juventus, RealMadrid, FCBarcelona"  outlined ></v-text-field>
          </div>
          
          <!-- div para el textfield de la edad -->
          <div id="edad" style="float:left; margin-right: 50px">
            <div><strong>Edad</strong></div>
            <v-text-field v-model="jugador.edad" label="Ej. 27, <29, >24"  outlined ></v-text-field>
          </div>
          
          <!-- div para el textfield del valor del jugador -->
          <div id="valor" style="float:left; margin-right: 50px">
            <div><strong>Valor del jugador</strong></div>
            <v-text-field v-model="jugador.valor" label="Ej. €15M, €116K"  outlined ></v-text-field>
          </div>

          <!-- div para el textfield de la puntuacion -->
          <div id="edad" style="float:left; margin-right: 50px">
            <div><strong>Puntuacion del jugador (0-100)</strong></div>
            <v-text-field v-model="jugador.puntuacion" label="Ej. 88, <78, >83"  outlined ></v-text-field>
          </div>

          <!-- div para el textfield de la Pierna buena -->
          <div id="edad" style="float:left; margin-right: 50px">
            <div><strong>Pierna buena</strong></div>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-combobox v-model="jugador.piernaBuena" :items="piernas" label="Seleccione la pierna buena" outlined dense ></v-combobox>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <!-- div para el textfield de la posicion -->
          <div id="edad" style="float:left; margin-right: 50px">
            <div><strong>Posición</strong></div>
            <v-container fluid >
              <v-row>
                <v-col cols="12">
                  <v-combobox v-model="jugador.posicion" :items="posiciones" label="Seleccione la posición aquí" outlined dense></v-combobox>
                </v-col>
              </v-row>
            </v-container>
          </div> 
        </div>
        <!-- div para el textfield del nombre -->
               
      </div>
    </div>

    
      <v-btn @click="send" rounded color="blue darken-2" dark style="float:centre; margin-left: 800px; margin-right: 800px">
            Buscar jugadores
      </v-btn>

      <div id="recomendaciones"  style="float:left; margin-left: 100px; margin-right: 100px; margin-top: 50px">
        <br />
        Si no tienes claro qué buscas, podemos ofrecerte algunos jugadores en función de su
        estilo de juego:
        <br />

        <!-- Botón para escoger tipo de jugador -->
        <v-row align="center" style="float:left; margin-top: 50px">
          <v-col cols="12">
            <v-select v-model="jugador.estiloDeJuego" :items="items" :menu-props="{ top: true, offsetY: true }" label="Escoge una de las siguientes opciones" color="blue darken-2"></v-select>
          </v-col>
        </v-row>
      </div>

    <div id="botonRecomendarJugador"  class="text-center" style="margin-bottom: 100px">
      <v-btn @click="recomiendaJugador" rounded color="blue darken-2" dark >¡ Recomiéndame al jugador ideal !</v-btn>
    </div>
    

    
    <div id="jugadoresEncontrados" style="float:left; margin-left: 50px; margin-right: 50px;">
      <div style="float:left; margin-left: 50px">  Jugadores encontrados según las características seleccionadas:</div>      
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(player, index) in this.playersBuscados" v-bind:key="parseInt(player.overall)">
            <v-card
              elevation="15"
              style="background: #00BCD4;
                      background: -webkit-linear-gradient(to right, #00BFA5, #64FFDA, white);
                      background: linear-gradient(to right,  #00BFA5, #64FFDA, white);"
            >
              <v-card-title>{{index + 1}}. {{player.name}}</v-card-title>
              <v-card-subtitle>
                Nombre: {{ player.name }}
                <br />
                Club: {{ String(player.club) }}
                <br />
                Edad: {{ String(player.age) }}
              </v-card-subtitle>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div id="jugadoresRecomendados" style="float:left; margin-left: 50px; margin-right: 50px;">      
      <div style="float:left; margin-left: 50px">  Jugadores recomendados para ti:</div>
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(player, index) in this.jugadoresRecomendados" v-bind:key="parseInt(player.overall)">
            <v-card
              elevation="18"
              style="background: #blue darken-2;
                      background: -webkit-linear-gradient(to right, #3F51B5, #2196F3, white);
                      background: linear-gradient(to right,  #3F51B5, #2196F3, white);"
            >
              <v-card-title>{{index + 1}}. {{player.name}}</v-card-title>
              <v-card-subtitle>
                Nombre: {{ player.name }}
                <br />
                Club: {{ String(player.club) }}
                <br />
                Edad: {{ String(player.age) }}
              </v-card-subtitle>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div id="piePagina" style="bottom">
      <v-footer dark padless >
      <v-card class="flex" flat tile>
               <v-card-text class="py-2 white--text text-center ">
          {{ new Date().getFullYear() }} —
          <strong
            >Curso 20/21 Sistemas de información de gestión y business inteligence<br />
            <v-bottom-sheet v-model="sheet" inset>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="orange" dark v-bind="attrs" v-on="on"
                  >Ayuda
                </v-btn>
              </template>
              <v-sheet class="text-center" height="200px">
                <v-btn class="mt-6" text color="blue darken-2" @click="sheet = !sheet">
                  Cerrar ventana
                </v-btn>
                <div class="my-3">
                  Para comenzar a usar esta aplicación, tan solo tendrá que
                  introducir los parámetros sobre el jugador que está buscando
                  para que el programa comience a contrastar con la base de
                  datos para darle las mejores opciones que haya en el mercado
                  de jugadores de la FIFA.<br>
                  En la parte inferior de nuestra aplicación disponemos de un sistema de búsqueda de jugadores
                  en función de su estilo de juego, adecuado para usuarios no tengan claro qué
                  jugador buscar pero sí el perfil de jugador que desean.<br>
                  Además, todos los campos que no sean rellenados, deben ser dejados con el valor por defecto
                  de 'Cualquiera', de lo contrario la aplicación no funcionará.
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
    </div>
  </v-app>
</template>
<script>

export default {
  data: () => ({    
    posiciones: ["Delantero izquierdo", "Delantero centro", "Delantero derecho", "Extremo izquierdo", "Medio izquierdo", "Centrocampista", "Medio derecho", "Extremo derecho",
    "Mediocentro ofensivo izquierdo", "Mediapunta", "Mediocentro ofensivo derecho", "Volante izquierdo", "Mediocentro izquierdo", "Mediocentro", "Mediocentro derecho",
    "Volante derecho", "Carrilero izquierdo", "Centrocampista defensivo izquierdo", "Pivote defensivo", "Centrocampista defensivo derecho", "Carrilero derecho",
    "Lateral izquierdo", "Central izquierdo",  "Central derecho", "Lateral derecho", "Portero"
    ],
    sheet: false,
    //Objeto jugador para almacenar los datos y pasárselos a la base de datos como parámetro
    jugador: {
      nombre: 'Cualquiera',
      edad: 'Cualquiera',
      puntuacion:  'Cualquiera',
      posicion:  'Cualquiera',
      equipo:'Cualquiera',
      valor: 'Cualquiera',
      piernaBuena: 'Cualquiera',
      estiloDeJuego: 'Cualquiera',
    },
    items: ['Destructor de juego', 'Creador de juego', 'Regateador', 'Goleador', 'Cualquiera'],
    piernas: ['Derecha', 'Izquierda'],       
    historial: [],
    players: [],
    playersBuscados: [],
    jugadoresRecomendados: [],
  }),

  methods: {
    send: function() {
      var i = 0;
      var parametrosBusqueda = {
        nombre: this.transform(this.jugador.nombre),         
        equipo: this.transform(this.jugador.equipo),          
        edad: this.transform(this.jugador.edad),
        valor: this.transform(this.jugador.valor),
        puntuacion: this.transform(this.jugador.puntuacion),
        piernaBuena: this.transform(this.jugador.piernaBuena),
        posicion: this.transform(this.jugador.posicion),
        estiloDeJuego: this.transform(this.jugador.estiloDeJuego),        
      };
      this.historial.push(parametrosBusqueda);      

      this.$http.post("http://localhost:3000/getPlayers", parametrosBusqueda).then(
        response => {
          if (
            response.body && response.body.length && response.body[0].message != "Error"
          ) {
            this.players = response.body;

            this.playersBuscados = [];

            for (i; i<this.players.length; i++) {       
              
                this.players[i].age = parseInt(this.players[i].age.low)
                this.playersBuscados.push( this.players[i] )  ;
                          
            } 
            this.players = [] 
            //console.log(this.players)
          } else {
            response.body = [
              {
                name: "¡Ups! No se ha encontrado ningún jugador que cumpla con tus requisitos :(."               
              }
            ];
            this.players = response.body;
          }
          this.players = [];
        }, 
        response => {
          alert("Ha habido un error en el envío: " + response.body);
        }
      )
    }, 
    
    recomiendaJugador: function() {
      var i = 0;
      var sumaEdades = 0;
      var sumaPuntuaciones = 0;
      var mediaEdades = 0;
      var mediaPuntuaciones = 0;
      var parametrosBusqueda = {
        nombre: this.transform(this.jugador.nombre),         
        equipo: this.transform(this.jugador.equipo),          
        edad: this.transform(this.jugador.edad),
        valor: this.transform(this.jugador.valor),
        puntuacion: this.transform(this.jugador.puntuacion),
        piernaBuena: this.transform(this.jugador.piernaBuena),
        posicion: this.transform(this.jugador.posicion),
        estiloDeJuego: this.transform(this.jugador.estiloDeJuego),        
      };

      this.$http.post("http://localhost:3000/getPlayers", parametrosBusqueda).then(
        response => {
          if (
            response.body && response.body.length && response.body[0].message != "Error"
          ) {

            this.players = response.body;
            for (i; i<this.players.length; i++) {
              sumaEdades += parseInt(this.players[i].age.low)
              sumaPuntuaciones += parseInt(this.players[i].overall.low)              
            }

            mediaEdades = sumaEdades/this.players.length;
            //console.log("sumaPuntuaciones, this.players.length "+sumaPuntuaciones+", "+this.players.length)
            mediaPuntuaciones = sumaPuntuaciones/this.players.length;         
            this.jugadoresRecomendados = [];
            i = 0;  


            if(  this.players.length == 1 ){
              //console.log("SOLO 2 ")
              for (i; i<this.players.length; i++) {       
                if(  (this.players[i].overall.low > 70 && this.players[i].age.low <= 27) || this.players[i].overall.low >= 80 ){
                  this.players[i].age = parseInt(this.players[i].age.low)
                  this.jugadoresRecomendados.push( this.players[i] )  ;
                }              
              }             
            //Si solo obtenemos 2 o menos jugadores de la base de datos
            }else if(  this.players.length <= 2 ){
              //console.log("SOLO 2 ")
              for (i; i<this.players.length; i++) {       
                if( this.players[i].age.low < parseInt(mediaEdades) && this.players[i].overall.low >= mediaPuntuaciones 
                  && this.players[i].age.low <= 28 ){
                  this.players[i].age = parseInt(this.players[i].age.low)
                  this.jugadoresRecomendados.push( this.players[i] )  ;
                }              
              } 
            //Si obtenemos + de 2 jugadores de la base de datos 
            }else{
              //console.log("MAS DE 2 JUGADORES ENCONTRADOS")
              for (i; i<this.players.length; i++) {       
                console.log("El jugador "+this.players[i].name+" tiene "+this.players[i].age.low+" y puntuacion "+this.players[i].overall.low)
                if( ( (this.players[i].age.low <= parseInt(mediaEdades) - 2 && this.players[i].overall.low >= 75) || 
                  (this.players[i].age.low <= 25 && this.players[i].overall.low >= 80 )) || this.players[i].overall.low >= mediaPuntuaciones + 5
                  || (this.players[i].overall.low >= 90 && this.players[i].age.low < parseInt(mediaEdades)) ){
                    this.players[i].age = parseInt(this.players[i].age.low);
                    this.jugadoresRecomendados.push( this.players[i] ) ;
                }else{
                    console.log("No recomiendo a "+this.players[i].name)
                }            
              } 
            }

            this.players = []  
            //console.log("Long seleccionados: "+this.jugadoresRecomendados.length);
            i = 0;
            
            for (i; i<this.jugadoresRecomendados.length; i++) {
              console.log("Esta es la lista de edades de los seleccionados: "+this.jugadoresRecomendados[i].age+" nombre: "+this.jugadoresRecomendados[i].name
              +" equipo: "+this.jugadoresRecomendados[i].club)
            }
            //console.log("Esta es la lista de los seleccionados: "+parseInt(this.jugadoresRecomendados.age.low)+" "+String(this.jugadoresRecomendados.name))
          } else {
            response.body = [
              {
                name: "¡Ups! No se ha encontrado ningún jugador que cumpla con tus requisitos :(."    
              }
            ];
            this.players = response.body;
            alert("¡Ups! No se ha encontrado ningún jugador que cumpla con tus requisitos :(." )
          }
        }, 
        response => {
          alert("Ha habido un error en el envío: " + response.body);
        }
      )   
      //console.log("Esta es la lista de los seleccionados: "+this.jugadoresRecomendados)
    },
    

    
    //Esta funcion transformara los datos que nos aporta el usuario para que el sistema pueda hacer la consulta a la base de datos.
    transform: function(p) {
      //Transformacion de las posiciones.
      if (p == "Delantero izquierdo") {
        return "LS";
      } else if (p == "Delantero centro") {
        return "ST";
      }else if (p == "Delantero derecho") {
        return "RS";
      } else if (p == "Extremo izquierdo") {
        return "LW";
      } else if (p == "Medio izquierdo") {
        return "LF";
      } else if (p == "Centrocampista") {
        return "RF";
      } else if (p == "Medio derecho") {
        return "RW";
      } else if (p == "Extremo derecho") {
        return "RW";
      } else if (p == "Mediocentro ofensivo izquierdo") {
        return "LAM";
      } else if (p == "Mediapunta") {
        return "CAM";
      } else if (p == "Mediocentro ofensivo derecho") {
        return "RAM";
      } else if (p == "Volante izquierdo") {
        return "LM";
      } else if (p == "Mediocentro izquierdo") {
        return "LCM";
      } else if (p == "Mediocentro") {
        return "CM";
      } else if (p == "Mediocentro derecho") {
        return "RCM";
      } else if (p == "Volante derecho") {
        return "RM";
      } else if (p == "Carrilero izquierdo") {
        return "LWB";
      } else if (p == "Centrocampista defensivo izquierdo") {
        return "LDM";
      } else if (p == "Pivote defensivo") {
        return "CDM";
      } else if (p == "Centrocampista defensivo derecho") {
        return "RDM";
      } else if (p == "Carrilero derecho") {
        return "RWB";
      } else if (p == "Lateral izquierdo") {
        return "LB";
      } else if (p == "Central izquierdo") {
        return "LCB";
      } else if (p == "Central derecho") {
        return "RCB";
      } else if (p == "Lateral derecho") {
        return "RB";
      } else if (p == "Portero") {
        return "GK";
      }


      //Transformacion de la pierna buena.
      else if (p == 'Derecha') {
        return "Right";
      }else if (p == 'Izquierda') {
        return "Left";
      }


      //Llegariamos a este ultimo caso si nos introducen nombre, un estilo de juego o si nos introducen equipo.
        else{        
          return p;
      }
    }
  }
};
</script>
