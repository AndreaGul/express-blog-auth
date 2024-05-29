const express = require('express');
const app = express();
const port = 3000;
const host = 'localhost';

const loginRouter = require('./routers/login.js');
const  listRouter  = require('./routers/posts.js');

app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
  res.send(`<h1>Benvenuto nel mio blog</h1>
  <a href="/posts" > Visualizza posts</a>`
        );
});

app.use('/login', loginRouter);

app.use('/posts', express.urlencoded({extended:true}) , listRouter);



app.listen(port, host, () => {
  console.log(`Server avviato su http://${host}:${port}`);
});
