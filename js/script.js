const Conteiner = document.querySelector('.container');
const Resultado = document.querySelector('#resultado');
const Formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    Formulario.addEventListener('submit', BuscarClima);
});

function BuscarClima(e){
    e.preventDefault();
    const Ciudad = document.querySelector('#ciudad').value;
    const Pais = document.querySelector('#pais').value;

    if(Ciudad === '' || Pais === ''){
        ImprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }
    ConsultarAPI(Ciudad, Pais);
}

function ConsultarAPI(Ciudad, Pais){
    const AppId = '80e9523db30cfe4940592ac1b9d2f6a3';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${Ciudad},${Pais}&appid=${AppId}`;
    Spinner();
    fetch(URL)
        .then(Respuesta => Respuesta.json())
        .then(Datos => {
            LimpiarHTML();
            MostrarClima(Datos);
        });
}
function MostrarClima(Datos){
    const {name, main: {temp, temp_max, temp_min}} = Datos;

    const Centigrados = KelvinACentigrados(temp);
    const CentigradosMaximo = KelvinACentigrados(temp_max);
    const CentigradosMinimo = KelvinACentigrados(temp_min);
    
    const NombreCiudad = document.createElement('p');
    NombreCiudad.textContent = name;
    NombreCiudad.classList.add('font-bold', 'text-2xl');

    const Actual = document.createElement('p');
    Actual.classList.add('font-bold', 'text-6xl');
    Actual.innerHTML = `${Centigrados} &#8451;`;

    const TempMaxima = document.createElement('p');
    TempMaxima.classList.add('text-xl');
    TempMaxima.innerHTML = `Temperatura Maxima: ${CentigradosMaximo} &#8451;`;

    const TempMinima = document.createElement('p');
    TempMinima.classList.add('text-xl');
    TempMinima.innerHTML = `Temperatura Minima: ${CentigradosMinimo} &#8451;`;

    const DivActual = document.createElement('div');
    DivActual.classList.add('text-center', 'text-white');

    DivActual.appendChild(NombreCiudad);
    DivActual.appendChild(Actual);
    DivActual.appendChild(TempMaxima);
    DivActual.appendChild(TempMinima);

    Resultado.appendChild(DivActual);
}
const KelvinACentigrados = grados => parseInt(grados - 273.15);

function LimpiarHTML(){
    while(Resultado.firstChild){
        Resultado.removeChild(Resultado.firstChild);
    }
}

function Spinner(){
    LimpiarHTML();
    const Spinner = document.createElement('div');
    Spinner.classList.add('spinner');
    Resultado.appendChild(Spinner);
}