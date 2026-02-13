
//import { Link } from 'react-router-dom';

const RelatedVideoCard = ({ info }) => {
    const { snippet, id } = info;
    if (!snippet) return null;

    return (
        <Link to={"/watch?v=" + id.videoId}>
            <div className='flex gap-2 mb-2 hover:bg-gray-50 rounded-lg p-1 transition-all cursor-pointer'>
                <img 
                    className='w-40 h-24 rounded-lg object-cover flex-none' 
                    alt="thumbnail" 
                    src={snippet?.thumbnails?.medium?.url} 
                />
                <div className='flex flex-col'>
                    <p className='font-bold text-sm line-clamp-2 leading-tight mb-1'>
                        {snippet?.title}
                    </p>
                    <p className='text-xs text-gray-500'>{snippet?.channelTitle}</p>
                </div>
            </div>
        </Link>
    );
};

export default RelatedVideoCard;