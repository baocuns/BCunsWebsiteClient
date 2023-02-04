const totalViewChapters = (
	chapters: Array<Database['public']['Tables']['chapters']['Row']>
): number => {
	let total: number = 0

	chapters.map((chapter) => {
		total += chapter.view
	})

	return total
}

export default totalViewChapters
