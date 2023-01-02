import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../src/redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import Layout from '../src/components/layout'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

interface MyAppProps extends  AppProps<{
	initialSession: Session
}>{
	Component:any,
	pageProps:any
}

export default function App({
	Component,
	pageProps,
}: MyAppProps) {
	const [supabase] = useState(() => createBrowserSupabaseClient())

	return (
		<SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
			<Provider store={store}>
				<ThemeProvider forcedTheme={Component.theme || undefined} attribute="class" themes={['dark', 'light']}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</Provider>
		</SessionContextProvider>
	)
}
