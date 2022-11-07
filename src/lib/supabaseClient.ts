import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/public";

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseKey = env.PUBLIC_SUPABASE_KEY;
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
