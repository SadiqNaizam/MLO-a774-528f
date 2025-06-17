import React, { useState } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import Link from 'next/link'; // Assuming Next.js context from Sidebar/Header

// Shadcn UI imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Lucide icons
import {
  FileText,
  Users,
  UserPlus,
  MapPin,
  Search,
  MessageSquare,
  Mail,
  Phone,
  Briefcase,
  Edit3 // For an 'Edit Profile' like action
} from 'lucide-react';

// Data Interfaces
interface UserProfileData {
  avatarUrl: string;
  coverImageUrl: string;
  name: string;
  designation: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
  email: string;
  phone: string;
  location: string;
}

interface FollowerInfo {
  id: string;
  avatarUrl: string;
  name: string;
  location: string;
  isFollowed: boolean;
}

// Dummy Data
const userProfileData: UserProfileData = {
  avatarUrl: 'https://source.unsplash.com/random/100x100?face,portrait&sig=1',
  coverImageUrl: 'https://source.unsplash.com/random/1200x300?abstract,purple,waves&sig=2',
  name: 'David McMichael',
  designation: 'Senior Product Designer',
  posts: 938,
  followers: 3586,
  following: 2659,
  bio: "Passionate designer creating intuitive and beautiful user experiences. Focused on human-centered design and bridging the gap between technology and creativity. Love to explore new tech, travel, and capture moments through photography. Let's connect and build something amazing!",
  email: "david.mcmichael@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA"
};

const initialFollowersData: FollowerInfo[] = [
  { id: '1', avatarUrl: 'https://source.unsplash.com/random/80x80?face,man&sig=10', name: 'Derrick Ray', location: 'Namibia', isFollowed: false },
  { id: '2', avatarUrl: 'https://source.unsplash.com/random/80x80?face,woman&sig=11', name: 'Eula Peterson', location: 'Peru', isFollowed: false },
  { id: '3', avatarUrl: 'https://source.unsplash.com/random/80x80?face,woman&sig=12', name: 'Leila Jefferson', location: 'Jordan', isFollowed: true },
  { id: '4', avatarUrl: 'https://source.unsplash.com/random/80x80?face,man&sig=13', name: 'Hallie Nelson', location: "Côte d'Ivoire", isFollowed: false },
  { id: '5', avatarUrl: 'https://source.unsplash.com/random/80x80?face,man&sig=14', name: 'John Smith', location: 'New York, USA', isFollowed: true },
  { id: '6', avatarUrl: 'https://source.unsplash.com/random/80x80?face,woman&sig=15', name: 'Ana Rodriguez', location: 'Madrid, Spain', isFollowed: false },
  { id: '7', avatarUrl: 'https://source.unsplash.com/random/80x80?face,man&sig=16', name: 'Kenji Tanaka', location: 'Tokyo, Japan', isFollowed: false },
  { id: '8', avatarUrl: 'https://source.unsplash.com/random/80x80?face,woman&sig=17', name: 'Fatima Al Jamil', location: 'Dubai, UAE', isFollowed: true },
];

