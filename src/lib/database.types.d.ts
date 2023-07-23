type Jsonb =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Jsonb }
	| Jsonb[]
	| Array<string>
	| Array<number>
type Json = Array<string> | Array<number> | string | Json[] | { [key: string]: Jsonb; length: number }

interface Database {
	public: {
		Tables: {
			customers: {
				Row: {
					id: string
					stripe_customer_id: string | null
				}
				Insert: {
					id: string
					stripe_customer_id?: string | null
				}
				Update: {
					id?: string
					stripe_customer_id?: string | null
				}
			}
			products: {
				Row: {
					id: string
					active: boolean | null
					name: string | null
					description: string | null
					access_role: Database['public']['Enums']['content_access_role'] | null
					image: string | null
					metadata: Json | null
				}
				Insert: {
					id: string
					active?: boolean | null
					name?: string | null
					description?: string | null
					access_role?: Database['public']['Enums']['content_access_role'] | null
					image?: string | null
					metadata?: Json | null
				}
				Update: {
					id?: string
					active?: boolean | null
					name?: string | null
					description?: string | null
					access_role?: Database['public']['Enums']['content_access_role'] | null
					image?: string | null
					metadata?: Json | null
				}
			}
			posts: {
				Row: {
					id: number
					title: string
					content: string
					created_at: string | null
					access_level: Database['public']['Enums']['content_access_role'] | null
				}
				Insert: {
					id?: number
					title: string
					content: string
					created_at?: string | null
					access_level?: Database['public']['Enums']['content_access_role'] | null
				}
				Update: {
					id?: number
					title?: string
					content?: string
					created_at?: string | null
					access_level?: Database['public']['Enums']['content_access_role'] | null
				}
			}
			prices: {
				Row: {
					id: string
					product_id: string | null
					active: boolean | null
					unit_amount: number | null
					currency: string | null
					type: Database['public']['Enums']['pricing_type'] | null
					interval: Database['public']['Enums']['pricing_plan_interval'] | null
					interval_count: number | null
					trial_period_days: number | null
					metadata: Json | null
					description: string | null
				}
				Insert: {
					id: string
					product_id?: string | null
					active?: boolean | null
					unit_amount?: number | null
					currency?: string | null
					type?: Database['public']['Enums']['pricing_type'] | null
					interval?: Database['public']['Enums']['pricing_plan_interval'] | null
					interval_count?: number | null
					trial_period_days?: number | null
					metadata?: Json | null
					description?: string | null
				}
				Update: {
					id?: string
					product_id?: string | null
					active?: boolean | null
					unit_amount?: number | null
					currency?: string | null
					type?: Database['public']['Enums']['pricing_type'] | null
					interval?: Database['public']['Enums']['pricing_plan_interval'] | null
					interval_count?: number | null
					trial_period_days?: number | null
					metadata?: Json | null
					description?: string | null
				}
			}
			subscriptions: {
				Row: {
					id: string
					user_id: string
					status: Database['public']['Enums']['subscription_status'] | null
					metadata: Json | null
					price_id: string | null
					quantity: number | null
					cancel_at_period_end: boolean | null
					created: string
					current_period_start: string
					current_period_end: string
					ended_at: string | null
					cancel_at: string | null
					canceled_at: string | null
					trial_start: string | null
					trial_end: string | null
				}
				Insert: {
					id: string
					user_id: string
					status?: Database['public']['Enums']['subscription_status'] | null
					metadata?: Json | null
					price_id?: string | null
					quantity?: number | null
					cancel_at_period_end?: boolean | null
					created?: string
					current_period_start?: string
					current_period_end?: string
					ended_at?: string | null
					cancel_at?: string | null
					canceled_at?: string | null
					trial_start?: string | null
					trial_end?: string | null
				}
				Update: {
					id?: string
					user_id?: string
					status?: Database['public']['Enums']['subscription_status'] | null
					metadata?: Json | null
					price_id?: string | null
					quantity?: number | null
					cancel_at_period_end?: boolean | null
					created?: string
					current_period_start?: string
					current_period_end?: string
					ended_at?: string | null
					cancel_at?: string | null
					canceled_at?: string | null
					trial_start?: string | null
					trial_end?: string | null
				}
			}

			// ---------------------------------------------- info
			profiles: {
				Row: {
					id: number
					uid: string
					bcuns_id: string
					full_name: string | undefined
					story: string | undefined
					avatar_url: string | undefined
					is_block: boolean
					is_public: number
				}
				Insert: {
					uid?: string
					bcuns_id?: string
					full_name?: string | undefined
					story?: string | undefined
					avatar_url?: string | undefined
					is_block?: boolean
					is_public?: number
				}
				Update: {
					id: string
					bcuns_id?: string
					full_name?: string | null
					story?: string | null
					avatar_url?: string | null
					is_block?: boolean
					is_public?: number
				}
			}
			// ---------------------------------------------- comics
			comics: {
				Row: {
					id: number
					uid: string
					title: string
					like: Json
					view: number
					rating: number
					author: string
					categories: Json
					description: string
					thumbnails: string
					is_publish: boolean
					is_nominate: boolean
					created_at: string
					updated_at: string
					chapters: Array<Database['public']['Tables']['chapters']['Row']>
				}
				Select: {
					id: number
					title: string
					like: Json
					view: number
					rating: number
					author: string
					categories: Json
					description: string
					thumbnails: string
					created_at: string
					updated_at: string
					count_chapter: number
				}
				Insert: {
					id: number
					uid?: string
					title?: string
					like?: Json
					author?: string
					categories?: Json
					description?: string
					thumbnails?: string
					is_publish?: boolean
					is_nominate?: boolean
					created_at?: string
					update_at?: string
				}
				Update: {
					id?: number
					uid?: string
					title?: string
					like?: Json
					author?: string
					categories?: Json
					description?: string
					thumbnails?: string
					is_publish?: boolean
					is_nominate?: boolean
					created_at?: string
					update_at?: string
				}
			}
			chapters: {
				Row: {
					id: string
					comic_id: string
					title: string
					description: string
					view: number
					version: number
					created_at: string
				},
				List: {
					id: string
					title: string
					description: string
					view: number
					created_at: string
				}
			}
			photos: {
				Row: {
					id: string
					chapter_id: string
					title: string
					url: string
				}
			}
			//---------------------------------------------- anime
			anime: {
				Row: {
					id: string
					uid: string
					title: string
					like: Json
					view: number
					rating: number
					author: string
					categories: Json
					description: string
					thumbnails: string
					poster: string
					is_publish: boolean
					is_nominate: boolean //là đề cử
					created_at: string
					updated_at: string
					episodes: Array<Database['public']['Tables']['episodes']['Row']>
				}
			}
			episodes: {
				Row: {
					id: string
					anime_id: string
					title: string
					episode: string
					videos: Array<string>
					created_at: string
					updated_at: string
				}
			}

		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			content_access_role: 'free' | 'basic' | 'premium'
			pricing_type: 'one_time' | 'recurring'
			pricing_plan_interval: 'day' | 'week' | 'month' | 'year'
			subscription_status:
				| 'trialing'
				| 'active'
				| 'canceled'
				| 'incomplete'
				| 'incomplete_expired'
				| 'past_due'
				| 'unpaid'
		}
	}
}
