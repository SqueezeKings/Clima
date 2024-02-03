const result = document.querySelector('.result');
const form = document.querySelector('.get-wheater');
const namecity = document.querySelector('#city');
const namecountry = document.querySelector('#country');
const one = document.querySelector("#one")



form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (namecity.value === '' || namecountry.value === '') {
        showError('AMBOS CAMPOS SON OBLIGATORIOS');
        return;
    }
    callAPI(namecity.value, namecountry.value);
    //console.log(namecity.value);
    //console.log(namecountry.value);
})

function callAPI(city, country) {
    const apiId = '6dee64b86038f6176be2f26ec663ac2b';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('ciudad no encontrada....')
            } else {
                clearHTML();
                showWeater(dataJSON)
            }
            //console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
    //https://api.openweathermap.org/data/2.5/weather?q=bogota,colombia&appid=6dee64b86038f6176be2f26ec663ac2b
}

function showWeater(data) {
    const { name, main: { temp, temp_min, temp_max }, weather: [arr] } = data;
    const degrees = kelvinToCen(temp);
    const min = kelvinToCen(temp_min);
    const Max = kelvinToCen(temp_max);
    const content = document.createElement('div');

    content.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>${degrees}C°</h2>
            <div class="temp">
            <div>
            <p>Max</p>
            <p>${Max}C°</p>
            </div>
            <div>
            <p>Min</p>
            <p>${min}C°</p>
            </div>
            </div>
            <div id="watch">

            </div>
            <h5>clima en ${name}</h5>
            <br>
            `;
    one.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    <h2>${degrees}C°</h2>
    <div class="temp">
    <div>
    <p>Max</p>
    <p>${Max}C°</p>
    </div>
    <div>
    <p>Min</p>
    <p>${min}C°</p>
    </div>
    </div>
    <div id="watch">

    </div>
    <h5>clima en ${name}</h5>
    <br>
    `;

    result.appendChild(content);


    console.log(name);
    console.log(temp);
    console.log(temp_min);
    console.log(temp_max);
    console.log(arr.icon);
}


function showError(messege) {
    console.log(messege)
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = messege;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 300);
}

function kelvinToCen(temp) {
    return parseInt(temp - 273.15);
}

function clearHTML() {
    result.innerHTML = '';
}
function reloj() {
    var reloj = new Date();

    let hh = reloj.getHours();
    let mm = reloj.getMinutes();

    var fechaActual = new Date();
    var diaSemana = fechaActual.getDay();
    var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var nombreDia = diasSemana[diaSemana];

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;


    var watch = nombreDia + "," + hh + ":" + mm;
    document.querySelector("#watch").innerHTML = watch;
}
setInterval(reloj, 1000);
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
            const coords = {
                lat: latitude
                , lng: longitude
            }
            console.log(coords);
        },
        () => {
            alert("¡Hola!");
        }
    );
}
else {
    alert("hola");
}