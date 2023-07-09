export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			entry: {
				Row: {
					body: string;
					created_at: string;
					id: string;
					journal_id: string;
					title: string;
				};
				Insert: {
					body: string;
					created_at?: string;
					id?: string;
					journal_id: string;
					title: string;
				};
				Update: {
					body?: string;
					created_at?: string;
					id?: string;
					journal_id?: string;
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'entry_journal_id_fkey';
						columns: ['journal_id'];
						referencedRelation: 'journal';
						referencedColumns: ['id'];
					}
				];
			};
			journal: {
				Row: {
					created_at: string;
					description: string;
					id: string;
					title: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					description: string;
					id?: string;
					title: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					description?: string;
					id?: string;
					title?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'journal_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
