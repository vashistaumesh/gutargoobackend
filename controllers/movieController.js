
// const Movie = require("../models/Movie");
// const bunnyService = require("../services/bunnyService");

// const parseArray = (data) => {
//   if (!data) return [];
//   if (typeof data === "string") {
//     try { return JSON.parse(data); } catch (e) { return []; }
//   }
//   return Array.isArray(data) ? data : [];
// };

// // Create Movie with Bunny CDN Upload
// const createMovie = async (req, res) => {
//   try {
//     console.log("\n========================================");
//     console.log("🎬 CREATING NEW MOVIE");
//     console.log("========================================");
//     console.log("Body:", req.body);
//     console.log("Files:", req.files ? Object.keys(req.files) : "No files");
    
//     const movieData = {
//       movieTitle: req.body.movieTitle,
//       tagline: req.body.tagline || "",
//       description: req.body.description,
//       fullStoryline: req.body.fullStoryline || "",
//       genres: parseArray(req.body.genres),
//       tags: parseArray(req.body.tags),
//       language: req.body.language,
//       selectedLanguage: req.body.selectedLanguage || "",
//       duration: parseInt(req.body.duration),
//       ageRating: req.body.ageRating,
//       imdbRating: parseFloat(req.body.imdbRating) || 0,
//       releaseYear: parseInt(req.body.releaseYear),
//       productionStudio: parseArray(req.body.productionStudio),
//       countryOfOrigin: parseArray(req.body.countryOfOrigin),
//       budget: req.body.budget || "",
//       awardsAndNominations: req.body.awardsAndNominations || "",
//       videoQuality: req.body.videoQuality || "Auto (Adaptive)",
//       audioFormat: req.body.audioFormat || "Stereo",
//       director: parseArray(req.body.director),
//       producer: parseArray(req.body.producer),
//       writer: parseArray(req.body.writer),
//       musicDirector: parseArray(req.body.musicDirector),
//       cinematographer: parseArray(req.body.cinematographer),
//       editor: parseArray(req.body.editor),
//       castMembers: parseArray(req.body.castMembers),
//       audioTracks: parseArray(req.body.audioTracks),
//       subtitles: parseArray(req.body.subtitles),
//       publishStatus: req.body.publishStatus === "true",
//       subscriptionRequired: req.body.subscriptionRequired === "true",
//       enableAds: req.body.enableAds === "true",
//       allowDownloads: req.body.allowDownloads === "true",
//       featuredMovie: req.body.featuredMovie === "true",
//       contentVendor: req.body.contentVendor || "Internal",
//       vendorId: req.body.vendorId || "",
//       seoTitle: req.body.seoTitle || "",
//       seoDescription: req.body.seoDescription || "",
//       seoKeywords: parseArray(req.body.seoKeywords),
//       createdBy: req.user?.id,
//       customVideoUrl: req.body.customVideoUrl || "",
//     };
    
//     if (req.body.publishDate) movieData.publishDate = new Date(req.body.publishDate);
//     if (req.body.expiryDate) movieData.expiryDate = new Date(req.body.expiryDate);
    
//     // Handle file uploads
//     if (req.files) {
//       // Upload banners and posters
//       if (req.files.horizontalBanner && req.files.horizontalBanner[0]) {
//         const file = req.files.horizontalBanner[0];
//         const uploadResult = await bunnyService.uploadImage(
//           file.buffer,
//           `banner_${Date.now()}_${file.originalname}`,
//           file.mimetype
//         );
//         if (uploadResult) {
//           movieData.horizontalBanner = uploadResult;
//         }
//       }
      
//       if (req.files.verticalPoster && req.files.verticalPoster[0]) {
//         const file = req.files.verticalPoster[0];
//         const uploadResult = await bunnyService.uploadImage(
//           file.buffer,
//           `poster_${Date.now()}_${file.originalname}`,
//           file.mimetype
//         );
//         if (uploadResult) {
//           movieData.verticalPoster = uploadResult;
//         }
//       }
      
//       // Upload video to Bunny CDN
//       if (req.files.movieFile && req.files.movieFile[0]) {
//         const file = req.files.movieFile[0];
//         console.log("\n📹 VIDEO FILE DETAILS:");
//         console.log(`   Name: ${file.originalname}`);
//         console.log(`   Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
//         console.log(`   Type: ${file.mimetype}`);
        
//         const uploadResult = await bunnyService.uploadVideo(
//           file.buffer,
//           `${Date.now()}_${file.originalname}`,
//           file.mimetype
//         );
        
