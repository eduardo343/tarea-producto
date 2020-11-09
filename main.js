var btnagregar = document.querySelector("#Agregar");
var btnborrar = document.querySelector("#borrar");
var btnbuscar = document.querySelector("#buscar");
var btnmostar = document.querySelector("#mostrar producto");
var btnmostrarinv = document.querySelector("#mostrarinverso (producto)");
var btninsertar = document.querySelector("#Insertar");
var btnagregarprimero = document.querySelector("#addPrimero")
var btneliminarprimero = document.querySelector("#EliminarPrimero")

var codigo = document.querySelector("#codigo");
var nombre = document.querySelector("#nombre(producto)");
var desc = document.querySelector("#desc");
var cantidad = document.querySelector("#cantidad de producto");
var coste = document.querySelector("#coste");
var posicion = document.querySelector("#posicion")

var lista = document.querySelector("#Lista")

class Producto{
    constructor(codigo, nombre, desc, cantidad, coste, total, siguiente){
    this.codigo = codigo ;
    this.nombre = nombre;
    this.desc = desc;
    this.cantidad = cantidad;
    this.coste = coste;
    this.total = total;
    this.siguiente = siguiente;
    };
    
};
class Inventario{
    constructor(){
        this.inicio = null;
        this.size = 0;
    };
    AgregarInicio(item){
        let nuevop = new Producto (item[0], item[1], item[2], item[3], item[4], item[5], this.inicio)
        Mostrar.inicio = nuevop;
        this.size++;
    }
    Recorrer(producto){
        if(producto==null){
            return this.inicio;
        }else {
            return producto.siguiente;
        };
    };
    Verificar(codigo){
      if(this.inicio == null){
          return false;
      };
      let current = this.inicio;
      while(current){
          if(current.codigo === codigo){
              return true;
          };
          current = current.siguiente;
      };
      return false;
    };
    BuscarCode(codigo){
        if(this.inicio == null){
            return null;
        };
        let current = this.inicio;
        while(current){
            if(current.codigo == codigo){
                return current;
            };
            current = current.siguiente;
        };
        return null;
    };
    EliminarCode(codigo){
        let current = this.inicio;
        let previo = null;
        while(current != null){
            if(current.codigo == codigo){
                if(!previo){
                    this.inicio = current.siguiente;
                }else{
                    previo.siguiente = current.siguiente;
                };
                this.else--;
                return current.codigo;
            };
            previo = current;
            current = current.siguiente;
        };
        return null;
    };
    EliminarInicio(){
        if(this.size>1){
            Mostrar.inicio = Mostrar.inicio.siguiente;
        };
        this.size--
    };
    posEspecifico(posi, item)
  {
    let nuevop = new Producto(item[0], item[1], item[2], item[3], item[4], item[5], posi.siguiente)
    posi.siguiente = nuevop
    this.size++
  }
    AgregarFinal(item){
        let nuevop = new Producto(item[0], item[1], item[2], item[3], item[4], item[5], null)
        if(!this.inicio){
            this.inicio = nuevop
        }else{
            let current = this.inicio;
            while(current.siguiente){
                current = current.siguiente;
            };
            current.siguiente = nuevop
        };
        this.size++;
    };
};
const Mostrar = new Inventario();

