import moment from 'moment'; // npm paket dlja raboty s datoj/4islo i vremja

const apiUrl = 'https://dashboard.elering.ee/api'; // api url

// eksportiruem asinhronnuju funkciju kotoraja zaprashevajet tekushuju stoimost' elektroenergii.
// zapros GET /nps/price/ee/current - endpoint
// await pozvoljajet dazhedatsja otveta s api
// fetch vozvrashajet Promise/obeshanije i pri pravel'nom vypolnenii objekt response.
// Kazhdqj response imejet funkcqju .json() kotoraja perevodit JSON v js objekt
export async function getCurrentPrice() {
    const country = 'EE';
    const response = await fetch(`${apiUrl}/nps/price/${country}/current`);
    return response.json();
};

export async function getPriceData() {
    // moment() - vqdajot moment object s tekushem vremeni i datoj
    // .utc() - konvertirujet eto v nulevoj 4asov pojas
    // substract - vqchetajet 
    // .format() prevrashajet moment object v string s udobnqm formatom chtenija
    const start = moment().utc().subtract(10, 'hours').format();
    const end = moment().utc().add(30, 'hours').format();
    // URLSearchParams - prevrashajet js object v strochku dlja url
    const params = new URLSearchParams({start, end});
    const response = await fetch(`${apiUrl}/nps/price?${params}`);
    return response.json();
};