// UserStatsCard Component
const UserStatsCard: React.FC<{ user: UserProfileData }> = ({ user }) => {
  return (
    <Card className="overflow-hidden shadow-xl rounded-lg">
      <div className="relative h-48 md:h-56 bg-gradient-to-r from-primary to-accent">
        <img src={user.coverImageUrl} alt="Cover background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-card shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardContent className="pt-16 md:pt-20 text-center pb-6">
        <h2 className="text-2xl font-bold text-primaryText">{user.name}</h2>
        <p className="text-md text-secondaryText mb-6">{user.designation}</p>
        
        <div className="flex justify-around items-center py-4 border-t border-b border-border my-6">
          <div className="text-center px-2">
            <FileText className="h-5 w-5 md:h-6 md:w-6 mx-auto text-primary mb-1" />
            <p className="text-lg font-semibold text-primaryText">{user.posts.toLocaleString()}</p>
            <p className="text-xs text-secondaryText">Posts</p>
          </div>
          <div className="text-center px-2">
            <Users className="h-5 w-5 md:h-6 md:w-6 mx-auto text-primary mb-1" />
            <p className="text-lg font-semibold text-primaryText">{user.followers.toLocaleString()}</p>
            <p className="text-xs text-secondaryText">Followers</p>
          </div>
          <div className="text-center px-2">
            <UserPlus className="h-5 w-5 md:h-6 md:w-6 mx-auto text-primary mb-1" />
            <p className="text-lg font-semibold text-primaryText">{user.following.toLocaleString()}</p>
            <p className="text-xs text-secondaryText">Following</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/profile/edit"> 
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Link>
            </Button>
            <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// FollowCard Component
interface FollowCardProps {
  follower: FollowerInfo;
  onFollowToggle: (id: string) => void;
}

const FollowCard: React.FC<FollowCardProps> = ({ follower, onFollowToggle }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
        <Avatar className="w-16 h-16 md:w-20 md:h-20">
          <AvatarImage src={follower.avatarUrl} alt={follower.name} />
          <AvatarFallback>{follower.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-md font-semibold text-primaryText truncate w-36 md:w-40" title={follower.name}>{follower.name}</h3>
          <p className="text-xs text-secondaryText flex items-center justify-center">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate" title={follower.location}>{follower.location}</span>
          </p>
        </div>
        <Button
          variant={follower.isFollowed ? 'secondary' : 'outline'}
          size="sm"
          className="w-full mt-2"
          onClick={() => onFollowToggle(follower.id)}
        >
          {follower.isFollowed ? 'Following' : 'Follow'}
        </Button>
      </CardContent>
    </Card>
  );
};

// FollowersSection Component
const FollowersSection: React.FC = () => {
  const [followers, setFollowers] = useState<FollowerInfo[]>(initialFollowersData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFollowToggle = (id: string) => {
    setFollowers(prevFollowers =>
      prevFollowers.map(f => (f.id === id ? { ...f, isFollowed: !f.isFollowed } : f))
    );
  };

  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    follower.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-xl mt-8 rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold text-primaryText">Followers</CardTitle>
        <Badge variant="secondary" className="bg-primary/10 text-primary text-sm px-3 py-1">{filteredFollowers.length}</Badge>
      </CardHeader>
      <CardContent>
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or location..."
            className="pl-10 w-full bg-muted focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredFollowers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredFollowers.map(follower => (
              <FollowCard key={follower.id} follower={follower} onFollowToggle={handleFollowToggle} />
            ))} 
          </div>
        ) : (
          <p className="text-center text-secondaryText py-10">No followers found matching your search.</p>
        )}
      </CardContent>
    </Card>
  );
};


// AboutUserCard Component
const AboutUserCard: React.FC<{ user: UserProfileData }> = ({ user }) => {
  return (
    <Card className="shadow-xl mt-8 rounded-lg">
      <CardHeader>
          <CardTitle className="text-xl font-semibold text-primaryText">About Me</CardTitle>
      </CardHeader>
      <CardContent>
          <p className="text-sm text-secondaryText mb-6 leading-relaxed">{user.bio}</p>
          <Separator className="my-6"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-primaryText">
              <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-primary flex-shrink-0"/> <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-primary flex-shrink-0"/> <span className="truncate">{user.phone}</span>
              </div>
              <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-primary flex-shrink-0"/> <span className="truncate">{user.location}</span>
              </div>
              <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-3 text-primary flex-shrink-0"/> <span className="truncate">{user.designation}</span>
              </div>
          </div>
      </CardContent>
    </Card>
  );
};


// UserProfileOverviewPage (main page component)
const UserProfileOverviewPage: React.FC = () => {
  return (
    <MainAppLayout currentPath="/profile"> 
      <div className="space-y-6 md:space-y-8 pb-8">
        <UserStatsCard user={userProfileData} />
        <AboutUserCard user={userProfileData} />
        <FollowersSection />
      </div>
    </MainAppLayout>
  );
};

export default UserProfileOverviewPage;
