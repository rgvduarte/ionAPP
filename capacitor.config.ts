import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionsportsbiz.app',
  appName: 'ion',
  webDir: 'dist',
  backgroundColor: '#000000',
  ios: { contentInset: 'never' },
  android: { backgroundColor: '#000000' },
};

export default config;
