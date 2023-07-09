import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const { id } = params;
		if (!id) return fail(400, { id, missing: true });
		const formData = await request.formData();

		const title = formData.get('title');
		const body = formData.get('body');

		if (!title) return fail(400, { title, body, missing: true });
		if (!body) return fail(400, { title, body, missing: true });

		const { data: entry } = await locals.supabase
			.from('entry')
			.insert({
				title: title.toString(),
				body: body.toString(),
				journal_id: id
			})
			.select()
			.single();

		if (!entry) return fail(500, { message: 'Failed to create entry' });

		return { success: true, entry };
	}
};
