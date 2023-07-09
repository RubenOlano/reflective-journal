import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent, locals }) => {
	const { session } = await parent();

	if (!session) throw redirect(302, '/signin');

	const { id } = params;

	// Make sure that the entry is in a journal owned by the user
	const { data: entry } = await locals.supabase
		.from('entry')
		.select('*, journal(id)')
		.eq('id', id)
		.single();
	if (!entry || !entry.journal) throw error(404, 'Entry not found');

	return { entry, session, journalId: entry.journal.id };
}) satisfies PageServerLoad;
