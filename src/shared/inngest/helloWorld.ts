import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
	{ id: "hello-world" },
	{ event: "demo/event.sent" },
	async ({ event }) => {
		return {
			message: `Hello ${event.name}!`,
		};
	},
);
