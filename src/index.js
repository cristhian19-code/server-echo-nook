const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

const PostsRoutes = require('./routes/posts.routes');
const UsersRoutes = require('./routes/users.routes');
const TagsRoutes = require('./routes/tags.routes');

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

//ruta de acceso para mostrar imagen subida desde back
app.use('/upload', express.static(__dirname + '/upload'))

app.use(cors({
    origin: '*'
}))

app.use('/posts', PostsRoutes);
app.use('/users', UsersRoutes);
app.use('/tags', TagsRoutes);

const CONNECT_URL = 'mongodb://127.0.0.1:27017/memories?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2'

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECT_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server on port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err.message)
    })