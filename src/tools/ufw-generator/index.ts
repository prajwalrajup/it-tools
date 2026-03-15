import { Firetruck } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'UFW Command Generator',
  path: '/ufw-generator',
  description: 'Generate UFW command lines',
  keywords: ['ufw', 'firewall', 'generator'],
  component: () => import('./ufw-generator.vue'),
  icon: Firetruck,
  createdAt: new Date('2026-03-07'),
  category: 'Network',
});
