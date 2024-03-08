const Picture = require("../model/picture");
const fs = require("fs");

class PictureController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const file = req.file;

      const picture = new Picture({
        name: name,
        src: file.path,
      });

      await picture.save();

      res.status(201).json({ picture });
    } catch (error) {
      res.status(500).json({ message: "Error to save your image!" });
    }
  }

  async findAll(req, res) {
    try {
      const pictures = await Picture.find();
      res.status(200).json({ pictures });
    } catch (err) {
      res.status(500).json({ message: "Erro to find images!" });
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id;
      const picture = await Picture.findById(id);

      if (!picture) {
        return res
          .status(404)
          .json({ message: "Image doesn't exist or was deleted!" });
      }

      const pictureWasDeleted = await Picture.findByIdAndDelete(id)

      if (!pictureWasDeleted) {
        return res
          .status(403)
          .json({ message: "Error to delete the image!" });
      }

      fs.unlinkSync(picture.src);

  

      res.status(200).json({ message: "Image removed with success." });
    } catch (err) {
      console.error("Error in removing image:", err);
      res.status(500).json({ message: "Error to find images" });
    }
  }
}

module.exports = new PictureController();
