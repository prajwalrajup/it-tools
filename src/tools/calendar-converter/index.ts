import { Calendar } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calendar Converter',
  path: '/calendar-converter',
  description: 'Convert dates and times between Gregorian, Julian, Hebrew, Islamic, Persian, Mayan, Indian, French Republican, ISO‑8601, Unix time, and Excel serial formats',
  keywords: ['calendar', 'gregorian', 'julian', 'hebrew', 'islamic', 'persian', 'mayan', 'indian', 'french', 'republican', 'iso-8601', 'unix', 'excel', 'converter'],
  component: () => import('./calendar-converter.vue'),
  icon: Calendar,
  createdAt: new Date('2026-02-21'),
  category: 'Data',
});
