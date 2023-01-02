const API_KEY = 'DEMO_KEY'
const API_URL = `https://api.nasa.gov/insight_weather/?
api_key=${API_KEY}&feedtype=json&ver=1.0`
// string interpolation 

let selectedSol

getWeather().then(sols => {
    let selectedSol = sols.length - 1
    // assigns global variable to the latest sol in the response
    console.log(sols)
})

function displaySelectedSol(sols) {
    const selectedSol = sols[selectedSolIndex]
    console.log(selectedSol)
}

function getWeather() {
    return fetch(API_URL)
    // fetch method returns a promise that is fulfilled by the response 
    .then(res => res.json())
    // arrow function to convert the response to json
    .then(data => {
        const {
            sol_keys,
            validity_checks,
            ...solData
        } = data
        return Object.entries(solData).map(([sol, data]) => {
        // creating an object out of the response
            return {
                sol: sol,
                maxTemp: data.AT.mx,
                minTemp: data.AT.mn,
                windSpeed: data.HWS.av,
                windDirectionDegrees:
                data.WD.most_common.compass_degrees,
                windDirectionCardinal: data.WD.most_common.compass_point,
                date: new Date(data.First_UTC)
            }
        })
    })
}