//         if (uploadResult && uploadResult.hlsUrl) {
//           movieData.movieFile = {
//             url: uploadResult.hlsUrl,
//             videoId: uploadResult.videoId,
//             hlsUrl: uploadResult.hlsUrl,
//             mp4Url: uploadResult.mp4Url,
//             thumbnailUrl: uploadResult.thumbnailUrl,
//             duration: uploadResult.duration,
//             size: file.size,
//             status: uploadResult.status || 3
//           };
//           console.log("\n✅✅✅ VIDEO UPLOAD SUCCESSFUL! ✅✅✅");
//           console.log(`🎬 HLS Stream URL: ${uploadResult.hlsUrl}`);
//           console.log(`📥 MP4 URL: ${uploadResult.mp4Url}\n`);
//         } else {
//           throw new Error("Failed to upload video to Bunny CDN");
//         }
//       }
//     }
    
//     const movie = await Movie.create(movieData);
//     console.log("\n✅ MOVIE CREATED SUCCESSFULLY!");
//     console.log(`   ID: ${movie._id}`);
//     console.log(`   Title: ${movie.movieTitle}`);
//     console.log(`   HLS Stream: ${movie.movieFile?.hlsUrl || 'N/A'}\n`);
    
//     res.status(201).json({ 
//       success: true, 
//       message: "Movie created successfully with HLS stream",
//       data: {
//         ...movie.toObject(),
//         videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
//         hlsUrl: movie.movieFile?.hlsUrl,
//         mp4Url: movie.movieFile?.mp4Url,
//         thumbnailUrl: movie.movieFile?.thumbnailUrl
//       }
//     });
//   } catch (error) {
//     console.error("\n❌ ERROR CREATING MOVIE:");
//     console.error(`   ${error.message}\n`);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

// // Update Movie
// const updateMovie = async (req, res) => {
//   try {
//     console.log("Updating movie:", req.params.id);
    
//     const updateData = { ...req.body };
    
//     const arrayFields = ["genres", "tags", "productionStudio", "countryOfOrigin", "director", "producer", "writer", "musicDirector", "cinematographer", "editor", "castMembers", "audioTracks", "subtitles", "seoKeywords"];
//     arrayFields.forEach(field => {
//       if (updateData[field]) updateData[field] = parseArray(updateData[field]);
//     });
    
//     const boolFields = ["publishStatus", "subscriptionRequired", "enableAds", "allowDownloads", "featuredMovie"];
//     boolFields.forEach(field => {
//       if (updateData[field] !== undefined) updateData[field] = updateData[field] === "true";
//     });
    
//     if (updateData.customVideoUrl !== undefined) {
//       updateData.customVideoUrl = updateData.customVideoUrl;
//     }
    
//     // Handle file uploads
//     if (req.files) {
//       if (req.files.horizontalBanner && req.files.horizontalBanner[0]) {
//         const file = req.files.horizontalBanner[0];
//         const uploadResult = await bunnyService.uploadImage(
//           file.buffer,
//           `banner_${Date.now()}_${file.originalname}`,
//           file.mimetype
//         );
//         if (uploadResult) {
//           updateData.horizontalBanner = uploadResult;
//         }
//       }
      
//       if (req.files.verticalPoster && req.files.verticalPoster[0]) {
//         const file = req.files.verticalPoster[0];
//         const uploadResult = await bunnyService.uploadImage(
//           file.buffer,
//           `poster_${Date.now()}_${file.originalname}`,
//           file.mimetype
//         );
//         if (uploadResult) {
//           updateData.verticalPoster = uploadResult;
//         }
//       }
      
//       if (req.files.movieFile && req.files.movieFile[0]) {
//         const file = req.files.movieFile[0];
        
//         const existingMovie = await Movie.findById(req.params.id);
//         if (existingMovie?.movieFile?.videoId) {
//           await bunnyService.deleteVideo(existingMovie.movieFile.videoId);
//         }
        
//         const uploadResult = await bunnyService.uploadVideo(
//           file.buffer,
//           `${Date.now()}_${file.originalname}`,
//           file.mimetype
//         );
        
//         if (uploadResult) {
//           updateData.movieFile = {
//             url: uploadResult.hlsUrl,
//             videoId: uploadResult.videoId,
//             hlsUrl: uploadResult.hlsUrl,
//             mp4Url: uploadResult.mp4Url,
//             thumbnailUrl: uploadResult.thumbnailUrl,
//             duration: uploadResult.duration,
//             size: file.size,
//             status: uploadResult.status || 3
//           };
//         }
//       }
//     }
    
