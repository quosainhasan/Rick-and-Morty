import express from 'express';
import axios from 'axios';
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async(req, res) => {
    try{
        const characters = await axios.get('https://rickandmortyapi.com/api/character');
        res.render('index.ejs', { characters: characters.data.results });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});