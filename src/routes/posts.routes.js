const express = require('express');
const router = express.Router();

const { getPosts, createPost, deletePost, getPost, updatePost, likePost, getMyPosts} = require('../controllers/posts.controller');

// Obtener posts
router.get('/', getPosts);

// Obtener los posts de un usuario
router.get('/my-posts', getMyPosts)

// Crear un post
router.post('/', createPost);

// Obtener un post
router.get('/:id', getPost);

// Actualizar un post
router.put('/:id', updatePost);

// Eliminar un post
router.delete('/:id', deletePost);

// Like a un post
router.put('/:id/likePost', likePost);

module.exports = router;