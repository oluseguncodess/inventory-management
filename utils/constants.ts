import { LayoutDashboard, Box, Plus, Settings, DollarSign, Truck, Archive, TriangleAlert,  type LucideIcon } from 'lucide-react';

export const sidebar = [
  { id: 0, icon: LayoutDashboard, title: 'Dashboard', path: '/dashboard' },
  { id: 1, icon: Box, title: 'Inventory', path: '/inventory' },
  { id: 2, icon: Plus, title: 'Add product', path: '/add-product' },
  { id: 3, icon: Settings, title: 'Settings', path: '/settings' }
]

export interface Istats {
  id?: number
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  bgColor: string
  progress: 'uptrend' | 'downtrend',
  progressStats: string
}

export const dashboardStats: Istats[] = [
  { id: 0, title: 'Total Value', description: `$1.2M`, icon: DollarSign, iconColor: '#2b7cee', bgColor: '#1c2340', progress: 'uptrend', progressStats: '5.2%' },
  { id: 1, title: 'Total Items', description: `12,450`, icon: Archive, iconColor: '#a855f7', bgColor: '#2a2944', progress: 'uptrend', progressStats: '1.2%' },
  { id: 2, title: 'Low Stock', description: `8 Items`, icon: TriangleAlert, iconColor: '#f97319', bgColor: '#322c2d', progress: 'downtrend', progressStats: '-2%' },
  { id: 3, title: 'Total Orders', description: `14 Items`, icon: Truck, iconColor: '#60a5fa', bgColor: '#233144', progress: 'uptrend', progressStats: '3%' },
]