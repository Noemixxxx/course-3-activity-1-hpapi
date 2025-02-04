//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());
app.get('/', (req, res) =>{
    res.json (ApiData);
});


//should respond with the spell with the corresponding id value from data.json 
app.get('/data/:id', (req, res) => {
    const id = Number(req.params.id);
  console.log(id);
  if (id > 0 && id < 73) {
    const data = ApiData.spells.find((data) => data.id === id);
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "id not found" });
  }
     
});

//Should use query params to filter the hogwartsHouse and hogwartsStudent
app.get('/characters', (req, res) => {
  const word = req.query.word;
  let response = [];
  if (word) {
    response = ApiData.characters.filter(
      (apple) => apple.hogwartsStudent && apple.hogwartsHouse === word
    );
  } else {
    response = ApiData.characters.filter((apple) => apple.hogwartsStudent);
  }
  if (response.length > 0) {
    res.status(200).json(response);
  } else {
    res.status(404).json({ House: word, characters: "Not Found" });
  }
   
});

//Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
app.post('/spells', (req, res) => {
  const { id, spell, use } = req.body;
  if (!id || !spell || !use) {
    res.status(400).json({ operation: "add spell", status: "refused" });
  } else {
    res.status(200).json({ operation: "add spell", status: "accepted" });
  }
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});