export interface TrackingLocationEvent {
  id: string;
  statusText: string;
  location: string;
  timestamp: string;
}

export const MOCK_TRACKING_EVENTS: Record<string, TrackingLocationEvent[]> = {
  default: [
    {
      id: 'trk-1',
      statusText: 'Package Prepared & Quality Checked',
      location: 'Central Warehouse, Tejgaon Industrial Area, Dhaka',
      timestamp: 'Today, 09:30 AM',
    },
    {
      id: 'trk-2',
      statusText: 'Dispatched with Furnixo Delivery Vehicle #4',
      location: 'Banani Hub Distribution Center',
      timestamp: 'Today, 11:15 AM',
    },
    {
      id: 'trk-3',
      statusText: 'Out for Delivery to Recipient Address',
      location: 'Gulshan 2 Courier Route',
      timestamp: 'Today, 02:00 PM',
    },
  ],
};
