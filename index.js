form.addEventListener("submit", (e) => {
    //es para evitar el comportamiento default, que es justamente, submit
    e.preventDefault();
    console.log("apreté submit!");
    validate();
});

//la i al final es insensitive: no distingue mayusculas y minusculas
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

//*https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


const validate = () => {
    //tenemos un problema! los espacios los toma como caracteres! para evitar eso, usamos una funcion llamada trim: va a quitar los espacios al ppio y al final:
    const mail = email.value.trim();
    const pass = password.value.trim();
    const pass2 = password2.value.trim();
    const cel = cel.value.trim();

    //vamos a hacer las comprobaciones:
    if (mail === "") {
        let errorMessage = "El email no puede estar vacío";
        inputError(email, errorMessage);
        //*https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        //esto se lee como "si emailRegex al testear mail da false"
        //el ! significa "no da true"
        //sería igual a emailRegex.test(mail) === false
    } else if (!emailRegex.test(mail)) {
        let errorMessage = "El email no es válido";
        inputError(email, errorMessage);
    } else {
        inputSuccess(email);
    }
    if (pass === "") {
        let errorMessage = "El password no puede estar vacío";
        inputError(password, errorMessage);
    } else if (!passRegex.test(pass)) {
        let errorMessage =
            "El password no es válido. Debe tener mayúscula, minúscula, números y al menos 8 caracteres.";
        inputError(password, errorMessage);
    } else {
        inputSuccess(password);
    }

    if (pass2 === "") {
        let errorMessage = "El password no puede estar vacío";
        inputError(password2, errorMessage);
    } else if (pass2 !== pass) {
        let errorMessage = "Los password no coinciden.";
        inputError(password2, errorMessage);
    } else {
        inputSuccess(password2);
    }
};

const inputSuccess = (input) => {
    const inputParent = input.parentElement;
    //con querySelector nos va a agarrar el primero en que la etiqueta coincida. Si fuera querySelectorAll, nos agarraría todos
    const small = inputParent.querySelector("small");
    inputParent.classList.add("success");
    inputParent.classList.remove("error");
    small.innerHTML = "";
};


const inputError = (input, message) => {
    const inputParent = input.parentElement;

    const small = inputParent.querySelector("small");
    inputParent.classList.add("error");
    inputParent.classList.remove("success");

    small.classList.add("error");
    small.innerHTML = message;
};