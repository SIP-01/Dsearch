import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { BrowserRouter } from 'react-router-dom';
import { NostrLoginProvider } from '@nostrify/react/login';
import NostrProvider from '@/components/NostrProvider';
import { AppProvider } from '@/components/AppProvider';
import { AppConfig } from '@/contexts/AppContext';
import { ENGINE_PROFILE } from '@/lib/engine/profile';
import { getBrowserLanguage } from '@/lib/languageFilter';

interface TestAppProps {
  children: React.ReactNode;
}

export function TestApp({ children }: TestAppProps) {
  const head = createHead();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const defaultConfig: AppConfig = {
    theme: 'light',
    accentColor: ENGINE_PROFILE.branding.defaultAccent,
    privacyMode: false,
    autoIndex: false,
    tabConfig: ENGINE_PROFILE.ui.tabConfig,
    voteWithIdentity: false,
    disabledProviders: ENGINE_PROFILE.search.disabledProviders,
    languageFilter: [getBrowserLanguage()],
    relayMetadata: {
      relays: [
        { url: 'wss://relay.primal.net', read: true, write: true },
      ],
      updatedAt: 0,
    },
    blossomServerMetadata: {
      servers: ['https://blossom.primal.net/'],
      updatedAt: 0,
    },
    useAppBlossomServers: true,
  };

  return (
    <UnheadProvider head={head}>
      <AppProvider storageKey='test-app-config' defaultConfig={defaultConfig}>
        <QueryClientProvider client={queryClient}>
          <NostrLoginProvider storageKey='test-login'>
            <NostrProvider>
              <BrowserRouter>
                {children}
              </BrowserRouter>
            </NostrProvider>
          </NostrLoginProvider>
        </QueryClientProvider>
      </AppProvider>
    </UnheadProvider>
  );
}

export default TestApp;