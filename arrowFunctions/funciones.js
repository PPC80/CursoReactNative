sumar = function(){
    let caja1 = document.getElementById("txtValor1");
    let caja2 = document.getElementById("txtValor2");

    let v1 = parseInt(caja1.value);
    let v2 = parseInt(caja2.value);

    let resultado = v1 + v2;

    alert("El resultado es: " + resultado);
}

restar = () => {
    let caja1 = document.getElementById("txtValor1");
    let caja2 = document.getElementById("txtValor2");

    let v1 = parseInt(caja1.value);
    let v2 = parseInt(caja2.value);

    let resultado = v1 - v2;

    alert("El resultado es: " + resultado);
}