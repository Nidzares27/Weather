const datum = document.querySelector("#datum");
const ikona = document.querySelector("#ikona");
const vremenskiUslovi = document.querySelector("#vremenskiUslovi");
const temp = document.querySelector("#temp");
const mjesto = document.querySelector("#mjesto");
const slika = document.querySelector("#slika");

let formatiraniDatum;
// let lat = 42.3303069;
// let lon = 19.2199548;
let lat, lon;
const API_key = "197fe0553271d3372bbac559fd93005e";

// console.log(lat, lon);

navigator.geolocation.getCurrentPosition(async function (loc) {
  try {
    lat = loc.coords.latitude;
    lon = loc.coords.longitude;
    console.log(lat, lon);

    const koll = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
    );
    console.log(koll);
    if (!koll.ok) {
      throw new Error("Problem prilikom dobijanja lokacije!");
    }
    const rez = await koll.json();
    console.log(rez);

    const vremenskiId = rez.weather[0].id;
    const vremenskiIcon = rez.weather[0].icon;
    console.log(vremenskiId, vremenskiIcon);

    const vatajSlicicu = await fetch(
      `https://openweathermap.org/img/wn/${vremenskiIcon}@2x.png`
      // `https://openweathermap.org/img/wn/10d@2x.png`
    );
    console.log(vatajSlicicu);
    const rezSlicica = vatajSlicicu.url;
    console.log(rezSlicica);
    slika.src = rezSlicica;

    formatiraniDatum = Date(rez.dt);
    formatiraniDatum = new Date(formatiraniDatum);

    const dan = formatiraniDatum.getDate();
    const mjesec = formatiraniDatum.getMonth();
    const godina = formatiraniDatum.getFullYear();

    datum.textContent = `${dan}.${mjesec + 1}.${godina}`;
    vremenskiUslovi.textContent = rez.weather[0].description;
    temp.textContent = `${(rez.main.temp - 272.15).toFixed(0)}°C`;
    mjesto.textContent = `${rez.name}, ${rez.sys.country}`;
  } catch (error) {
    alert(error);
  }
});

// const preuzimanjeVremenskihPodataka = async function () {
//   try {
//     console.log(lat, lon);
//     const koll = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
//     );
//     console.log(koll);
//     const rez = await koll.json();
//     console.log(rez);

//     const vremenskiId = rez.weather[0].id;
//     const vremenskiIcon = rez.weather[0].icon;
//     console.log(vremenskiId, vremenskiIcon);

//     const vatajSlicicu = await fetch(
//       `https://openweathermap.org/img/wn/${vremenskiIcon}@2x.png`
//       // `https://openweathermap.org/img/wn/10d@2x.png`
//     );
//     console.log(vatajSlicicu);
//     const rezSlicica = vatajSlicicu.url;
//     console.log(rezSlicica);
//     slika.src = rezSlicica;

//     formatiraniDatum = Date(rez.dt);
//     formatiraniDatum = new Date(formatiraniDatum);

//     const dan = formatiraniDatum.getDate();
//     const mjesec = formatiraniDatum.getMonth();
//     const godina = formatiraniDatum.getFullYear();

//     datum.textContent = `${dan}.${mjesec + 1}.${godina}`;
//     vremenskiUslovi.textContent = rez.weather[0].description;
//     temp.textContent = `${(rez.main.temp - 272.15).toFixed(0)}°C`;
//     mjesto.textContent = `${rez.name}, ${rez.sys.country}`;
//   } catch (error) {
//     console.error(error);
//   }
// };

// preuzimanjeVremenskihPodataka();

// ${kljuc}
