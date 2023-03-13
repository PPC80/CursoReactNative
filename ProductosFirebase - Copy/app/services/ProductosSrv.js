import {doc, setDoc, collection, getDocs} from 'firebase/firestore'

export const guardar = (producto) => {
    const productRef = doc(global.dbCon, "Productos", producto.codigo);
    setDoc(productRef, producto);
}

export const consultar = async (fnSetProductos) => {
    const productosRef = collection(global.dbCon, "Productos");
    const productosSnap = await getDocs(productosRef);
    let productosArray = [];
    productosSnap.forEach((documento) => {
        productosArray.push(documento.data());
    });
    fnSetProductos(productosArray);
}