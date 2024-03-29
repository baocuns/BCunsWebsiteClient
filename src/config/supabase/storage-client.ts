import { StorageClient } from '@supabase/storage-js'

const STORAGE_URL: string = process.env.NEXT_PUBLIC_STORAGE_URL || ''
const SERVICE_KEY: string = process.env.NEXT_PUBLIC_SERVICE_KEY || ''

const storageClient = new StorageClient(STORAGE_URL, {
	apikey: SERVICE_KEY,
	Authorization: `Bearer ${SERVICE_KEY}`,
})

export default storageClient
