// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { auth } = require("../middleware/authMiddleware");
// const {
//   createMovie,
//   getMovies,
//   getMovieById,
//   updateMovie,
//   deleteMovie,
//   togglePublish
// } = require("../controllers/movieController");

// const storage = multer.memoryStorage();
// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 * 1024 } })
//   .fields([
//     { name: "movieFile", maxCount: 1 },
//     { name: "horizontalBanner", maxCount: 1 },
//     { name: "verticalPoster", maxCount: 1 }
//   ]);

// router.post("/", auth, upload, createMovie);
// router.get("/", auth, getMovies);
// router.get("/:id", auth, getMovieById);
// router.put("/:id", auth, upload, updateMovie);
// router.delete("/:id", auth, deleteMovie);
// router.patch("/:id/publish", auth, togglePublish);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/authMiddleware");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  togglePublish,
  getVideoStreamUrl
} = require("../controllers/movieController");

const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { 
    fileSize: 5 * 1024 * 1024 * 1024
  } 
}).fields([
  { name: "movieFile", maxCount: 1 },
  { name: "horizontalBanner", maxCount: 1 },
  { name: "verticalPoster", maxCount: 1 }
]);

router.post("/", auth, upload, createMovie);
router.get("/", auth, getMovies);
router.get("/:id", auth, getMovieById);
router.put("/:id", auth, upload, updateMovie);
router.delete("/:id", auth, deleteMovie);
router.patch("/:id/publish", auth, togglePublish);
router.get("/:id/stream", auth, getVideoStreamUrl);

module.exports = router;