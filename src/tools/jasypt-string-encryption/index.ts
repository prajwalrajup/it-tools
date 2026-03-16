import { ShieldOff } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Jasypt String Encryption',
  path: '/jasypt-string-encryption',
  description: 'Encrypt and decrypt strings using the Jasypt (Java Simplified Encryption) standard.',
  keywords: ['jasypt', 'java', 'spring', 'boot', 'string', 'encryption'],
  component: () => import('./jasypt-string-encryption.vue'),
  icon: ShieldOff,
  createdAt: new Date('2026-03-15'),
  category: 'Crypto',
});
