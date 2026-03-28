// // // const mongoose = require("mongoose");

// // // const movieSchema = new mongoose.Schema({
// // //   // Basic Info
// // //   movieTitle: { type: String, required: true },
// // //   tagline: { type: String, default: "" },
// // //   description: { type: String, required: true },
// // //   fullStoryline: { type: String, default: "" },
// // //   genres: { type: [String], default: [] },
// // //   tags: { type: [String], default: [] },
// // //   language: { type: String, required: true },
// // //   selectedLanguage: { type: String, default: "" },
// // //   duration: { type: Number, required: true },
// // //   ageRating: { type: String, required: true },
// // //   imdbRating: { type: Number, default: 0 },
// // //   releaseYear: { type: Number, required: true },
// // //   productionStudio: { type: [String], default: [] },
// // //   countryOfOrigin: { type: [String], default: [] },
// // //   budget: { type: String, default: "" },
// // //   awardsAndNominations: { type: String, default: "" },
  
// // //   // Media Files
// // //   movieFile: {
// // //     url: { type: String, default: "" },
// // //     videoId: { type: String, default: "" },
// // //     hlsUrl: { type: String, default: "" },
// // //     mp4Url: { type: String, default: "" },
// // //     thumbnailUrl: { type: String, default: "" },
// // //     duration: { type: Number, default: 0 },
// // //     size: { type: Number, default: 0 }
// // //   },
// // //   customVideoUrl: { type: String, default: "" }, // ✅ Added for custom video URL
// // //   horizontalBanner: { url: { type: String, default: "" }, publicId: { type: String, default: "" } },
// // //   verticalPoster: { url: { type: String, default: "" }, publicId: { type: String, default: "" } },
// // //   videoQuality: { type: String, default: "Auto (Adaptive)" },
// // //   audioFormat: { type: String, default: "Stereo" },
  
// // //   // Crew
// // //   director: { type: [String], default: [] },
// // //   producer: { type: [String], default: [] },
// // //   writer: { type: [String], default: [] },
// // //   musicDirector: { type: [String], default: [] },
// // //   cinematographer: { type: [String], default: [] },
// // //   editor: { type: [String], default: [] },
  
// // //   // Cast
// // //   castMembers: { 
// // //     type: [{ name: String, character: String }], 
// // //     default: [] 
// // //   },
  
// // //   // Audio & Subtitles
// // //   audioTracks: { type: [String], default: [] },
// // //   subtitles: { type: [String], default: [] },
  
// // //   publishStatus: { type: Boolean, default: false },
// // //   subscriptionRequired: { type: Boolean, default: false },
// // //   enableAds: { type: Boolean, default: true },
// // //   allowDownloads: { type: Boolean, default: false },
// // //   featuredMovie: { type: Boolean, default: false },
  
// // //   contentVendor: { type: String, default: "Internal" },
// // //   vendorId: { type: String, default: "" },
// // //   publishDate: { type: Date, default: null },
// // //   expiryDate: { type: Date, default: null },
  
// // //   seoTitle: { type: String, default: "" },
// // //   seoDescription: { type: String, default: "" },
// // //   seoKeywords: { type: [String], default: [] },
  
// // //   viewCount: { type: Number, default: 0 },
// // //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// // // }, { timestamps: true });

// // // module.exports = mongoose.model("Movie", movieSchema);
// // const mongoose = require("mongoose");

// // const movieSchema = new mongoose.Schema({
// //   // Basic Info
// //   movieTitle: { type: String, required: true },
// //   tagline: { type: String, default: "" },
// //   description: { type: String, required: true },
// //   fullStoryline: { type: String, default: "" },
// //   genres: { type: [String], default: [] },
// //   tags: { type: [String], default: [] },
// //   language: { type: String, required: true },
// //   selectedLanguage: { type: String, default: "" },
// //   duration: { type: Number, required: true },
// //   ageRating: { type: String, required: true },
// //   imdbRating: { type: Number, default: 0 },
// //   releaseYear: { type: Number, required: true },
// //   productionStudio: { type: [String], default: [] },
// //   countryOfOrigin: { type: [String], default: [] },
// //   budget: { type: String, default: "" },
// //   awardsAndNominations: { type: String, default: "" },
  
