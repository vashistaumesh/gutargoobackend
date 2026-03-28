// const axios = require("axios");

// class BunnyCdnService {
//   constructor() {
//     this.apiKey = process.env.BUNNY_API_KEY;
//     this.libraryId = process.env.BUNNY_LIBRARY_ID;
//     this.cdnHostname = process.env.BUNNY_CDN_HOSTNAME;
//     this.baseUrl = `https://video.bunnycdn.com/library/${this.libraryId}`;
    
//     console.log("\n╔════════════════════════════════════════════╗");
//     console.log("║     🐰 BUNNY CDN SERVICE INITIALIZED     ║");
//     console.log("╠════════════════════════════════════════════╣");
//     console.log(`║ Library ID: ${this.libraryId}`);
//     console.log(`║ CDN Hostname: ${this.cdnHostname}`);
//     console.log(`║ API Key: ${this.apiKey ? this.apiKey.substring(0, 8) + '...' : 'MISSING'}`);
//     console.log("╚════════════════════════════════════════════╝\n");
//   }

//   getHeaders() {
//     return { 
//       AccessKey: this.apiKey,
//       "Content-Type": "application/json"
//     };
//   }

//   async uploadVideo(fileBuffer, fileName, mimeType) {
//     let videoId = null;
    
//     try {
//       console.log("\n📹 STEP 1: Creating video entry in Bunny CDN...");
//       const createRes = await axios.post(`${this.baseUrl}/videos`, {
//         title: fileName.replace(/\.[^/.]+$/, ""),
//         collectionId: null,
//         enableTtl: false
//       }, { headers: this.getHeaders() });

//       videoId = createRes.data.guid;
//       console.log(`   ✅ Video created! ID: ${videoId}`);

//       console.log("\n📤 STEP 2: Uploading video file...");
//       await axios.put(
//         `https://video.bunnycdn.com/library/${this.libraryId}/videos/${videoId}`,
//         fileBuffer,
//         {
//           headers: { 
//             AccessKey: this.apiKey, 
//             "Content-Type": mimeType 
//           },
//           maxBodyLength: Infinity,
//           maxContentLength: Infinity,
//           timeout: 300000
//         }
//       );
//       console.log("   ✅ Upload complete!");

//       console.log("\n⏳ STEP 3: Waiting for transcoding...");
//       let videoInfo = null;
//       let attempts = 0;
//       const maxAttempts = 40;
      
//       while (attempts < maxAttempts) {
//         await this.sleep(3000);
        
//         const infoRes = await axios.get(`${this.baseUrl}/videos/${videoId}`, {
//           headers: this.getHeaders()
//         });
//         videoInfo = infoRes.data;
        
//         const statusMap = {0:"New",1:"Queued",2:"Processing",3:"Ready ✅",4:"Failed",5:"Error"};
//         console.log(`   Status: ${statusMap[videoInfo.status]} (${attempts + 1}/${maxAttempts})`);
        
//         if (videoInfo.status === 3) {
//           console.log("   ✅ Transcoding complete!");
//           break;
//         } else if (videoInfo.status === 4) {
//           console.log("   ⚠️ Transcoding failed, but video will still be available as MP4");
//           break;
//         }
        
//         attempts++;
//       }

//       console.log("\n🎬 STEP 4: Generating stream URLs...");
//       const hlsUrl = `https://${this.cdnHostname}/${videoId}/playlist.m3u8`;
//       const mp4Url = `https://${this.cdnHostname}/${videoId}/video.mp4`;
//       const thumbnailUrl = `https://${this.cdnHostname}/${videoId}/thumbnail.jpg`;

//       console.log("\n╔════════════════════════════════════════════╗");
//       console.log("║     🎬 VIDEO STREAM URLs GENERATED       ║");
//       console.log("╠════════════════════════════════════════════╣");
//       console.log(`║ HLS: ${hlsUrl}`);
//       console.log(`║ MP4: ${mp4Url}`);
//       console.log(`║ Thumbnail: ${thumbnailUrl}`);
//       console.log("╚════════════════════════════════════════════╝\n");

