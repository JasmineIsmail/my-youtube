
import DOMPurify from "dompurify";

const Comment = ({ data }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
  } = data?.snippet?.topLevelComment?.snippet || {};

  const sanitizedHTML = DOMPurify.sanitize(textDisplay, {
    ALLOWED_TAGS: ["br"],
    ALLOWED_ATTR: [],
  });

  return (
    <div className="shadow-sm p-2 rounded-lg my-2 flex max-w-[700px] w-full">
      <img
        className="w-10 h-10 rounded-full shrink-0"
        src={authorProfileImageUrl}
        alt="user"
      />

      <div className="px-3 min-w-0 flex-1">
        <p className="font-bold">{authorDisplayName}</p>

        <p
          className="wrap-break-word overflow-hidden text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      </div>
    </div>
  );
};

export default Comment;

