import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Smile, Send } from 'lucide-react';
import Post from '../../components/Post';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { MOCK_POSTS } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import {CDN_LINK} from '../../services/axiosInstance';
import axiosInstance from '../../services/axiosInstance';

export default function Feed() {
  const [newPostText, setNewPostText] = useState('');
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostText.trim()) return;
    
    // In a real app, this would send the post to an API
    console.log('New post:', newPostText);
    
    // Clear the input
    setNewPostText('');
  };

  const getPosts = () => {
     axiosInstance.get('/feed/list?limit=100&page=1')
     .then((response: any) => {
       console.log(response.data);
       setPosts(response.data?.posts);
     })
     .catch((error: any) => {
       console.error(error);
     });
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
      
      {/* New post form */}
      <Card className="mb-8 hidden">
        <CardContent className="p-4">
          <form onSubmit={handleSubmitPost}>
            <div className="flex items-start space-x-3">
              <img 
                src={CDN_LINK + user?.profilePicture} 
                alt={user?.userName} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  placeholder="What's on your mind?"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none min-h-[100px]"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-2">
                    <Button type="button" variant="ghost" size="sm" className="text-muted-foreground">
                      <Image size={18} className="mr-1" />
                      Photo
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-muted-foreground">
                      <Smile size={18} className="mr-1" />
                      Feeling
                    </Button>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={!newPostText.trim()}
                    size="sm"
                  >
                    <Send size={16} className="mr-1" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Posts feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </motion.div>
    </div>
  );
}