// Constantes generales
const textoAEncriptar = document.getElementById("texto-encriptar");
const textoEncriptado = document.getElementById("texto-encriptado");

// Funcion para cambiar entre el textarea y la imagen
textoAEncriptar.addEventListener("input", () => {
  let mensaje = "Espere a que su texto sea encriptado...";

  textoEncriptado.value = mensaje;

  encriptar();
});

function encriptar() {
  let textarea = document.getElementById("texto-encriptar").value;
  let textareaDos = document.getElementById("texto-encriptado");
  let imagen = document.getElementById("cont-imagen");
  let botonCopiar = document.getElementById("copiar");

  if (textarea == "") {
    imagen.style.display = "block";
    textareaDos.style.display = "none";
    botonCopiar.style.display = "none";
  } else {
    imagen.style.display = "none";
    textareaDos.style.display = "block";
    botonCopiar.style.display = "block";
  }
}

// Funcion de validacion
function validarTexto(texto) {
  const regex = /^[a-z\s]+$/;
  return regex.test(texto);
}

// Funcion de captura de texto y encriptacion
function capturarTexto() {
  let textarea = textoAEncriptar;
  let textoCapturado = textarea.value;
  let Encriptado = "";

  let esValido = validarTexto(textoCapturado);

  if (textoCapturado === "") {
    Swal.fire({
      icon: "error",
      text: "No se puede dejar el campo vacio, ingrese un texto para encriptar.",
      showConfirmButton: true,
      confirmButtonColor: "#264434",
    });
  } else if (!esValido) {
    Swal.fire({
      icon: "error",
      title: "El texto ingresado no es válido",
      text: "Por favor, ingrese un texto sin mayúsculas ni acentos.",
      showConfirmButton: true,
      confirmButtonColor: "#264434",
      footer:
        'Por ejemplo, en lugar de escribir "El gran árbol", escriba "el gran árbol".',
    });
  } else {
    for (let i = 0; i < textoCapturado.length; i++) {
      let element = textoCapturado[i];
      element = element.toLowerCase();

      if (element === "e") {
        element = "enter";
      } else if (element === "i") {
        element = "imes";
      } else if (element === "a") {
        element = "ai";
      } else if (element === "o") {
        element = "ober";
      } else if (element === "u") {
        element = "ufat";
      } else {
        element = element;
      }
      Encriptado += element;
    }
  }
  textoEncriptado.value = Encriptado;
}

// Funcion de desencriptacion
function desencriptarTexto() {
  let textarea = textoAEncriptar;
  let textoCapturado = textarea.value;
  let desencriptado = "";

  desencriptado = textoCapturado.replaceAll("enter", "e");
  desencriptado = desencriptado.replaceAll("imes", "i");
  desencriptado = desencriptado.replaceAll("ai", "a");
  desencriptado = desencriptado.replaceAll("ober", "o");
  desencriptado = desencriptado.replaceAll("ufat", "u");

  textoEncriptado.value = desencriptado;
}

// Funcion de copiar texto
function copiarTexto() {
  let textoACopiar = textoEncriptado;
  textoACopiar.select();
  textoACopiar.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textoACopiar.value);

  Swal.fire({
    icon: "success",
    title: "El texto se copió exitosamente.",
    text: "Texto copiado: " + textoACopiar.value,
    showConfirmButton: true,
    confirmButtonColor: "#264434",
    footer: "Presione CTRL + V para pegar.",
  });
}
