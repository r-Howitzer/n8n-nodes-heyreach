import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { campaignOperations } from './operations/campaigns/CampaignOperations';
import { campaignFields } from './operations/campaigns/CampaignFields';
import { statsFields } from './operations/stats/StatsFields';
import { statsOperations } from './operations/stats/StatsOperations';
import { webhookFields } from './operations/webhooks/WebhookFields';
import { webhookOperations } from './operations/webhooks/WebhookOperations';
import { listFields } from './operations/list/ListFields';
import { listOperations } from './operations/list/ListOperations';
import { myNetworkFields } from './operations/mynetwork/MyNetworkFields';
import { myNetworkOperations } from './operations/mynetwork/MyNetworkOperations';
import { inboxFields } from './operations/inbox/InboxFields';
import { inboxOperations } from './operations/inbox/InboxOperations';
import { linkedInAccountFields } from './operations/linkedinaccounts/LinkedInAccountFields';
import { linkedInAccountOperations } from './operations/linkedinaccounts/LinkedInAccountOperations';
import { leadFields } from './operations/leads/LeadFields';
import { leadOperations } from './operations/leads/LeadOperations';

export class HeyReach implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HeyReach API',
		name: 'heyReach',
		icon: 'file:heyreach.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with HeyReach API',
		defaults: {
			name: 'HeyReach API',
		},
        inputs: ['main'],
        outputs: ['main'],
		credentials: [
			{
				name: 'heyReachApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.heyreach.io/api/n8n',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Campaign',
						value: 'campaign',
					},
                    { 
                        name: 'Inbox', 
                        value: 'inbox' 
                    },
                    { 
                        name: 'Lead', 
                        value: 'lead' 
                    },
                    { 
                        name: 'LinkedIn Account', 
                        value: 'linkedInAccount' 
                    },
                    { 
                        name: 'List',
                        value: 'list' 
                    },
                    { 
                        name: 'My Network', 
                        value: 'myNetwork' 
                    },
                    { 
                        name: 'Stat', 
                        value: 'stats' 
                    },
                    {   
                        name: 'Webhook', 
                        value: 'webhook' 
                    },
				],
				default: 'campaign',
			},

            ...campaignOperations,
            ...campaignFields,
            ...statsOperations,
            ...statsFields,
            ...webhookOperations,
            ...webhookFields,
            ...myNetworkOperations,
            ...myNetworkFields,
            ...listOperations,
            ...listFields,
            ...inboxOperations,
            ...inboxFields,
            ...linkedInAccountOperations,
            ...linkedInAccountFields,
            ...leadOperations,
            ...leadFields,
		],
	};
}