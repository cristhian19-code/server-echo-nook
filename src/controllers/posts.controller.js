const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')

const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');

const URL_SERVER = process.env.URL_SERVER || 'http://localhost:5000/upload/'

const getPosts = async (req, res) => {
    const creator = req.query.creator;

    try {
        // Si no se pasa el id entonces se tiene que mostrar todos los posts
        if(!creator){
            const posts = await PostModel.find({});

            res.status(200).json(posts);
        }else {
            // si se pasa el id se tiene que buscar al usuario
            const user = await UserModel.findById(creator);

            // En caso el usuario no exista devolver un arreglo vacio
            if(!user) return res.status(404).json([]);

            // En caso encontrar usuario mostrar los posts que no le corresponda al usuario de conexion
            const posts = await PostModel.find({creator : {$not: {$eq: user._id}}}).populate('creator');

            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(405).json({
            message: error.message
        })
    }
}

const getMyPosts = async (req, res) => {
    try {
        const creator = req.query.creator;
        const user = await UserModel.findById(creator);

        const posts = await PostModel.find({creator: user._id}).populate('creator');

        res.status(200).json(posts);
    }catch (error) {
        console.log(error)
        res.status(405).json({
            message: error.message
        })
    }
}

const createPost = async (req, res) => {
    const { title, message, creator, tags, selectedFile } = req.body;

    const newPost = new PostModel({
        title,
        message,
        creator,
        tags,
    })

    const base64Image = selectedFile.split(';base64,').pop();

    const nameImage = `${newPost._id}.png`

    const pathImages = path.join(__dirname, '../upload', nameImage);

    // creacion de la imagen por medio de la base64
    await fs.writeFile(pathImages, base64Image, { encoding: 'base64' }, async () => {
        try {
            newPost.selectedFile = `${URL_SERVER}${nameImage}`;

            await newPost.save();

            res.status(201).json(newPost);
        } catch (error) {

            res.status(409).json({
                message: error.message
            });
        }
    });
}

const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;

    const { title, message, creator, tags, selectedFile } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({
        message: 'Id no valido'
    })
    const updatedPost = { title, message, creator, tags, selectedFile, _id: id };

    await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({
        message: 'Id no valido'
    })

    const nameImage = `${id}.png`

    const pathImages = path.join(__dirname, '../upload', nameImage);

    await fs.unlink(pathImages, () => {

    });

    await PostModel.findByIdAndRemove(id);

    res.json(id);
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status().json({
        message: 'Id no valido'
    })

    const post = await PostModel.findById(id);

    const updatePost = await PostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatePost);

}

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    getMyPosts,
    deletePost,
    likePost
}