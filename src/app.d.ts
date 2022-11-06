import { NoryClient } from "$lib/nory";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		noryClient: NoryClient | null;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
