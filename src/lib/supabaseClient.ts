import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_KEY;
const supabaseOptions = {
	auth: {
		autoRefreshToken: true,
		parsistSession: true
	}
} as const;

export const supabaseClient = createClient(supabaseUrl, supabaseKey, supabaseOptions);

export interface EmailCredentials {
	email: string;
	password: string;
}
