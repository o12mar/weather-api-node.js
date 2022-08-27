const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 8000

const publicStaticDirPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Api'
    })
})

//localhost:8000/weather?address=Baghdad
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, { temperature, description, cityName, countryName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName, countryName);
        res.send({
            temperature,
            description,
            cityName,
            countryName
        })

    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "Page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})