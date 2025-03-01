'use client'; // Mark as Client Component

import { useEffect } from 'react';

export default function DisableRightClick() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Prevent the context menu from appearing
    };

    // Add event listener for contextmenu
    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null; // This component doesn't render anything
}