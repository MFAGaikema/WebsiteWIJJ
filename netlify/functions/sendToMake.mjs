import fetch from 'node-fetch';

export async function handler(event) {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	try {
		const data = JSON.parse(event.body);

		const MAKE_WEBHOOK = process.env.MAKE_WEBHOOK;

		await fetch(MAKE_WEBHOOK, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Form data succesvol verzonden naar Make',
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
}
