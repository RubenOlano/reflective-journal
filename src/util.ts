export const checkPostedToday = <T extends { created_at: string }>(latestEntry?: T) => {
	if (!latestEntry) return false;
	const timePosted = new Date(latestEntry.created_at).setHours(0, 0, 0, 0);
	const timeNow = new Date().setHours(0, 0, 0, 0);
	return timePosted == timeNow;
};
