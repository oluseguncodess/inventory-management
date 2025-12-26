import { LayoutDashboard, Box, Plus, Settings } from 'lucide-react';

export const sidebar = [
  {id: 0, icon: LayoutDashboard, title: 'Dashboard', path: '/dashboard'},
  {id: 1, icon: Box, title: 'Inventory', path: '/inventory'},
  {id: 2, icon: Plus, title: 'Add product', path: '/add-product'},
  {id: 3, icon: Settings, title: 'Settings', path: '/settings'}
]