btnagregar.addEventListener("click", () => {
    if(Mostrar.Verificar(codigo.value)==false){
        let p = new Array (codigo.value,nombre.value,desc.value,cantidad.value,coste.value,(Number(cantidad.value)* Number(coste.value)))
        Mostrar.AgregarFinal(p)
        lista.innerHTML = "Codigo: "+ p[0] + " Nombre: "+ p[1]+ " Descripcion: "+p[2]+" Cantidad: "+p[3]+" Coste: "+p[4]+" Total: "+p[5]+ "</br > Agregado con exito!"
    }else{
        alert ("Error! Codigo repetido")
    };
});
btnborrar.addEventListener("click", () =>{
    let d = Mostrar.BuscarCode(codigo.value)
    if(d!=null){
        lista.innerHTML = +"Codigo: "+d.codigo+" Nombre: "+d.nombre+" Descripcion: "+d.desc+" Cantidad: "+d.cantidad+" Coste: "+d.coste+" Total: "+d.total+"</br > Eliminado con exito"
        Mostrar.EliminarCode(d)
    }else{
        alert("El producto seleccionado no Existe!")
    }
})
btnbuscar.addEventListener("click", () =>{
    let busc = Mostrar.BuscarCode(codigo.value)
    if(busc!=null){
        lista.innerHTML = "Codigo: "+busc.codigo+" Producto: "+ busc.nombre+" Descripcion: "+ busc.desc+" Cantidad: "+busc.cantidad+" Coste: "+busc.coste+" Total: "+busc.total+ "</br > Producto Encontrado!"
    }else{
        alert("El producto No existe. Intente con otro codigo")
    }
})
btnmostar.addEventListener("click", () =>{
    lista.innerHTML = ""
    let current = null
    for(let i=0; i!=Mostrar.size;i++){
        current = Mostrar.Recorrer(current)
        lista.innerHTML += "Codigo: "+current.codigo+" Producto: "+ current.nombre+" Descripcion: "+ current.desc+" Cantidad: "+current.cantidad+" Coste: "+current.coste+" Total: "+current.total+ "</br >"
    }
    lista.innerHTML += "Lista Completa!"
});
btnmostrarinv.addEventListener("click", () =>{
    lista.innerHTML = ""
    let current = null
    let inver = new Array()
        for(let i=0; i!=Mostrar.size;i++){
            current = Mostrar.Recorrer(current)
            inver[i] = current
        }
        for(let i=Mostrar.size-1;i!=-1;i--){
            lista.innerHTML += "Codigo: "+inver[i].codigo+" Producto: "+ inver[i].nombre+" Descripcion: "+ inver[i].desc+" Cantidad: "+inver[i].cantidad+" Coste: "+inver[i].coste+" Total: "+inver[i].total+ "</br >"
        }
        lista.innerHTML += "Lista Completa!"
});
btninsertar.addEventListener("click", () =>{
    if(Mostrar.Verificar(codigo.value)==true){
        alert("Este codigo ya existe")
    }else if(Number(posicion.value)> Mostrar.size){
        alert("No existen datos en la posición")
    }else{
        let pos = Number(posicion.value)
        let current = null
        let ins = new Array (codigo.value,nombre.value,desc.value,cantidad.value,coste.value,(Number(cantidad.value)* Number(coste.value)))
        for(let i=0; i!=pos;i++){
            current = Mostrar.Recorrer(current);
            if(i+1==pos){
                Mostrar.posEspecifico(current,ins)
            }
        }
        lista.innerHTML = ins[0]+" "+ins[1]+" "+ins[2]+" "+ins[3]+" "+ins[4]+" "+ins[5]+ "</br > Insertado con exito"
    }
});
btnagregarprimero.addEventListener("click", () => {
    if(Mostrar.Verificar(codigo.value)==false){
            let agp = new Array(codigo.value,nombre.value,desc.value,cantidad.value,coste.value,(Number(cantidad.value) * Number(coste.value)))
            Mostrar.AgregarInicio(agp)
            lista.innerHTML = agp[0]+" "+agp[1]+" "+agp[2]+" "+agp[3]+" "+agp[4]+" "+agp[5]+ "</br > Agregad0 con exito"
        }else{
            alert ("Codigo Repetido")
        }
});
btneliminarprimero.addEventListener("click", () =>{
    if(Mostrar.inicio){
        let current = Mostrar.Recorrer(null)
        lista.innerHTML = current.codigo+" "+current.nombre+" "+current.desc+" "+current.cantidad+" "+current.costo+" "+current.total+" "+ "</br >  Eliminado con exito!"
        Mostrar.EliminarInicio()
    }else{
        alert("N0 se encontraron productos.")
    }
});