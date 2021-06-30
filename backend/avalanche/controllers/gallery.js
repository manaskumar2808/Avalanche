const Gallery = require('../models/Gallery');

exports.addGallery = (req, res, next) => {
    const parent = req.body.parent;
    const type = req.body.type;
    let imageUrl = null;
    let videoUrl = null;

    console.log('add gallery');
    
    if(req.files[0]) {
        console.log('received files');
        if(type === "image") {
            imageUrl = req.files[0].path;
        } else if(type === "video") {
            console.log('video path');
            videoUrl = req.files[0].path;
        }
    }

    const gallery = new Gallery({
        parent,
        type,
        imageUrl,
        videoUrl,
    });

    gallery.save()
    .then(result => {
        res.status(201).json({
            message: "Gallery added",
            added: true,
            galleryItem: result,
        });
    })
    .catch(error => {
        console.log(error.message);
        res.status(200).json({
            error: error.message,
            message: "Gallery not added!",
            added: false,
            galleryItem: null,
        });
    });
}


exports.deleteGallery = (req, res, next) => {
    const galleryId = req.params.galleryId;

    Gallery.findByIdAndDelete(galleryId)
    .then(result => {
        res.status(200).json({
            message: "Gallery deleted",
            deleted: true,
            galleryId: galleryId,
        });
    })
    .catch(error => {
        res.status(200).json({
            error: error.message,
            message: "Gallery not deleted!",
            deleted: false,
            galleryId: galleryId,
        });
    });
}