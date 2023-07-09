import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		if (!url.pathname.startsWith('/signin')) throw redirect(302, '/signin');
		return { session, journals: [] };
	}
	const { data: journals } = await locals.supabase
		.from('journal')
		.select('*, entry(created_at)')
		.eq('user_id', session.user.id)
		.order('created_at', { ascending: false, foreignTable: 'entry' })
		.limit(1, { foreignTable: 'entry' });

	return { session, journals: journals ?? [] };
}) satisfies PageServerLoad;
