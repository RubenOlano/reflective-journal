import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		if (url.pathname !== '/signin') throw redirect(302, '/signin');
		return { session: null };
	}

	return { session };
};
