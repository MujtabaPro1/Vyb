import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock data for the social media app
export const MOCK_USERS = [
  {
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Digital creator and photography enthusiast',
    followers: 2341,
    following: 567,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    username: 'samlee',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Travel blogger | Food lover | Adventure seeker',
    followers: 5280,
    following: 312,
  },
  {
    id: '3',
    name: 'Marcus Chen',
    username: 'mchen',
    avatar: 'https://i.pravatar.cc/150?img=8',
    bio: 'Software engineer by day, chef by night',
    followers: 1259,
    following: 964,
  },
  {
    id: '4',
    name: 'Priya Patel',
    username: 'priyap',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Artist and illustrator | Commission open',
    followers: 8752,
    following: 421,
  },
  {
    id: '5',
    name: 'Jordan Smith',
    username: 'jsmith',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Fitness coach helping you reach your goals',
    followers: 12480,
    following: 735,
  },
];

export const MOCK_POSTS = [
  {
    id: '1',
    userId: '2',
    text: 'Just visited the most amazing cafe in Paris! The pastries were absolutely divine. #travel #foodie',
    image: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 243,
    comments: 32,
    createdAt: '2023-06-15T09:24:00Z',
  },
  {
    id: '2',
    userId: '4',
    text: 'Finished my latest illustration project today. So happy with how it turned out!',
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 587,
    comments: 41,
    createdAt: '2023-06-14T15:38:00Z',
  },
  {
    id: '3',
    userId: '1',
    text: 'Golden hour at the beach never disappoints. The perfect end to a perfect day.',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 932,
    comments: 87,
    createdAt: '2023-06-13T18:45:00Z',
  },
  {
    id: '4',
    userId: '5',
    text: 'Today\'s workout: 5 mile run, 3 sets of squats, and 10 minutes of core. Who\'s joining me tomorrow? #fitness #motivation',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 412,
    comments: 53,
    createdAt: '2023-06-12T07:15:00Z',
  },
  {
    id: '5',
    userId: '3',
    text: 'Homemade pasta night! Made this fresh pappardelle with a wild mushroom sauce. Recipe in comments.',
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 754,
    comments: 98,
    createdAt: '2023-06-11T19:30:00Z',
  },
];

// Format date to relative time (e.g., "2 hours ago")
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
}

// Find user by ID
export function findUserById(userId: string) {
  return MOCK_USERS.find(user => user.id === userId);
}