//     const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     res.json({ 
//       success: true, 
//       data: {
//         ...movie.toObject(),
//         videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
//         hlsUrl: movie.movieFile?.hlsUrl,
//         mp4Url: movie.movieFile?.mp4Url
//       }
//     });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get All Movies
// const getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find().sort({ createdAt: -1 });
//     const moviesWithUrls = movies.map(movie => ({
//       ...movie.toObject(),
//       videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
//       hlsUrl: movie.movieFile?.hlsUrl,
//       mp4Url: movie.movieFile?.mp4Url
//     }));
//     res.json({ success: true, data: moviesWithUrls });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Single Movie
// const getMovieById = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) {
//       return res.status(404).json({ success: false, message: "Movie not found" });
//     }
    
//     movie.viewCount += 1;
//     await movie.save();
    
//     res.json({ 
//       success: true, 
//       data: {
//         ...movie.toObject(),
//         videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
//         hlsUrl: movie.movieFile?.hlsUrl,
//         mp4Url: movie.movieFile?.mp4Url,
//         thumbnailUrl: movie.movieFile?.thumbnailUrl
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Delete Movie
// const deleteMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
    
//     if (movie.movieFile?.videoId) {
//       await bunnyService.deleteVideo(movie.movieFile.videoId);
//     }
    
//     await Movie.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Movie deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Toggle Publish
// const togglePublish = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     movie.publishStatus = !movie.publishStatus;
//     if (movie.publishStatus) movie.publishDate = new Date();
//     await movie.save();
//     res.json({ success: true, data: movie });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Video Stream URL
// const getVideoStreamUrl = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) {
//       return res.status(404).json({ success: false, message: "Movie not found" });
//     }
    
//     const streamUrl = movie.movieFile?.hlsUrl || movie.customVideoUrl;
//     if (!streamUrl) {
//       return res.status(404).json({ success: false, message: "Video not found" });
//     }
    
//     res.json({ 
//       success: true, 
//       data: {
//         streamUrl,
//         mp4Url: movie.movieFile?.mp4Url,
//         thumbnailUrl: movie.movieFile?.thumbnailUrl
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   createMovie,
//   getMovies,
//   getMovieById,
//   updateMovie,
//   deleteMovie,
//   togglePublish,
//   getVideoStreamUrl
// };
const Movie = require("../models/Movie");
const bunnyService = require("../services/bunnyService");

const parseArray = (data) => {
  if (!data) return [];
  if (typeof data === "string") {
    try { return JSON.parse(data); } catch (e) { return []; }
  }
  return Array.isArray(data) ? data : [];
};

