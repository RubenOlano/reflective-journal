import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params, locals }) => {
	const { session } = await parent();

	if (!session?.user) throw redirect(302, '/signin');

	const { id } = params;

	const { data: journal } = await locals.supabase
		.from('journal')
		.select('*, entry(*)')
		.eq('user_id', session.user.id)
		.eq('id', id)
		.order('created_at', { ascending: false, foreignTable: 'entry' })
		.single();
	if (!journal) throw error(404, 'Journal not found');

	const latest = journal.entry.at(0);
	if (!latest) return { session, journal, id };

	return { session, journal, id };
}) satisfies PageServerLoad;
