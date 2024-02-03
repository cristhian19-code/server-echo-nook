const mongoose = require("mongoose");

const TagsModel = require("../models/tags.model");

const getTags = async (req, res) => {
  const creator = req.params.id;
  const tags = await TagsModel.find({ creator });

  return res.status(200).json({
    data: tags,
  });
};

const createTag = async (req, res) => {
  const { title, creator } = req.body;

  if (!mongoose.isValidObjectId(creator))
    return res.status(400).json({ message: "Usuario no valido" });

  const newTag = new TagsModel({
    title,
    creator,
  });

  await newTag.save();

  return res.status(200).json({
    message: "Tag creado correctamente",
  });
};

const updateTag = async (req, res) => {
  const { title, _id } = req.body;

  const tag = await TagsModel.findByIdAndUpdate(_id, {
    title,
  });

  if (!tag) return res.status(400).json({ message: "Tag no encontrado" });

  await tag.save();

  return res.status(200).json({
    message: "Tag actualizado correctamente",
  });
};

const deleteTag = async (req, res) => {
  const id = req.params.id;

  const tag = await TagsModel.findByIdAndRemove(id);

  if (!tag) return res.status(400).json({ message: "Tag no encontrado" });

  return res.status(200).json({
    message: "Tag eliminado correctamente",
  });
};

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
};
