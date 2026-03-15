import { ShieldChevron } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Kubernetes RBAC Generator',
  path: '/k8s-rbac-generator',
  description: 'Generate k8s RBAC policy YAML',
  keywords: ['k8s', 'kubernetes', 'rbac', 'policy', 'generator'],
  component: () => import('./k8s-rbac-generator.vue'),
  icon: ShieldChevron,
  createdAt: new Date('2026-03-07'),
  category: 'Docker',
});
