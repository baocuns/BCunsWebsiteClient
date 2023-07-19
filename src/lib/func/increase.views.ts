import { SupabaseClient } from '@supabase/auth-helpers-react'

const IncreaseViewsComics = async (
	x: number,
	row_id: number | string,
	supabase: SupabaseClient<Database, 'public', any>
) => {
	supabase
		.rpc('increment_comics', {
			x,
			row_id,
		})
		.then()
}

const IncreaseViewsChapters = (
	x: number,
	row_id: number | string,
	supabase: SupabaseClient<Database, 'public', any>
) => {
	supabase
		.rpc('increment_chapters', {
			x,
			row_id,
		})
		.then()
}

const IncreaseViewsAnimes = (
	x: number,
	row_id: number | string,
	supabase: SupabaseClient<Database, 'public', any>
) => {
	supabase
		.rpc('increment_animes', {
			x,
			row_id,
		})
		.then()
}

const IncreaseViewsEpisodes = (
	x: number,
	row_id: number | string,
	supabase: SupabaseClient<Database, 'public', any>
) => {
	supabase
		.rpc('increment_episodes', {
			x,
			row_id,
		})
		.then()
}

export { IncreaseViewsComics, IncreaseViewsChapters, IncreaseViewsAnimes, IncreaseViewsEpisodes }
