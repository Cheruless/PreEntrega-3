class Usuario {
  constructor(usuario, password, date) {
    this._usuario = usuario;
    this._password = password;
    this._birth = date;
  }
}

function esMayor(fechaNacimiento) {
  const fechaNacimientoDate = new Date(fechaNacimiento);
  const edadMilisegundos = Date.now() - fechaNacimientoDate.getTime();
  const edad = edadMilisegundos / (1000 * 60 * 60 * 24 * 365);
  return edad >= 18;
}

function crearElementoInput(id, type, placeholder) {
  const inputElement = document.createElement("input");
  inputElement.id = id;
  inputElement.type = type;
  inputElement.placeholder = placeholder;
  return inputElement;
}

function crearFormularioRegistro() {
  const formRegistroUsuario = document.createElement("form");
  formRegistroUsuario.id = "formRegistroUsuario";
  formRegistroUsuario.appendChild(crearElementoInput("inUser", "text", "Nombre"));
  formRegistroUsuario.appendChild(crearElementoInput("inPassword", "password", "Contraseña"));
  formRegistroUsuario.appendChild(crearElementoInput("inDate", "date", "Fecha de Nacimiento"));

  const inputSubmit = document.createElement("input");
  inputSubmit.type = "submit";
  inputSubmit.value = "Añadir usuario";
  formRegistroUsuario.appendChild(inputSubmit);

  return formRegistroUsuario;
}

function guardarUsuario(usuario) {
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  console.log(usuarios);
  mostrarUsuarios();
}

function mostrarUsuarios() {
  if (usuarios.length > 0) {
    let listaUsuariosHTML = '<ul>';
    for (const usuario of usuarios) {
      listaUsuariosHTML += `<li> ${usuario._usuario}</li>`;
    }
    listaUsuarios.innerHTML = listaUsuariosHTML + '</ul>'
  }
}

function modificarTexto() {
  const elementoTexto = document.getElementById("texto");

  const nuevoContenido = `
    <h1>Bienvenido Jose</h1>
    <h2>Por favor realiza el ingreso de nuevos usuarios.</h2>
    <ul>
      <li>Usuario: Nombre del usuario</li>
      <li>Password: Contraseña</li>
      <li>Fecha de Nacimiento: Fecha</li>
    </ul>
    <br>
    <p>Recuerda que <strong>deben ser mayores de edad</strong></p>
  `;

  elementoTexto.innerHTML = nuevoContenido;
}

const usuariosJSON = '[{"_usuario":"Exequiel","_password":"pass123.","_birth":"2001-06-25"},{"_usuario":"Constanza","_password":"repollo999.","_birth":"2001-12-26"},{"_usuario":"Pedro","_password":"bNjdjsDJs98_","_birth":"2004-12-12"},{"_usuario":"Luna","_password":"woofwoof","_birth":"0101-01-01"}]';
const usuarios = JSON.parse(usuariosJSON);

const gerente = new Usuario("Jose", "1234", "1992-04-13");

const divDatos = document.querySelector('#datos');
const formLogin = document.querySelector('#formLogin');
const inUser = document.querySelector('#inUser');
const inPassword = document.querySelector('#inPassword');

let listaUsuarios;
let formRegistroUsuario = null;

formLogin.onsubmit = e => {
  e.preventDefault();

  if (inUser.value === gerente._usuario && inPassword.value === gerente._password) {
    formLogin.remove();
    modificarTexto();

    formRegistroUsuario = crearFormularioRegistro();
    listaUsuarios = document.createElement("div");
    listaUsuarios.id = "listaUsuarios";
    divDatos.appendChild(formRegistroUsuario);
    divDatos.appendChild(listaUsuarios);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarUsuarios()

    formRegistroUsuario.onsubmit = e => {
      e.preventDefault();

      const inDateValue = document.querySelector('#inDate').value;
      const inUserValue = document.querySelector('#inUser').value;
      const inPasswordValue = document.querySelector('#inPassword').value;

      if (esMayor(inDateValue)) {
        const usuario = new Usuario(inUserValue, inPasswordValue, inDateValue);
        guardarUsuario(usuario)
      }
      else
        alert("El trabajador ingresado es menor de edad.");
    }

  } else {
    alert('Credenciales incorrectas. Por favor, inténtalo nuevamente.');
  }
}