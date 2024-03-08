const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const PictureCotroller = require("../controller/pictureController");

router.post("/", upload.single("file"), PictureCotroller.create);
router.get('/', PictureCotroller.findAll)
router.delete('/:id', PictureCotroller.remove)

module.exports = router;
