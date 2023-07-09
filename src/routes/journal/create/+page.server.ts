import { error, fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session?.user) {
			throw error(401, { message: 'Must be logged in to create a journal' });
		}

		const data = await request.formData();
		const title = data.get('title');
		const description = data.get('description');
		if (!title) return fail(400, { title, missing: true });
		if (!description) return fail(400, { description, missing: true });

		// Check duplicate name
		const { data: existing } = await locals.supabase
			.from('journal')
			.select('id')
			.eq('title', title.toString());

		if (existing?.length !== 0) return fail(400, { title, duplicate: true });

		const { data: newJournal } = await locals.supabase
			.from('journal')
			.insert({
				title: title.toString(),
				description: description.toString(),
				user_id: session.user.id
			})
			.select()
			.single();

		if (!newJournal) return fail(500, { message: 'Failed to create journal' });

		return { success: true, id: newJournal.id };
	}
};
