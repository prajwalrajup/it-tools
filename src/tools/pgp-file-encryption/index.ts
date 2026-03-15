import { CloudLock } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'PGP File Encryption',
  path: '/pgp-file-encryption',
  description: 'Encrypt and decrypt files using PGP',
  keywords: ['pgp', 'file', 'encryption'],
  component: () => import('./pgp-file-encryption.vue'),
  icon: CloudLock,
  createdAt: new Date('2026-03-07'),
  category: 'Crypto',
});
