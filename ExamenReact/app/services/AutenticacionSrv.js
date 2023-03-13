import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth"

export const ingresar = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            //Signed In
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const finalizarSesion = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        //Sign out successful
    }).catch((error) => {
        //An error happened
    });
}


export const registrarUsuario = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then ((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario creado", user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error al crear usuario", errorCode);
    })
}

export const resetearClave = (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then (() => {
        console.log("Cambio de clave exitoso");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Cambio de clave NO exitoso", errorCode);
    })
}