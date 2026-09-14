const moment = require("moment");
const express = require("express");
const app = express();
const PORT = 8000;
const HOST = "localhost";


function getCurrentDate() {
    console.log(moment().format("dddd"));
}
    
getCurrentDate();

app.get("/timestamp", (req, res) => {
    res.json({
        date: getCurrentDate()
    });
});

app.listen(PORT, HOST, ()=>{
    console.log(`сервер запущен на http://${HOST}:${PORT}`);
})


