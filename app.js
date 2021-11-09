const wait = require('util').promisify(setTimeout);
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000

app.get('/', async ({ query }, response) => {
 return response.sendFile('index/index.html', { root: '.' });
});

app.get('/add', async ({ query }, response) => {

 const { que, ans, tipp } = query
 const { clear } = query

 if (que && ans && tipp) {
  try {
   const fs = require("fs")
   let json = {}
   json = require("./static/quiz.json")

   var arr = [], length;
   for (key in json) {
    arr.push(key);
   }
   length = arr.length;

   json[length + 1] = {
    "frage": que,
    "antwort": ans,
    "tipp": tipp
   }
   fs.writeFileSync("./static/quiz.json", JSON.stringify(json))
  } catch (error) {
   console.error(error)
  }
 }

 if (clear) {
  try {
   const fs = require("fs")
   var json = {}
   json = require("./static/quiz.json")

   json = {}
   fs.writeFileSync("./static/quiz.json", JSON.stringify(json))
  } catch (error) {
   console.error(error)
  }
 }

 return response.sendFile('index/add.html', { root: '.' });
});

app.get('/view', async ({ query }, response) => {
 return response.sendFile('index/view.html', { root: '.' });
});

app.get('/edit', async ({ query }, response) => {

 const { num, que, ans, tipp } = query

 if (num && que && ans && tipp) {
  try {
   const fs = require("fs")
   let json = {}
   json = require("./static/quiz.json")

   if(!json[num]) return

   json[num] = {
    "frage": que,
    "antwort": ans,
    "tipp": tipp
   }
   fs.writeFileSync("./static/quiz.json", JSON.stringify(json))
  } catch (error) {
   console.error(error)
  }
 }

 return response.sendFile('index/edit.html', { root: '.' });
});

app.use("/static", express.static('./static/'));

app.listen(PORT, () => {
 console.log(`Example app listening on port ${PORT}!`);
});