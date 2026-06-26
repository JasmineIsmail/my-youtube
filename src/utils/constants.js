const GOOGLE_API_KEY= import.meta.env.VITE_GOOGLE_API_KEY;

export const YOUTUBE_VIDEOLIST_API = 
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key="+GOOGLE_API_KEY ;

 export const VIDEO_DETAILS_API= "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key="+GOOGLE_API_KEY;

 export const COMMENTS_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&key="+GOOGLE_API_KEY;

export const RELATED_VIDEO_API =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&key=" +
  GOOGLE_API_KEY;

export const SEARCH_API="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key="+GOOGLE_API_KEY+"&q=";

export const OFFSET_LIVECHAT =20;