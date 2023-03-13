import {doc, setDoc, collection, getDocs} from 'firebase/firestore'

export const guardar = (usuario) => {
    const usuarioRef = doc(global.dbCon, "Usuarios", usuario.codigo);
    setDoc(usuarioRef, usuario);
}

export const consultar = async (fnSetUsuarios) => {
    const usuariosRef = collection(global.dbCon, "Usuarios");
    const usuariosSnap = await getDocs(usuariosRef);
    let usuariosArray = [];
    usuariosSnap.forEach((documento) => {
        usuariosArray.push(documento.data());
    });
    fnSetUsuarios(usuariosArray);
}