// //   // Media Files
// //   movieFile: {
// //     url: { type: String, default: "" },
// //     videoId: { type: String, default: "" },
// //     hlsUrl: { type: String, default: "" },
// //     mp4Url: { type: String, default: "" },
// //     thumbnailUrl: { type: String, default: "" },
// //     duration: { type: Number, default: 0 },
// //     size: { type: Number, default: 0 }
// //   },
// //   customVideoUrl: { type: String, default: "" },
// //   horizontalBanner: { url: { type: String, default: "" }, publicId: { type: String, default: "" } },
// //   verticalPoster: { url: { type: String, default: "" }, publicId: { type: String, default: "" } },
// //   videoQuality: { type: String, default: "Auto (Adaptive)" },
// //   audioFormat: { type: String, default: "Stereo" },
  
// //   // Crew
// //   director: { type: [String], default: [] },
// //   producer: { type: [String], default: [] },
// //   writer: { type: [String], default: [] },
// //   musicDirector: { type: [String], default: [] },
// //   cinematographer: { type: [String], default: [] },
// //   editor: { type: [String], default: [] },
  
// //   // Cast
// //   castMembers: { 
// //     type: [{ name: String, character: String }], 
// //     default: [] 
// //   },
  
// //   // Audio & Subtitles
// //   audioTracks: { type: [String], default: [] },
// //   subtitles: { type: [String], default: [] },
  
// //   publishStatus: { type: Boolean, default: false },
// //   subscriptionRequired: { type: Boolean, default: false },
// //   enableAds: { type: Boolean, default: true },
// //   allowDownloads: { type: Boolean, default: false },
// //   featuredMovie: { type: Boolean, default: false },
  
// //   contentVendor: { type: String, default: "Internal" },
// //   vendorId: { type: String, default: "" },
// //   publishDate: { type: Date, default: null },
// //   expiryDate: { type: Date, default: null },
  
// //   seoTitle: { type: String, default: "" },
// //   seoDescription: { type: String, default: "" },
// //   seoKeywords: { type: [String], default: [] },
  
// //   viewCount: { type: Number, default: 0 },
// //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// // }, { timestamps: true });

// // module.exports = mongoose.model("Movie", movieSchema);
// const mongoose = require("mongoose");

// const movieSchema = new mongoose.Schema({
//   // Basic Info
//   movieTitle: { type: String, required: true },
//   tagline: { type: String, default: "" },
//   description: { type: String, required: true },
//   fullStoryline: { type: String, default: "" },
//   genres: { type: [String], default: [] },
//   tags: { type: [String], default: [] },
//   language: { type: String, required: true },
//   selectedLanguage: { type: String, default: "" },
//   duration: { type: Number, required: true },
//   ageRating: { type: String, required: true },
//   imdbRating: { type: Number, default: 0 },
//   releaseYear: { type: Number, required: true },
//   productionStudio: { type: [String], default: [] },
//   countryOfOrigin: { type: [String], default: [] },
//   budget: { type: String, default: "" },
//   awardsAndNominations: { type: String, default: "" },
  
//   // Media Files with Bunny CDN Integration
//   movieFile: {
//     url: { type: String, default: "" },
//     videoId: { type: String, default: "" },
//     hlsUrl: { type: String, default: "" },
//     mp4Url: { type: String, default: "" },
//     thumbnailUrl: { type: String, default: "" },
//     duration: { type: Number, default: 0 },
//     size: { type: Number, default: 0 },
//     status: { type: Number, default: 0 }
//   },
//   customVideoUrl: { type: String, default: "" },
//   horizontalBanner: { 
//     url: { type: String, default: "" }, 
//     publicId: { type: String, default: "" } 
//   },
//   verticalPoster: { 
//     url: { type: String, default: "" }, 
//     publicId: { type: String, default: "" } 
//   },
//   videoQuality: { type: String, default: "Auto (Adaptive)" },
//   audioFormat: { type: String, default: "Stereo" },
  
//   // Crew
//   director: { type: [String], default: [] },
//   producer: { type: [String], default: [] },
//   writer: { type: [String], default: [] },
//   musicDirector: { type: [String], default: [] },
//   cinematographer: { type: [String], default: [] },
//   editor: { type: [String], default: [] },
  
//   // Cast
//   castMembers: { 
//     type: [{ name: String, character: String }], 
//     default: [] 
//   },
  
//   // Audio & Subtitles
//   audioTracks: { type: [String], default: [] },
//   subtitles: { type: [String], default: [] },
  
//   // Publishing Settings
//   publishStatus: { type: Boolean, default: false },
//   subscriptionRequired: { type: Boolean, default: false },
//   enableAds: { type: Boolean, default: true },
//   allowDownloads: { type: Boolean, default: false },
//   featuredMovie: { type: Boolean, default: false },
  
