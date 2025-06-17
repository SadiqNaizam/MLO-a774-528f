import React from 'react';
import Link from 'next/link'; // Assuming Next.js for routing, replace with react-router-dom Link if appropriate
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  Gauge,
  Sheet, // Using Sheet for Front Pages
  Landmark,
  AppWindow,
  Users,
  ShoppingCart,
  Rss,
  MessageSquare,
  UserCircle2,
  CircleUser,
  Heart,
  Image,
  FileText,
  Notebook,
  CalendarDays,
  Mail,
  Ticket,
  ChevronDown,
  ChevronRight,
  Settings // Placeholder for MatDash Logo, using a generic icon
} from 'lucide-react';

interface NavItemProps {
  item: NavLink;
  isCollapsed: boolean;
  currentPath?: string; // Optional: for active state based on path
}

interface NavLink {
  label: string;
  icon: React.ElementType;
  href?: string;
  isCategoryLabel?: boolean;
  subItems?: NavLink[];
  defaultOpen?: boolean; // For Collapsible
}

const navItems: NavLink[] = [
  { label: 'MatDash', icon: Settings, href: '/', isCategoryLabel: false }, // Logo/Brand item
  { label: 'DASHBOARDS', icon: LayoutDashboard, isCategoryLabel: true },
  { label: 'Dashboard1', icon: Gauge, href: '/dashboard1' },
  { label: 'Dashboard2', icon: Gauge, href: '/dashboard2' },
  { label: 'Dashboard3', icon: Gauge, href: '/dashboard3' },
  {
    label: 'Front Pages',
    icon: Sheet,
    href: '#',
    subItems: [
      { label: 'Landingpage', icon: Landmark, href: '/landingpage' },
    ],
  },
  { label: 'APPS', icon: AppWindow, isCategoryLabel: true },
  { label: 'Contacts', icon: Users, href: '/contacts' },
  {
    label: 'eCommerce',
    icon: ShoppingCart,
    href: '#',
    subItems: [
      { label: 'Products', icon: ShoppingCart, href: '/ecommerce/products' },
      { label: 'Orders', icon: FileText, href: '/ecommerce/orders' },
    ],
  },
  {
    label: 'Blogs',
    icon: Rss,
    href: '#',
    subItems: [
      { label: 'All Posts', icon: Rss, href: '/blogs' },
      { label: 'New Post', icon: FileText, href: '/blogs/new' },
    ],
  },
  { label: 'Chats', icon: MessageSquare, href: '/chats' },
  {
    label: 'Users Profile',
    icon: UserCircle2,
    href: '#',
    defaultOpen: true, // Example: Keep Users Profile open by default
    subItems: [
      { label: 'Profile', icon: CircleUser, href: '/profile' }, // Mark this active based on image
      { label: 'Followers', icon: Users, href: '/profile/followers' },
      { label: 'Friends', icon: Heart, href: '/profile/friends' },
      { label: 'Gallery', icon: Image, href: '/profile/gallery' },
    ],
  },
  {
    label: 'Invoice',
    icon: FileText,
    href: '#',
    subItems: [
      { label: 'List', icon: FileText, href: '/invoice/list' },
      { label: 'Create', icon: FileText, href: '/invoice/create' },
    ],
  },
  { label: 'Notes', icon: Notebook, href: '/notes' },
  { label: 'Calendar', icon: CalendarDays, href: '/calendar' },
  { label: 'Email', icon: Mail, href: '/email' },
  { label: 'Tickets', icon: Ticket, href: '/tickets' },
];

const NavItemLink: React.FC<NavItemProps & { isActive: boolean }> = ({ item, isCollapsed, isActive }) => {
  const IconComponent = item.icon;
  return (
    <Link href={item.href || '#'} passHref legacyBehavior>
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start h-10 text-sm font-medium',
          isCollapsed ? 'px-2' : 'px-3',
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )}
      >
        <IconComponent className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
        {!isCollapsed && item.label}
      </Button>
    </Link>
  );
};

const SidebarNavItem: React.FC<NavItemProps> = ({ item, isCollapsed, currentPath }) => {
  const [isOpen, setIsOpen] = React.useState(item.defaultOpen || false);
  const IconComponent = item.icon;
  const isActive = item.href === currentPath || (item.href === '/profile' && currentPath?.startsWith('/profile')); // Example active logic
  const isParentActive = item.subItems?.some(sub => sub.href === currentPath || (sub.href === '/profile' && currentPath?.startsWith('/profile')));

  if (item.isCategoryLabel) {
    return isCollapsed ? (
      <div className="p-3 mt-2">
        <IconComponent className="h-5 w-5 text-sidebar-foreground/70" />
      </div>
    ) : (
      <h4 className="px-3 mt-4 mb-1 text-xs font-semibold tracking-wider text-sidebar-foreground/70 uppercase">
        {item.label}
      </h4>
    );
  }

  if (item.label === 'MatDash') { // Special handling for Logo/Brand
    return (
      <Link href={item.href || '/'} passHref legacyBehavior>
        <a className={cn(
          'flex items-center h-16 px-4 border-b border-sidebar-border',
          isCollapsed ? 'justify-center' : ''
        )}>
          <IconComponent className="h-8 w-8 text-primary" />
          {!isCollapsed && <span className="ml-2 text-xl font-bold text-sidebar-foreground">{item.label}</span>}
        </a>
      </Link>
    );
  }

  if (item.subItems && item.subItems.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-between h-10 text-sm font-medium',
              isCollapsed ? 'px-2' : 'px-3',
              (isActive || isParentActive)
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <div className="flex items-center">
              <IconComponent className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
              {!isCollapsed && item.label}
            </div>
            {!isCollapsed && (
              isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        {!isCollapsed && (
          <CollapsibleContent className="pl-4 border-l border-sidebar-border ml-3.5">
            <div className="py-1 space-y-1">
              {item.subItems.map((subItem) => (
                <NavItemLink key={subItem.label} item={subItem} isCollapsed={isCollapsed} isActive={subItem.href === currentPath || (subItem.href === '/profile' && currentPath?.startsWith('/profile'))} />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  }

  return <NavItemLink item={item} isCollapsed={isCollapsed} isActive={isActive} />;
};

interface SidebarProps {
  isCollapsed: boolean;
  className?: string;
  currentPath?: string; // For highlighting active links, e.g., from router
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, className, currentPath = '/profile' }) => { // Default to /profile for demo
  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground flex flex-col',
        isCollapsed ? 'w-20' : 'w-64',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      <SidebarNavItem item={navItems[0]} isCollapsed={isCollapsed} /> {/* Logo/Brand Item */}
      <ScrollArea className="flex-1">
        <nav className="py-4 space-y-1">
          {navItems.slice(1).map((item, index) => (
            <SidebarNavItem key={index} item={item} isCollapsed={isCollapsed} currentPath={currentPath} />
          ))}
        </nav>
      </ScrollArea>
      {/* Optional Footer */} 
      {/* <div className="p-4 mt-auto border-t border-sidebar-border">
        {!isCollapsed && <p className="text-xs text-center text-sidebar-foreground/70">© MatDash 2024</p>}
      </div> */}
    </aside>
  );
};

export default Sidebar;
