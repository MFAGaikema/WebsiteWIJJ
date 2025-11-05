export async function handler(event) {
	try {
		if (event.httpMethod !== 'POST') {
			return { statusCode: 405, body: 'Method Not Allowed' };
		}

		const data = JSON.parse(event.body);
		const webhookUrl = process.env.MAKE_WEBHOOK_URL;

		const response = await fetch(webhookUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`Webhook error: ${response.statusText}`);
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 500,
			body: JSON.stringify({ success: false, error: err.message }),
		};
	}
}
