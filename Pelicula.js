// Variable para la clase ListaDeReproducción, creación una instancia de readline para input
const Lista = require("./ListaDeReproduccion");
const readline = require("readline");

class Peliculas {
  // Constructor que trabaja con la otra clase, se inicializa el lector de input
  constructor() {
    this.listaReproduccion = new Lista();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

// Menú con el que interactuará el usuario
  ejecutar() {
    let opcion;
    console.log("Menú.");
    console.log("1. Agregar película");
    console.log("2. Eliminar película");
    console.log("3. Mostrar películas");
    console.log("4. Reproducir película");
    console.log("5. Buscar por director");
    console.log("6. Buscar por género");
    console.log("7. Reproducir película aleatoria");
    console.log("8. Salir");

    // Usuario elige una opción
    this.rl.question("Elige opción:", (respuesta) => {
      opcion = parseInt(respuesta);


      switch (opcion) {

        case 1:
          // Se agrega una película pidiendo título, director y género
          this.rl.question("Título de la película:", (titulo) => {
            this.rl.question("Nombre del director:", (director) => {
              this.rl.question("Género de la película:", (genero) => {
                this.listaReproduccion.agregarPeli(titulo, director, genero);
                this.ejecutar();
              });
            });
          });
          break;

        case 2:
          // Se elimina película
          if (this.listaReproduccion.listaPeliculas.length === 0) {
            console.log("No hay películas.");
            this.ejecutar();
            break;
          }
          this.listaReproduccion.mostrarPelis();
          this.rl.question("Título de la película que desea eliminar:", (tituloEliminar) => {
            this.listaReproduccion.eliminarPeli(tituloEliminar);
            this.ejecutar();
          });
          break;

        case 3:
          // Mostrar todas las películas
          if (this.listaReproduccion.listaPeliculas.length === 0) {
            console.log("No hay películas.");
            this.ejecutar();
            break;
          }
          this.listaReproduccion.mostrarPelis();
          this.ejecutar();
          break;

        case 4:
          // Reproducir una película en específico
          if (this.listaReproduccion.listaPeliculas.length === 0) {
            console.log("No hay películas.");
            this.ejecutar();
            break;
          }
          this.listaReproduccion.mostrarPelis();
          this.rl.question("Título de la película que desea reproducir:", (tituloReproducir) => {
            (async () => {
              await this.listaReproduccion.reproducirPeli(tituloReproducir);
              this.ejecutar();
            })();
          });
          break;

        case 5:
          // Buscar películas por director
          this.rl.question("Nombre del director:", (directorBuscar) => {
            this.listaReproduccion.buscarPorDirector(directorBuscar);
            this.ejecutar();
          });
          break;

        case 6:
          // Buscar por género
          this.rl.question("Género de la película:", (generoBuscar) => {
            this.listaReproduccion.buscarPorGenero(generoBuscar);
            this.ejecutar();
          });
          break;

        case 7:
          // Reproducir película aleatoria
          (async () => {
            await this.listaReproduccion.reproducirRandom();
            this.ejecutar();
          })();
          break;

        case 8:
          // Terminar el programa
          this.rl.close();
          break;

        default:
          // Se introduce una opción no disponible
          console.log("Opción no válida.");
          this.ejecutar();
      }
    });
  }
}

// Se ejecuta la clase Pelicula que se acaba de definir
const peliculas = new Peliculas();
peliculas.ejecutar();
