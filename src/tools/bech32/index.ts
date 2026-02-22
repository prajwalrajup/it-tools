import { ZoomMoney } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Bech32 Encoder/Decoder',
  path: '/bech32',
  description: 'Encode/Decode/Validate betch32(m)',
  keywords: ['bech32', 'crypto', 'encode', 'decode', 'bitcoin', 'address', 'segwit'],
  component: () => import('./bech32.vue'),
  icon: ZoomMoney,
  createdAt: new Date('2026-02-21'),
  category: 'Crypto',
});
