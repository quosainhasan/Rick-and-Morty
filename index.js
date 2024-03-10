import express from 'express';
import axios from 'axios';
const app = express();
const port = process.env.PORT || 3000;
const baseUrl = 'https://rickandmortyapi.com/api';
const people = '/character';
const locations = '/location';
const episodes = '/episode';

app.get('/', async(req, res) => {
    try{
        const page = req.query.page || 1;
        const characters = await axios.get(`${baseUrl}${people}?page=${page}`);
        const pages =  characters.data.info.pages;
        res.render('index.ejs', { characters: characters.data.results, pages: pages, page: page });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});