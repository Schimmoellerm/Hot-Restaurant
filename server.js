const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reservations = []


// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/api/tables', (req, res) => res.json(reservations.slice(0, 5)));
app.get('/api/waitlist', (req, res) => res.json(reservations.slice(5)))

app.post('/api/tables', (req, res) => {
    const newReservation = req.body;
    console.log(newReservation)

    reservations.push(newReservation);
    res.json(reservations.length < 5);
});


app.post('/api/clear', (req, res) => {
    const newReservation = req.body;

    res.json(reservations.empty());
})


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));