//       return {
//         videoId,
//         url: hlsUrl,
//         hlsUrl,
//         mp4Url,
//         thumbnailUrl,
//         duration: videoInfo?.length || 0,
//         size: fileBuffer.length,
//         status: videoInfo?.status || 3
//       };
      
//     } catch (error) {
//       console.error("\n❌ ERROR: Video upload failed");
//       console.error(`   ${error.message}`);
//       if (error.response) {
//         console.error(`   Status: ${error.response.status}`);
//         console.error(`   Data:`, JSON.stringify(error.response.data, null, 2));
//       }
      
//       if (videoId) {
//         await this.deleteVideo(videoId).catch(() => {});
//       }
      
//       return null;
//     }
//   }

//   async uploadImage(fileBuffer, fileName, mimeType) {
//     try {
//       console.log(`📸 Uploading image: ${fileName}`);
//       const url = `https://storage.bunnycdn.com/${this.libraryId}/${fileName}`;
      
//       await axios.put(url, fileBuffer, {
//         headers: { 
//           AccessKey: this.apiKey, 
//           "Content-Type": mimeType 
//         },
//         maxBodyLength: Infinity,
//         maxContentLength: Infinity
//       });
      
//       const imageUrl = `https://${this.cdnHostname}/${fileName}`;
//       console.log(`   ✅ Image uploaded: ${imageUrl}`);
//       return {
//         url: imageUrl,
//         publicId: fileName
//       };
//     } catch (error) {
//       console.error(`❌ Image upload error: ${error.message}`);
//       return null;
//     }
//   }

//   async deleteVideo(videoId) {
//     try {
//       await axios.delete(`${this.baseUrl}/videos/${videoId}`, {
//         headers: this.getHeaders()
//       });
//       console.log(`🗑️ Video deleted: ${videoId}`);
//       return { success: true };
//     } catch (error) {
//       console.error(`❌ Delete error: ${error.message}`);
//       return { success: false };
//     }
//   }

//   sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
// }

// module.exports = new BunnyCdnService();
const axios = require("axios");

class BunnyCdnService {
  constructor() {
    this.apiKey = process.env.BUNNY_API_KEY;
    this.libraryId = process.env.BUNNY_LIBRARY_ID;
    this.cdnHostname = process.env.BUNNY_CDN_HOSTNAME;
    this.baseUrl = `https://video.bunnycdn.com/library/${this.libraryId}`;
    
    console.log("\n╔════════════════════════════════════════════╗");
    console.log("║     🐰 BUNNY CDN SERVICE INITIALIZED     ║");
    console.log("╠════════════════════════════════════════════╣");
    console.log(`║ Library ID: ${this.libraryId}`);
    console.log(`║ CDN Hostname: ${this.cdnHostname}`);
    console.log(`║ API Key: ${this.apiKey ? this.apiKey.substring(0, 8) + '...' : 'MISSING'}`);
    console.log("╚════════════════════════════════════════════╝\n");
  }

  getHeaders() {
    return { 
      AccessKey: this.apiKey,
      "Content-Type": "application/json"
    };
  }

