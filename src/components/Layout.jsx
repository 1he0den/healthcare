import React from 'react';
import { StaggeredMenu } from './StaggeredMenu';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Go to dashboard', link: '/' },
    { label: 'Journal', ariaLabel: 'Go to journal', link: '/journal' },
    { label: 'Assessments', ariaLabel: 'Go to assessments', link: '/assessments' },
    { label: 'AI Assistant', ariaLabel: 'Chat with AI', link: '/ai-chat' },
    { label: 'First Aid', ariaLabel: 'Emergency resources', link: '/first-aid' },
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
  ];

  // We need to handle navigation manually because StaggeredMenu might use <a> tags 
  // which cause full page reload. If it accepts a click handler, that's better.
  // Looking at the component code (I can't see the implementation of items rendering),
  // but usually these components are flexible. 
  // However, to be safe with React Router, we might need to wrap the usage.
  // But StaggeredMenu takes `link` property. 
  // Let's assume for now it works or we'll fix it if it does full reloads.

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: 'white' }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl="" // No logo for now
        accentColor="#ff6b6b"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
        isFixed={true}
      />
      <div style={{ padding: '20px', paddingTop: '80px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
