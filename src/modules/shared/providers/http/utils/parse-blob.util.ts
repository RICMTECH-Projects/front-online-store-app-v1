export async function parseBlob(blob: Blob): Promise<unknown> {
	try {
		return JSON.parse(await blob.text());
	} catch {
		return undefined;
	}
}
