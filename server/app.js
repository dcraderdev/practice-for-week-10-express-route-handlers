// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId,
} = require('./data');

const express = require('express');
const app = express();
const morgan = require('morgan')
app.use(express.json());


app.use((req, res, next) => {
  console.log('Body:', req.body);
  next();
});

// GET /artists/albums:startswith 200 4.451 ms - 13
app.use(morgan('dev'))



app.get('/', (req, res) => {
  res.status(200).send('Welcome');
});


const data = require('./data');

app.get('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const artist = data.getArtistByArtistId(artistId);
  res.status(200).json(artist);
});

app.put('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const artistData = req.body;
  const editedArtist = data.editArtistByArtistId(artistId, artistData);
  res.status(200).json(editedArtist);
});

app.delete('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  data.deleteArtistByArtistId(artistId);
  res.status(200).json({ message: 'Successfully deleted' });
});

app.get('/artists/:artistId/albums', (req, res) => {
  const artistId = req.params.artistId;
  const albums = data.getAlbumsByArtistId(artistId);
  res.status(200).json(albums);
});

app.get('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const album = data.getAlbumByAlbumId(albumId);
  res.status(200).json(album);
});


app.post('/artists/:artistId/albums', (req, res) => {
  const artistId = req.params.artistId;
  const album = req.body;
  const newAlbum = data.addAlbumByArtistId(artistId, album);
  res.status(201).json(newAlbum);
});

app.patch('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const album = req.body;
  const editedAlbum = data.editAlbumByAlbumId(albumId, album);
  res.status(200).json(editedAlbum);
});

app.delete('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  data.deleteAlbumByAlbumId(albumId);
  res.status(200).json({ message: 'Successfully deleted' });
});


app.get('/albums', (req, res) => {
  console.log(req.query);
  const startsWith = req.query.startsWith;
  const filteredAlbums = data.getFilteredAlbums(startsWith);
  res.status(200).json(filteredAlbums);
});


const port = 5005;
app.listen(port, () => console.log('Server is listening on port', port));