  async uploadVideo(fileBuffer, fileName, mimeType) {
    let videoId = null;
    
    try {
      console.log("\n📹 STEP 1: Creating video entry in Bunny CDN...");
      const createRes = await axios.post(`${this.baseUrl}/videos`, {
        title: fileName.replace(/\.[^/.]+$/, ""),
        collectionId: null,
        enableTtl: false
      }, { headers: this.getHeaders() });

      videoId = createRes.data.guid;
      console.log(`   ✅ Video created! ID: ${videoId}`);

      console.log("\n📤 STEP 2: Uploading video file...");
      await axios.put(
        `https://video.bunnycdn.com/library/${this.libraryId}/videos/${videoId}`,
        fileBuffer,
        {
          headers: { 
            AccessKey: this.apiKey, 
            "Content-Type": mimeType 
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          timeout: 300000
        }
      );
      console.log("   ✅ Upload complete!");

      console.log("\n⏳ STEP 3: Waiting for transcoding...");
      let videoInfo = null;
      let attempts = 0;
      const maxAttempts = 40;
      
      while (attempts < maxAttempts) {
        await this.sleep(3000);
        
        const infoRes = await axios.get(`${this.baseUrl}/videos/${videoId}`, {
          headers: this.getHeaders()
        });
        videoInfo = infoRes.data;
        
        const statusMap = {0:"New",1:"Queued",2:"Processing",3:"Ready ✅",4:"Failed",5:"Error"};
        console.log(`   Status: ${statusMap[videoInfo.status]} (${attempts + 1}/${maxAttempts})`);
        
        if (videoInfo.status === 3) {
          console.log("   ✅ Transcoding complete!");
          break;
        }
        
        attempts++;
      }

      console.log("\n🎬 STEP 4: Generating stream URLs...");
      const hlsUrl = `https://${this.cdnHostname}/${videoId}/playlist.m3u8`;
      const mp4Url = `https://${this.cdnHostname}/${videoId}/video.mp4`;
      const thumbnailUrl = `https://${this.cdnHostname}/${videoId}/thumbnail.jpg`;
      const directPlayUrl = `https://player.mediadelivery.net/play/${this.libraryId}/${videoId}`;

      console.log("\n╔════════════════════════════════════════════╗");
      console.log("║     🎬 VIDEO STREAM URLs GENERATED       ║");
      console.log("╠════════════════════════════════════════════╣");
      console.log(`║ HLS: ${hlsUrl}`);
      console.log(`║ MP4: ${mp4Url}`);
      console.log(`║ Direct Play: ${directPlayUrl}`);
      console.log(`║ Thumbnail: ${thumbnailUrl}`);
      console.log("╚════════════════════════════════════════════╝\n");

      return {
        videoId,
        url: hlsUrl,
        hlsUrl,
        mp4Url,
        directPlayUrl,
        thumbnailUrl,
        duration: videoInfo?.length || 0,
        size: fileBuffer.length,
        status: videoInfo?.status || 3
      };
      
    } catch (error) {
      console.error("\n❌ ERROR: Video upload failed");
      console.error(`   ${error.message}`);
      if (error.response) {
        console.error(`   Status: ${error.response.status}`);
        console.error(`   Data:`, JSON.stringify(error.response.data, null, 2));
      }
      
      if (videoId) {
        await this.deleteVideo(videoId).catch(() => {});
      }
      
      return null;
    }
  }

  async uploadImage(fileBuffer, fileName, mimeType) {
    try {
      console.log(`📸 Uploading image: ${fileName}`);
      const url = `https://storage.bunnycdn.com/${this.libraryId}/${fileName}`;
      
      await axios.put(url, fileBuffer, {
        headers: { 
          AccessKey: this.apiKey, 
          "Content-Type": mimeType 
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity
      });
      
      const imageUrl = `https://${this.cdnHostname}/${fileName}`;
      console.log(`   ✅ Image uploaded: ${imageUrl}`);
      return {
        url: imageUrl,
        publicId: fileName
      };
    } catch (error) {
      console.error(`❌ Image upload error: ${error.message}`);
      return null;
    }
  }

  async deleteVideo(videoId) {
    try {
      await axios.delete(`${this.baseUrl}/videos/${videoId}`, {
        headers: this.getHeaders()
      });
      console.log(`🗑️ Video deleted: ${videoId}`);
      return { success: true };
    } catch (error) {
      console.error(`❌ Delete error: ${error.message}`);
      return { success: false };
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new BunnyCdnService();