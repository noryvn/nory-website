import { NoryClient } from "./noryClient";
import { PUBLIC_NORY_ENDPOINT } from "$env/static/public";

export const noryClient = new NoryClient(PUBLIC_NORY_ENDPOINT, null);

export * from "./noryClient";
