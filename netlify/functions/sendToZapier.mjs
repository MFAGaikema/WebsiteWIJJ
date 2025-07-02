import fetch from 'node-fetch';

export async function handler(event, context) {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	try {
		const data = JSON.parse(event.body);

		const webhookUrl = process.env.ZAPIER_WEBHOOK;

		const response = await fetch(webhookUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			return { statusCode: 500, body: 'Failed to send data to Zapier' };
		}

		return { statusCode: 200, body: 'Success' };
	} catch (error) {
		return { statusCode: 500, body: 'Server error: ' + error.message };
	}
}