// Create Movie with Bunny CDN Upload
const createMovie = async (req, res) => {
  try {
    console.log("\n========================================");
    console.log("🎬 CREATING NEW MOVIE");
    console.log("========================================");
    console.log("Body:", req.body);
    console.log("Files:", req.files ? Object.keys(req.files) : "No files");
    
    const movieData = {
      movieTitle: req.body.movieTitle,
      tagline: req.body.tagline || "",
      description: req.body.description,
      fullStoryline: req.body.fullStoryline || "",
      genres: parseArray(req.body.genres),
      tags: parseArray(req.body.tags),
      language: req.body.language,
      selectedLanguage: req.body.selectedLanguage || "",
      duration: parseInt(req.body.duration),
      ageRating: req.body.ageRating,
      imdbRating: parseFloat(req.body.imdbRating) || 0,
      releaseYear: parseInt(req.body.releaseYear),
      productionStudio: parseArray(req.body.productionStudio),
      countryOfOrigin: parseArray(req.body.countryOfOrigin),
      budget: req.body.budget || "",
      awardsAndNominations: req.body.awardsAndNominations || "",
      videoQuality: req.body.videoQuality || "Auto (Adaptive)",
      audioFormat: req.body.audioFormat || "Stereo",
      director: parseArray(req.body.director),
      producer: parseArray(req.body.producer),
      writer: parseArray(req.body.writer),
      musicDirector: parseArray(req.body.musicDirector),
      cinematographer: parseArray(req.body.cinematographer),
      editor: parseArray(req.body.editor),
      castMembers: parseArray(req.body.castMembers),
      audioTracks: parseArray(req.body.audioTracks),
      subtitles: parseArray(req.body.subtitles),
      publishStatus: req.body.publishStatus === "true",
      subscriptionRequired: req.body.subscriptionRequired === "true",
      enableAds: req.body.enableAds === "true",
      allowDownloads: req.body.allowDownloads === "true",
      featuredMovie: req.body.featuredMovie === "true",
      contentVendor: req.body.contentVendor || "Internal",
      vendorId: req.body.vendorId || "",
      seoTitle: req.body.seoTitle || "",
      seoDescription: req.body.seoDescription || "",
      seoKeywords: parseArray(req.body.seoKeywords),
      createdBy: req.user?.id,
      customVideoUrl: req.body.customVideoUrl || "",
    };
    
    if (req.body.publishDate) movieData.publishDate = new Date(req.body.publishDate);
    if (req.body.expiryDate) movieData.expiryDate = new Date(req.body.expiryDate);
    
    // Handle file uploads
    if (req.files) {
      // Upload banners and posters
      if (req.files.horizontalBanner && req.files.horizontalBanner[0]) {
        const file = req.files.horizontalBanner[0];
        const uploadResult = await bunnyService.uploadImage(
          file.buffer,
          `banner_${Date.now()}_${file.originalname}`,
          file.mimetype
        );
        if (uploadResult) {
          movieData.horizontalBanner = uploadResult;
        }
      }
      
      if (req.files.verticalPoster && req.files.verticalPoster[0]) {
        const file = req.files.verticalPoster[0];
        const uploadResult = await bunnyService.uploadImage(
          file.buffer,
          `poster_${Date.now()}_${file.originalname}`,
          file.mimetype
        );
        if (uploadResult) {
          movieData.verticalPoster = uploadResult;
        }
      }
      
      // Upload video to Bunny CDN
      if (req.files.movieFile && req.files.movieFile[0]) {
        const file = req.files.movieFile[0];
        console.log("\n📹 VIDEO FILE DETAILS:");
        console.log(`   Name: ${file.originalname}`);
        console.log(`   Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
        console.log(`   Type: ${file.mimetype}`);
        
        const uploadResult = await bunnyService.uploadVideo(
          file.buffer,
          `${Date.now()}_${file.originalname}`,
          file.mimetype
        );
        
        if (uploadResult && uploadResult.hlsUrl) {
          movieData.movieFile = {
            url: uploadResult.hlsUrl,
            videoId: uploadResult.videoId,
            hlsUrl: uploadResult.hlsUrl,
            mp4Url: uploadResult.mp4Url,
            directPlayUrl: uploadResult.directPlayUrl,
            thumbnailUrl: uploadResult.thumbnailUrl,
            duration: uploadResult.duration,
            size: file.size,
            status: uploadResult.status || 3
          };
          console.log("\n✅✅✅ VIDEO UPLOAD SUCCESSFUL! ✅✅✅");
          console.log(`🎬 HLS Stream URL: ${uploadResult.hlsUrl}`);
          console.log(`🎬 Direct Play URL: ${uploadResult.directPlayUrl}`);
          console.log(`📥 MP4 URL: ${uploadResult.mp4Url}\n`);
        } else {
          throw new Error("Failed to upload video to Bunny CDN");
        }
      }
    }
    
    const movie = await Movie.create(movieData);
    console.log("\n✅ MOVIE CREATED SUCCESSFULLY!");
    console.log(`   ID: ${movie._id}`);
    console.log(`   Title: ${movie.movieTitle}`);
    console.log(`   HLS Stream: ${movie.movieFile?.hlsUrl || 'N/A'}`);
    console.log(`   Direct Play: ${movie.movieFile?.directPlayUrl || 'N/A'}\n`);
    
    res.status(201).json({ 
      success: true, 
      message: "Movie created successfully with HLS stream",
      data: {
        ...movie.toObject(),
        videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
        hlsUrl: movie.movieFile?.hlsUrl,
        mp4Url: movie.movieFile?.mp4Url,
        directPlayUrl: movie.movieFile?.directPlayUrl,
        thumbnailUrl: movie.movieFile?.thumbnailUrl
      }
    });
  } catch (error) {
    console.error("\n❌ ERROR CREATING MOVIE:");
    console.error(`   ${error.message}\n`);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update Movie
const updateMovie = async (req, res) => {
  try {
    console.log("Updating movie:", req.params.id);
    
    const updateData = { ...req.body };
    
    const arrayFields = ["genres", "tags", "productionStudio", "countryOfOrigin", "director", "producer", "writer", "musicDirector", "cinematographer", "editor", "castMembers", "audioTracks", "subtitles", "seoKeywords"];
    arrayFields.forEach(field => {
      if (updateData[field]) updateData[field] = parseArray(updateData[field]);
    });
    
    const boolFields = ["publishStatus", "subscriptionRequired", "enableAds", "allowDownloads", "featuredMovie"];
    boolFields.forEach(field => {
      if (updateData[field] !== undefined) updateData[field] = updateData[field] === "true";
    });
    
    if (updateData.customVideoUrl !== undefined) {
      updateData.customVideoUrl = updateData.customVideoUrl;
    }
    
    // Handle file uploads
    if (req.files) {
      if (req.files.horizontalBanner && req.files.horizontalBanner[0]) {
        const file = req.files.horizontalBanner[0];
        const uploadResult = await bunnyService.uploadImage(
          file.buffer,
          `banner_${Date.now()}_${file.originalname}`,
          file.mimetype
        );
        if (uploadResult) {
          updateData.horizontalBanner = uploadResult;
        }
      }
      
      if (req.files.verticalPoster && req.files.verticalPoster[0]) {
        const file = req.files.verticalPoster[0];
        const uploadResult = await bunnyService.uploadImage(
          file.buffer,
          `poster_${Date.now()}_${file.originalname}`,
          file.mimetype
        );
        if (uploadResult) {
          updateData.verticalPoster = uploadResult;
        }
      }
      
      if (req.files.movieFile && req.files.movieFile[0]) {
        const file = req.files.movieFile[0];
        
        const existingMovie = await Movie.findById(req.params.id);
        if (existingMovie?.movieFile?.videoId) {
          await bunnyService.deleteVideo(existingMovie.movieFile.videoId);
        }
        
        const uploadResult = await bunnyService.uploadVideo(
          file.buffer,
          `${Date.now()}_${file.originalname}`,
          file.mimetype
        );
        
        if (uploadResult) {
          updateData.movieFile = {
            url: uploadResult.hlsUrl,
            videoId: uploadResult.videoId,
            hlsUrl: uploadResult.hlsUrl,
            mp4Url: uploadResult.mp4Url,
            directPlayUrl: uploadResult.directPlayUrl,
            thumbnailUrl: uploadResult.thumbnailUrl,
            duration: uploadResult.duration,
            size: file.size,
            status: uploadResult.status || 3
          };
        }
      }
    }
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ 
      success: true, 
      data: {
        ...movie.toObject(),
        videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
        hlsUrl: movie.movieFile?.hlsUrl,
        mp4Url: movie.movieFile?.mp4Url,
        directPlayUrl: movie.movieFile?.directPlayUrl
      }
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    const moviesWithUrls = movies.map(movie => ({
      ...movie.toObject(),
      videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
      hlsUrl: movie.movieFile?.hlsUrl,
      mp4Url: movie.movieFile?.mp4Url,
      directPlayUrl: movie.movieFile?.directPlayUrl
    }));
    res.json({ success: true, data: moviesWithUrls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Movie
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    
    movie.viewCount += 1;
    await movie.save();
    
    res.json({ 
      success: true, 
      data: {
        ...movie.toObject(),
        videoStreamUrl: movie.movieFile?.hlsUrl || movie.customVideoUrl,
        hlsUrl: movie.movieFile?.hlsUrl,
        mp4Url: movie.movieFile?.mp4Url,
        directPlayUrl: movie.movieFile?.directPlayUrl,
        thumbnailUrl: movie.movieFile?.thumbnailUrl
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (movie.movieFile?.videoId) {
      await bunnyService.deleteVideo(movie.movieFile.videoId);
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Publish
const togglePublish = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    movie.publishStatus = !movie.publishStatus;
    if (movie.publishStatus) movie.publishDate = new Date();
    await movie.save();
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Video Stream URL
const getVideoStreamUrl = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    
    const streamUrl = movie.movieFile?.hlsUrl || movie.customVideoUrl;
    const directPlayUrl = movie.movieFile?.directPlayUrl;
    
    if (!streamUrl && !directPlayUrl) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }
    
    res.json({ 
      success: true, 
      data: {
        hlsUrl: streamUrl,
        directPlayUrl: directPlayUrl,
        mp4Url: movie.movieFile?.mp4Url,
        thumbnailUrl: movie.movieFile?.thumbnailUrl
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  togglePublish,
  getVideoStreamUrl
};