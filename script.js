'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// First AJAX Call:
// The old way: XML HTTp Request

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span> ${
//               data.languages[0].name
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article> `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('romania');
// getCountryData('gb');

// CALLBACK HELL

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
       <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span> ${
              data.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article> `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country 1
//     renderCountry(data);

//     // Get NEIGHBOUR Country (2)
//     const [neighbourCountry] = data.borders;
//     if (!neighbourCountry) return;

//     //AJAX CALL 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://restcountries.com/v2/alpha/${neighbourCountry}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('romania');
// // getCountryAndNeighbour('gb');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//   }, 1000);
// }, 1000);

// *** MODERN WAY of making AJAX calls
//PROMISES
// FETCH API

// ***  THE OLD WAY of creating an AJAX CALL
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//request.send();

// const request = fetch(`https://restcountries.com/v2/name/romania`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
// .then(function (response) {
//   console.log(response);
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
//   renderCountry(data[0]);
// });

// // Simplified version of PROMISES

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status} `);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found ${response.status} `);

//       return response.json();
//     })

//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[2];

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} Error404 `);
//       renderError(`Something went wrong ${err.message}. Try again! `);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('romania');
// });
// getCountryData('fsagagshs');

// CHALLENGE 1

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       console.log(response);
//       return response.json();
//     })
//     .then(data => {
//       // renderCountry(data);
//       console.log(`You are in ${data.address.city},${data.address.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.address.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     });
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// EVENT LOOP in PRACTICE
// console.log('Test start');

// setTimeout(() => console.log('0 sec timer'), 0);

// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   //   for (let i = 0; i < 10000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// // Building a PROMISE
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💥');
//     } else {
//       reject(new Error('You lost your money 🎠'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// //PROMISIFYING setTimeout

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// wait(2)
//   .then(() => {
//     console.log('I waited for 2 secs');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// Promise.resolve('');

// // Promisifying the GEOLOCATION API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     ////// Short version  where the position gets resolved or rejected automatically
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));

// const whereAmI = function (lat, lng) {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
//     })

//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       console.log(res);
//       return response.json();
//     })
//     .then(data => {
//       // renderCountry(data);
//       console.log(`You are in ${data.address.city},${data.address.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.address.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     });
// };
// btn.addEventListener('click', whereAmI);

// Challenge 2

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);

      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Img Not Found'));
    });
  });
};

let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     // console.log('Image 2 loaded');
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     // console.log('Image 3 loaded');
//     return createImage('img/img-3.jpg');
//   })

//   .catch(err => console.log(err));

// // Async , await

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const wheremAmI = async function () {
//   // Geolocation
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     //Reverse geocoding
//     const resGeo = await fetch(
//       `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
//     );
//     if (!resGeo.ok) throw new Error(`Problem getting locaiton data`);
//     const dataGeo = await resGeo.json();
//     // Country data
//     const response = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.address.country}`
//     );
//     console.log(dataGeo);
//     if (!response.ok) throw new Error('`Problem getting country');
//     const data = await response.json();
//     renderCountry(data[0]);
//     return ` You are in ${dataGeo.address.county}, ${dataGeo.address.country}`;
//   } catch (err) {
//     console.error(err);
//     renderError(`Something went wrong ${err.message}`);

//     //Reject promise returned from async function
//     throw err;
//   }
// };

// console.log(`1: Will get location`);
// // const city = wheremAmI();
// // console.log(city);

// // wheremAmI()
// //   .then(city => console.log(`2: ${city}`))
// //   .catch(err => console.error(`2: ${err.message} 🎈`))
// //   .finally(() => console.log('3: Finished getting location'));

// // Using an IIFE
// (async function () {
//   try {
//     const city = await wheremAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 🎈`);
//   }
//   console.log('3: Finished getting location');
// })();
// // try catch method

// // try {
// //   let y = 1;
// //   const x = 2;
// //   x = 3;
// // } catch (err) {
// //   alert(err.message);
// // }

// // RUNNING PROMISES IN PARALLEL

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

//     // Promise.all
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries('romania', 'gb', 'portugal');

// // Promise Combinators

// //Promise.race
// (async function () {
//   const race = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/georgia`),
//     getJSON(`https://restcountries.com/v2/name/norway`),
//   ]);
//   console.log(race[0]);
// })();

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'));
//     }, s * 1000);
//   });
// };
// Promise.race([getJSON(`https://restcountries.com/v2/name/cuba`), timeout(0.01)])
//   .then(race => console.log(race[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Success'),
//   Promise.resolve('Another Success'),
// ])
//   .then(race => console.log(race))
//   .catch(err => console.error(err));

// //Promise.any
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Success'),
//   Promise.resolve('Another Success'),
// ])
//   .then(race => console.log(race))
//   .catch(err => console.error(err));

//Challenge 3

// Part 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

//Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgEl = await Promise.all(imgs);
    console.log(imgEl);

    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
