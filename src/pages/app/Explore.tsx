import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import axiosInstance from '../../services/axiosInstance';
import { CDN_LINK } from '../../services/axiosInstance';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trending' | 'people'>('trending');
  const [explorePosts, setExplorePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const POSTS_PER_PAGE = 12;
  

  useEffect(() => {
    getExplorePosts(1, true);
  }, []);

  // Intersection Observer for infinite scrolling
  const loadMoreRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          getExplorePosts(page + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  const getExplorePosts = (pageNumber: number, reset: boolean = false) => {
    if (loading || (!hasMore && !reset)) return;
    
    setLoading(true);
    
    axiosInstance.get(`/feed/global/list?page=${pageNumber}&limit=${POSTS_PER_PAGE}`)
    .then((response: any) => {
      const newPosts = response.data.posts;
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setExplorePosts(prevPosts => reset ? newPosts : [...prevPosts, ...newPosts]);
        setPage(pageNumber);
        setHasMore(newPosts.length === POSTS_PER_PAGE);
      }
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      
      {/* Search bar */}
      <div className="relative mb-8">
        <Input
          placeholder="Search for people, topics, or keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-lg"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>
      
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          
          {/* Popular posts */}
          <h2 className="text-xl font-semibold mb-4">Popular Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {explorePosts.map(post => {
              const user = post?.userDetails;
              const media = post?.media;
              return (
                <Card key={post._id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                      {media?.[0]?.type === 'image' ? <img 
                        src={CDN_LINK + media?.[0]?.url} 
                        alt="Post" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      /> : <video
                      className="w-full h-full object-cover" 
                      src={CDN_LINK + media?.[0]?.url} controls />}
                    </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <img 
                        src={CDN_LINK + user?.profilePicture} 
                        alt={user?.userName} 
                        className="w-8 h-8 rounded-full mr-2" 
                      />
                      <span className="font-medium">{user?.userName}</span>
                    </div>
                    <p className="line-clamp-2 mb-2">{post.text}</p>
                    <div className="text-sm text-muted-foreground">
                      {post.likes} likes • {post.commentCount} comments
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Loading indicator and intersection observer target */}
          <div ref={loadMoreRefCallback} className="py-4 text-center mt-6">
            {loading && <p className="text-muted-foreground">Loading more posts...</p>}
            {!hasMore && explorePosts.length > 0 && <p className="text-muted-foreground">No more posts to load</p>}
          </div>

        </motion.div>
    </div>
  );
}