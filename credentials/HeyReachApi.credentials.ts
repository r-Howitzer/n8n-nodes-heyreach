import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HeyReachApi implements ICredentialType {
	name = 'HeyReachApi';
	displayName = 'HeyReach API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				'X-N8N-KEY': '={{$credentials.apiKey}}',
			},
		},
	} as IAuthenticateGeneric;
}