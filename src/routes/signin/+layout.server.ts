import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const session = await locals.getSession();
	// If the user is logged in redirect to the home page
	if (session?.user) {
		if (url.pathname === '/signin') throw redirect(302, '/');
		return { session };
	}
	return { session: null };
}) satisfies LayoutServerLoad;
