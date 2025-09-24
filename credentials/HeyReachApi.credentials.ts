import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HeyReachApi implements ICredentialType {
	name = 'heyReachApi';
	displayName = 'HeyReach API';
	documentationUrl = 'https://documenter.getpostman.com/view/23808049/2sA2xb5F75#61f5ef5d-5f31-4da9-b6af-ef0a6f128146';
	properties: INodeProperties[] = [
{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { 
				password: true 
			},
			default: '',
			required: true,
			description: 'Your HeyRach API key. You can find this in HeyReach under integrations and then select the n8n card.',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-N8N-KEY': '={{$credentials.apiKey}}',
			},
		},
	};
}