import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Calendar, MapPin, Link as LinkIcon, Grid, Bookmark, Settings, Share2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Post from '../../components/Post';
import { MOCK_POSTS } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../services/axiosInstance';
import { useEffect } from 'react';
import { CDN_LINK } from '../../services/axiosInstance';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'shared' | 'repost' | 'links'>('posts');
  const [profileUser, setProfileUser] = useState<any>({});
  const [userPosts, setUserPosts] = useState<any>([]);
  

  useEffect(() => {
    getUserPosts();
    getProfile();
  }, []);

  

  const getUserPosts = async () => {
    try {
      const res = await axiosInstance.get('/posts/list?page=1&limit=100');
      setUserPosts(res?.data?.posts);
    } catch (err) {
      console.log('errr',err);
      alert(err?.response?.data?.message);
    }
  }


  const getProfile = () => {
    axiosInstance.get('/users/profile')
    .then((response: any) => {
      console.log(response.data);
      let _user: any = response.data?.user;
      _user.followersCount = response.data?.followers;
      _user.followingCount = response.data?.following;
      setProfileUser(_user);
    })
    .catch((error: any) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile header */}
      <Card className="mb-8 overflow-hidden">
        {/* Cover photo */}
        <div className="h-48 bg-gradient-to-r from-primary/70 to-accent/70 relative">
          <Button 
            variant="outline" 
            size="sm"
            className="hidden absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
          >
            <Edit size={16} className="mr-1" />
            Edit Cover
          </Button>
        </div>
        
        <CardContent className="p-6 relative">
          {/* Profile picture */}
          <div className="absolute -top-16 left-6 border-4 border-background rounded-full">
            <img 
              src={CDN_LINK + profileUser?.profilePicture} 
              alt={profileUser?.userName} 
              className="w-32 h-32 rounded-full object-cover" 
            />
          </div>
          
          <div className="mt-16 flex flex-col lg:flex-row justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{profileUser?.userName}</h1>
              <p className="text-muted-foreground">@{profileUser?.userName}</p>
              
             {profileUser?.bio && <p className="mt-4 max-w-lg">
                {profileUser?.bio}
              </p>}
              
              <div className="flex hidden flex-wrap gap-4 mt-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-1" />
                  San Francisco, CA
                </div>
                <div className="flex items-center text-muted-foreground">
                  <LinkIcon size={16} className="mr-1" />
                  <a href="#" className="text-primary hover:underline">example.com</a>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={16} className="mr-1" />
                  Joined March 2021
                </div>
              </div>
              
              <div className="flex gap-6 mt-6">
                <div>
                  <span className="font-bold">{profileUser?.followingCount}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div>
                  <span className="font-bold">{profileUser?.followersCount}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 lg:mt-0">
              <Button variant="outline" size="sm">
                <Settings size={16} className="mr-1" />
                Settings
              </Button>
              <Button size="sm">
                <Edit size={16} className="mr-1" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs */}
      <div className="flex space-x-1 border-b border-border mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'posts' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={18} className="inline mr-2" />
          Posts
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'saved' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('shared')}
        >
          <Share2 size={18} className="inline mr-2" />
          Shared
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'repost' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('repost')}
        >
          <Share2 size={18} className="inline mr-2" />
          Repost
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'links' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('links')}
        >
          <LinkIcon size={18} className="inline mr-2" />
          Links
        </button>
      </div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'posts' ? (
          <>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <Post key={post.id} {...post} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts yet. Create your first post!</p>
                <Button className="mt-4">Create Post</Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No saved posts yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Posts you save will appear here.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}