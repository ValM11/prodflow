const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const dbaccess = require('./connectdb.js');

app.use(express.static("../public"));
app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/site-names', (req, res) => {
    //res.json(siteProd)
    dbaccess.getSitesName((result) => {res.send(result)});
});

app.get('/site-info/:site', (req, res) => {
    //res.json(siteProd)
    let chosenSite = req.params["site"];
    console.log(chosenSite);
    dbaccess.getSiteInfo(chosenSite, (result) => {res.json(result[0])});
});

app.post('/new-site', (req, res) => {

    res.send("data received");
    let name = req.body["sitename"];
    let street = req.body["sitestreet"];
    let city = req.body["sitecity"];
    if (street === "") {street =  "Not available"};
    if (city === "") {city =  "Not available"};
    let site = {"name": name, "address": {"street": street, "city": city}};
    dbaccess.createNewSite(site, (res) => {res});
})

app.post('/new-production-line/:site', (req, res) => {

    res.send("data received");
    let site = req.params["site"];
    let newline = Number(req.body["new-line"]);
    dbaccess.createNewLine(site, newline, (res) => {res});
    // siteProd["prodLines"].push({lineId: Number(req.body), nbUnitPerMn: 0});
});

app.post('/production-line/:site/:id/update', (req, res) => {

    res.send("data received");
    let site = req.params["site"];
    let line = Number(req.params["id"]);
    let nbUnit = Number(req.body["line-update"]);
    dbaccess.updateLine(site, line, nbUnit, (res) => {res});

    // siteProd["prodLines"].filter(site => site.lineId === Number(req.params["id"]))[0].nbUnitPerMn = Number(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
