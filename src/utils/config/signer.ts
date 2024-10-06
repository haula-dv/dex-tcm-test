function base64UrlEncode(buffer: Uint8Array): string {
	const base64 = Buffer.from(buffer).toString("base64");
	// Convert base64 to base64url by replacing characters
	return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

import { getPublicKey, sign } from "@noble/ed25519";
import { encodeBase58 } from "ethers";

export async function signAndSendRequest(
	orderlyAccountId: string,
	privateKey: Uint8Array | string,
	input: URL | string,
	init?: RequestInit | undefined,
): Promise<Response> {
	const timestamp = Date.now();
	const encoder = new TextEncoder();

	const url = new URL(input);
	let message = `${String(timestamp)}${init?.method ?? "GET"}${url.pathname}${url.search}`;
	if (init?.body) {
		message += init.body;
	}

	const orderlySignature = await sign(encoder.encode(message), privateKey);

	return fetch(input, {
		headers: {
			"Content-Type":
				init?.method !== "GET" && init?.method !== "DELETE"
					? "application/json"
					: "application/x-www-form-urlencoded",
			"orderly-timestamp": String(timestamp),
			"orderly-account-id": orderlyAccountId,
			"orderly-key": `ed25519:${encodeBase58(await getPublicKey(privateKey))}`,
			"orderly-signature": base64UrlEncode(orderlySignature), // Using custom base64url encoding function
			...(init?.headers ?? {}),
		},
		...(init ?? {}),
	});
}
