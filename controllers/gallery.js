const Gallery = require("../models/gallery");
const uploadImages = require("../utils/uploadImages");

exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({});
    res.status(200).json({
      data: gallery,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: err.message,
      success: false,
    });
  }
};

exports.addNewGallery = async (req, res) => {
  // photosUrls will have all the urls of the photos stored in object store

  const { title } = req.body;
  const files = req.files;
  try {
    const photoUrls = uploadImages(files);

    const gallery = new Gallery({
      title,
      photos: [...photoUrls],
    });

    await gallery.save().catch((err) => {
      throw new Error(err.message);
    });

    res.status(200).json({
      data: gallery,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: err.message,
      success: false,
    });
  }
};

exports.deleteGallery = async (req, res) => {
  const id = req.query.id;
  try {
    const isGallery = await Gallery.findByIdAndDelete(id).then((gallery) => {
      if (!gallery) {
        throw new Error("Invalid Gallery id");
      }
      res.status(200).json({
        data: gallery,
        success: true,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};

exports.getGalleryById = async (req, res) => {
  const { id } = req.params;
  try {
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      throw new Error("Invalid Gallery id");
    }
    res.status(200).json({
      data: gallery,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

exports.updateGallery = async (req, res) => {
  const id = req.query.id;
  const { title, description } = req.body;
  const files = req.files;

  try {
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      throw new Error("Invalid gallery id");
    }

    if (files) {
      const imgUrl = uploadImages(files);
      console.log(imgUrl);
      gallery.photos = [...imgUrl];
    }

    gallery.title = title;
    gallery.description = description;
    await gallery.save().catch((err) => {
      throw new Error("Error while Updating the gallery " + err.message);
    });

    res.status(200).json({
      data: gallery,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: err.message,
      success: false,
    });
  }
};
