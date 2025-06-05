import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import { findUserById, formatRelativeTime } from '../lib/utils';
import { CDN_LINK } from '../services/axiosInstance';

interface PostProps {
  id: string;
  userId: string;
  text: string;
  media?: string;
  likes: number;
  dislikes: number;
  commentCount: number;
  createdAt: string;
  userDetails: any;
}

export default function Post({ text, media, likes, dislikes, commentCount, createdAt, userDetails }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleDisLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="p-4 flex flex-row items-center space-y-0">
          <div className="flex items-center flex-1">
            <img 
              src={CDN_LINK + userDetails?.profilePicture} 
              alt={userDetails?.userName} 
              className="w-10 h-10 rounded-full object-cover mr-3" 
            />
            <div>
              <div className="font-medium">{userDetails?.userName}</div>
              <div className="text-xs text-muted-foreground">
                {formatRelativeTime(createdAt)}
              </div>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal size={20} />
          </button>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="mb-3">{text}</p>
          {media?.length > 0 && (
            <div className="rounded-md overflow-hidden bg-muted">
             {media?.[0]?.type === 'image' ?<img 
                src={CDN_LINK + media?.[0]?.url} 
                alt="Post content" 
                className="w-full h-auto object-cover" 
                style={{ maxHeight: '500px' }} 
              /> : <video
              className="w-full h-auto object-cover" 
              src={CDN_LINK + media?.[0]?.url} controls /> }
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 border-t border-border flex justify-between">
          <button 
            className={`flex items-center space-x-1 ${liked ? 'text-accent' : 'text-muted-foreground'}`}
            onClick={handleLike}
          >
            <Heart size={18} className={liked ? 'fill-accent' : ''} />
            <span>{likeCount}</span>
          </button>

          <button 
            className={`flex items-center space-x-1 ${liked ? 'text-accent' : 'text-muted-foreground'}`}
            onClick={handleDisLike}
          >
            <Heart size={18}
            style={{
              transform: 'rotate(180deg)',
            }}
            className={liked ? 'fill-accent' : ''} />
            <span>{dislikeCount}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-muted-foreground">
            <MessageCircle size={18} />
            <span>{commentCount}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-muted-foreground">
            <Share2 size={18} />
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}