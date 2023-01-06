/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'

type Profiles = Database['public']['Tables']['profiles']['Row']

type Props = {
	session: Session
}



export default function Account({ session }: Props) {
	const supabase = useSupabaseClient<Database>()
	const user = useUser()
	const [loading, setLoading] = useState(true)
	

	const [username, setUsername] = useState<Profiles['bcuns_id']>(undefined)
	const [sex, setsex] = useState<Profiles['story']>(undefined)
	const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>()

	useEffect(() => {
		getProfile()
	}, [session])

	async function getProfile() {
		try {
			setLoading(true)
			if (!user) throw new Error('No user')

			let { data, error, status } = await supabase
				.from('profiles')
				.select()
				.eq('uid', user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUsername(data.bcuns_id)
				setsex(data.story)
				setAvatarUrl(data.avatar_url)
			}
		} catch (error) {
			alert('Error loading user data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	async function updateProfile({
		username,
		sex,
		avatar_url,
	}: {
		username: Profiles['bcuns_id']
		sex: Profiles['story']
		avatar_url: Profiles['avatar_url']
	}) {
		try {
			setLoading(true)
			if (!user) throw new Error('No user')

			const updates = {
				id: user.id,
				username,
				sex,
				avatar_url,
				updated_at: new Date().toISOString(),
			}

			let { error } = await supabase.from('profiles').upsert(updates)
			if (error) throw error
			alert('Profile updated!')
		} catch (error) {
			alert('Error updating the data!')
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	

	

	return (
		<>
			<div className="mt-4">
							<div className="form-widget">
								<div>
									<label htmlFor="email">Email</label>
									<input id="email" type="text" value={session.user.email} disabled />
								</div>
								<div>
									<label htmlFor="username">Username</label>
									<input
										id="username"
										type="text"
										value={username || ''}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="sex">sex</label>
									<input
										id="sex"
										type="sex"
										value={sex || ''}
										onChange={(e) => setsex(e.target.value)}
									/>
								</div>

								<div>
									<button
										className="button primary block"
										onClick={() => updateProfile({ username, sex, avatar_url })}
										disabled={loading}
									>
										{loading ? 'Loading ...' : 'Update'}
									</button>
								</div>

								<div>
									<button className="button block" onClick={() => supabase.auth.signOut()}>
										Sign Out
									</button>
								</div>
							</div>
						</div>
			{/* danh dach truyen tranh sx={{ width: '100%' }} */}

			
		</>
	)
}

// -------------------------------------------- Server-side rendering (SSR) -----------------------------------

