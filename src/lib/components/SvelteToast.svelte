<script lang="ts" context="module">
	import { toast } from "@zerodevx/svelte-toast"
	import Toast from "$lib/components/Toast.svelte"

	export const push = (msg: string, t: "warning" | "info" | "success") => toast.push({
		component: {
			src: Toast,
			props: { t, msg },
		},
		theme: {
			"--toastPadding": 0,
			"--toastBorderRadius": "1rem",
			"--toastMsgPadding": 0,
		}
	})

	export const success = (msg: string) => push(msg, "success")
	export const warning = (msg: string) => push(msg, "warning")
	export const info = (msg: string) => push(msg, "info")
</script>

<script lang="ts">
	import { SvelteToast } from "@zerodevx/svelte-toast"
</script>

<SvelteToast />
