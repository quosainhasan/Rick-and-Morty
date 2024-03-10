import express from 'express';
import axios from 'axios';
const app = express();
const port = process.env.PORT || 3000;
const baseUrl = 'https://rickandmortyapi.com/api';
const people = '/character';
const locations = '/location';
const episodes = '/episode';


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/characters', async(req, res) => {
    try{
        const page = req.query.page || 1;
        const characters = await axios.get(`${baseUrl}${people}?page=${page}`);
        const pages =  characters.data.info.pages;
        res.render('index.ejs', { characters: characters.data.results, pages: pages, page: page });
    } catch (error) {
        console.error(error);
    }
});


app.get('/character/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const character = await axios.get(`${baseUrl}${people}/${id}`);
        const episode = character.data.episode;
        var nameofEpisodes = [];
        for (let i = 0; i < episode.length; i++) {
            const episodeData = await axios.get(episode[i]);
            nameofEpisodes.push(episodeData.data);
        }
        res.render('character.ejs', { character: character.data, nameofEpisodes: nameofEpisodes });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});