//   // Vendor Info
//   contentVendor: { type: String, default: "Internal" },
//   vendorId: { type: String, default: "" },
//   publishDate: { type: Date, default: null },
//   expiryDate: { type: Date, default: null },
  
//   // SEO
//   seoTitle: { type: String, default: "" },
//   seoDescription: { type: String, default: "" },
//   seoKeywords: { type: [String], default: [] },
  
//   // Analytics
//   viewCount: { type: Number, default: 0 },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// }, { timestamps: true });

// // Virtual field for stream URL
// movieSchema.virtual('streamUrl').get(function() {
//   return this.movieFile?.hlsUrl || this.customVideoUrl;
// });

// // Indexes for better performance
// movieSchema.index({ movieTitle: 'text', description: 'text', genres: 1 });
// movieSchema.index({ publishStatus: 1, publishDate: 1 });
// movieSchema.index({ featuredMovie: 1 });
// movieSchema.index({ viewCount: -1 });
// movieSchema.index({ releaseYear: -1 });

// module.exports = mongoose.model("Movie", movieSchema);
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  // Basic Info
  movieTitle: { type: String, required: true },
  tagline: { type: String, default: "" },
  description: { type: String, required: true },
  fullStoryline: { type: String, default: "" },
  genres: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  language: { type: String, required: true },
  selectedLanguage: { type: String, default: "" },
  duration: { type: Number, required: true },
  ageRating: { type: String, required: true },
  imdbRating: { type: Number, default: 0 },
  releaseYear: { type: Number, required: true },
  productionStudio: { type: [String], default: [] },
  countryOfOrigin: { type: [String], default: [] },
  budget: { type: String, default: "" },
  awardsAndNominations: { type: String, default: "" },
  
  // Media Files with Bunny CDN Integration
  movieFile: {
    url: { type: String, default: "" },
    videoId: { type: String, default: "" },
    hlsUrl: { type: String, default: "" },
    mp4Url: { type: String, default: "" },
    directPlayUrl: { type: String, default: "" },  // ✅ Added Direct Play URL
    thumbnailUrl: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    size: { type: Number, default: 0 },
    status: { type: Number, default: 0 }
  },
  customVideoUrl: { type: String, default: "" },
  horizontalBanner: { 
    url: { type: String, default: "" }, 
    publicId: { type: String, default: "" } 
  },
  verticalPoster: { 
    url: { type: String, default: "" }, 
    publicId: { type: String, default: "" } 
  },
  videoQuality: { type: String, default: "Auto (Adaptive)" },
  audioFormat: { type: String, default: "Stereo" },
  
  // Crew
  director: { type: [String], default: [] },
  producer: { type: [String], default: [] },
  writer: { type: [String], default: [] },
  musicDirector: { type: [String], default: [] },
  cinematographer: { type: [String], default: [] },
  editor: { type: [String], default: [] },
  
  // Cast
  castMembers: { 
    type: [{ name: String, character: String }], 
    default: [] 
  },
  
  // Audio & Subtitles
  audioTracks: { type: [String], default: [] },
  subtitles: { type: [String], default: [] },
  
  // Publishing Settings
  publishStatus: { type: Boolean, default: false },
  subscriptionRequired: { type: Boolean, default: false },
  enableAds: { type: Boolean, default: true },
  allowDownloads: { type: Boolean, default: false },
  featuredMovie: { type: Boolean, default: false },
  
  // Vendor Info
  contentVendor: { type: String, default: "Internal" },
  vendorId: { type: String, default: "" },
  publishDate: { type: Date, default: null },
  expiryDate: { type: Date, default: null },
  
  // SEO
  seoTitle: { type: String, default: "" },
  seoDescription: { type: String, default: "" },
  seoKeywords: { type: [String], default: [] },
  
  // Analytics
  viewCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

// Virtual field for stream URL
movieSchema.virtual('streamUrl').get(function() {
  return this.movieFile?.hlsUrl || this.customVideoUrl;
});

// Virtual field for direct play URL
movieSchema.virtual('directPlay').get(function() {
  return this.movieFile?.directPlayUrl;
});

// Indexes for better performance
movieSchema.index({ movieTitle: 'text', description: 'text', genres: 1 });
movieSchema.index({ publishStatus: 1, publishDate: 1 });
movieSchema.index({ featuredMovie: 1 });
movieSchema.index({ viewCount: -1 });
movieSchema.index({ releaseYear: -1 });

module.exports = mongoose.model("Movie", movieSchema);