export const COOKIE = {
	ACCESS_TOKEN: "agsya"
} as const;

export const QUERY = {
	AFTER_LOGIN: "ab"
} as const;

export const REGEX = {
	USERNAME: /^[a-z0-9][a-z0-9_]{1,18}[a-z0-9]$/i,
	CLASS_NAME: /^[a-z0-9-_.\(\)].*$/i
};
