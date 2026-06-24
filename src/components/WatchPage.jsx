import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { VIDEO_DETAILS_API } from "../utils/constants";
import { relativeTimeFormat } from "../utils/timeConverter";
import LikeButton from "./LikeButton";
import Description from "./Description";
import CommentsList from "./CommentsList";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const videoID = searchParam.get("v");
  const [video, setVideo] = useState(null);

  useEffect(() => {
    dispatch(closeMenu());
    fetchVideoDetails();
    window.scrollTo(0, 0);
  }, [videoID]);

  const fetchVideoDetails = async () => {
    const res = await fetch(`${VIDEO_DETAILS_API}&id=${videoID}`);
    const json = await res.json();
    setVideo(json?.items?.[0]);
  };

  /*  const fetchRelatedVideoDetails = async () => {
     if (!videoID) return;
    const res = await fetch(`${RELATED_VIDEO_API}&relatedToVideoId=${videoID}`);
    const json = await res.json();
    console.log("relatedVideos",json);
    setRelatedVideos(json?.items || []);
  };
  */
  return (
    <div className="flex flex-col  lg:flex-row gap-6 px-4 md:px-6 py-4 mt-2 max-w-screen-2xl mx-auto ">
      {/* LEFT: Video + Details */}
      <div className="w-full lg:w-[70%] min-w-0">
        <iframe
          className="w-full aspect-video rounded-xl"
          src={`https://www.youtube.com/embed/${videoID}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <h1 className="mt-3 text-lg md:text-xl font-bold">
          {video?.snippet?.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
          <h2 className="font-semibold text-sm md:text-base">
            {video?.snippet?.channelTitle}
          </h2>

          <button className="px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-black text-white hover:bg-zinc-800 transition">
            Subscribe
          </button>

          <LikeButton count={video?.statistics?.likeCount} />
        </div>

        <p className="text-gray-500 text-xs md:text-sm mt-1">
          {video?.statistics?.viewCount} views ·{" "}
          {relativeTimeFormat(video?.snippet?.publishedAt)}
        </p>

        <Description description={video?.snippet?.description} />

        <p className="text-lg md:text-xl font-bold mt-6">
          {video?.statistics?.commentCount} Comments
        </p>

        <CommentsList id={videoID} />
      </div>

      <div className="w-full lg:w-[30%] lg:min-w-[350px]">
       <LiveChat/>
      </div>
    </div>
  );
};

export default WatchPage;
