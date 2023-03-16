/* eslint-disable react-hooks/rules-of-hooks */
import { SupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Session } from 'inspector'
import { ParsedUrlQuery } from 'querystring'

const createUser = (session: Session | any, supabase: SupabaseClient<Database, 'public', any>) => {
	const user = session?.user
	console.log('user: ', user);
	
	if (user) {
		supabase
			.from('profiles')
			.select()
			.eq('uid', user?.id)
			.then(({ data, error }) => {
				if (data === null || data.length === 0) {
					const profile: Database['public']['Tables']['profiles']['Insert'] = {
						bcuns_id: user?.id,
						uid: user?.id,
						full_name: user?.user_metadata.full_name || user?.email?.split('@')[0],
						story: '',
						avatar_url: user?.user_metadata.avatar_url || 'https://www.baocuns.com/images/BC.png',
					}
					supabase
						.from('profiles')
						.insert(profile)
						.then((error) => {
							console.log(error)
						})
				}
			})
	}
	return
}

export default createUser
