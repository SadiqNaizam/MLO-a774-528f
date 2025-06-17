import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  currentPath?: string; // To pass to Sidebar for active item highlighting
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, currentPath }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div
      className={cn(
        'grid h-screen bg-background',
        // Using fixed pixel widths for sidebar for smoother transitions if CSS transitions on grid-template-columns are tricky
        // Tailwind's w-64 is 256px, w-20 is 80px
        isSidebarCollapsed ? 'grid-cols-[80px_1fr]' : 'grid-cols-[256px_1fr]',
        'transition-[grid-template-columns] duration-300 ease-in-out'
      )}
    >
      {/* Sidebar: Column 1, spans 2 rows implicitly by being in the first column of a 2-row grid structure */}
      <div className="row-span-2 border-r border-sidebar-border overflow-y-auto">
        <Sidebar isCollapsed={isSidebarCollapsed} currentPath={currentPath} className="h-full" />
      </div>

      {/* Header: Column 2, Row 1 */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* Main Content: Column 2, Row 2 */}
      <main className="overflow-y-auto bg-background">
        <div className="max-w-screen-xl mx-auto p-4 md:p-6 lg:p-8"> {/* Max width from requirements, slightly larger than lg for more space */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
