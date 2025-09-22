
import { INodeProperties } from 'n8n-workflow';
import { getPaginationFields, leadFields } from '../common/CommonFields';

// Common field
const campaignIdField: INodeProperties = {
	displayName: 'Campaign ID',
	name: 'campaignId',
	type: 'number',
	default: 0,
	required: true,
};

// Enum for campaign statuses
enum CampaignStatusPublic {
    DRAFT = 'DRAFT',
    IN_PROGRESS = 'IN_PROGRESS',
    PAUSED = 'PAUSED',
    FINISHED = 'FINISHED',
    CANCELED = 'CANCELED',
    FAILED = 'FAILED',
    STARTING = 'STARTING',
}

// Label mapping for UI display
const CampaignStatusLabels: Record<CampaignStatusPublic, string> = {
    [CampaignStatusPublic.DRAFT]: 'Draft',
    [CampaignStatusPublic.IN_PROGRESS]: 'In Progress',
    [CampaignStatusPublic.PAUSED]: 'Paused',
    [CampaignStatusPublic.FINISHED]: 'Finished',
    [CampaignStatusPublic.CANCELED]: 'Canceled',
    [CampaignStatusPublic.FAILED]: 'Failed',
    [CampaignStatusPublic.STARTING]: 'Starting',
};

// Get all campaigns
const getAllCampaignsFields: INodeProperties[] = [
	// Required fields
	...getPaginationFields('campaign', 'getAll'),

	// Additional fields 
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['campaign'], 
				operation: ['getAll']
			}
		},
		default: {},
		options: [
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				default: '',
				description: 'A search keyword to filter campaigns by name or other relevant text fields. Leave empty to fetch all.'
			},
			{
				displayName: 'Statuses',
				name: 'statuses',
				type: 'multiOptions',
				default: [],
				options: Object.values(CampaignStatusPublic).map(value => ({
					name: CampaignStatusLabels[value as CampaignStatusPublic],
					value,
				})),
				description: `Array of campaign statuses to filter results. Acceptable values: ${Object.values(CampaignStatusPublic).join(', ')}.`,
			},
			{
				displayName: 'Account IDs',
				name: 'accountIds',
				type: 'number',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Array of account IDs to filter results. Enter as a JSON array of integers, e.g., [1, 2, 3]',
			},
		],
	},
];

// Get campaign by ID
const getCampaignByIdFields: INodeProperties[] = [
	// Required fields
	{
		...campaignIdField,
		description: 'The ID of the campaign to retrieve.',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['getById'],
			},
		},
	}
];

// Resume campaign by ID
const resumeCampaignByIdFields: INodeProperties[] = [
	// Required fields
	{
		...campaignIdField,
		description: 'The ID of the campaign to resume.',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['resume'],
			},
		},
	}
];

// Pause campaign by ID
const pauseCampaignByIdFields: INodeProperties[] = [
	// Required fields
	{
		...campaignIdField,
		description: 'The ID of the campaign to pause.',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['pause'],
			},
		},
	}
];

// Stop lead in campaign
const stopLeadInCampaignFields: INodeProperties[] = [
	// Required fields
	{
		...campaignIdField,
		description: 'The ID of the campaign from which to stop the lead.',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['stopLeadInCampaign'],
			},
		},
	},
	{
		displayName: 'Lead Member ID',
		name: 'leadMemberId',
		type: 'string',
		default: '',
		description: `The LinkedIn Member ID of the lead to be stopped (also referred to as 'linkedin_id').`,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['stopLeadInCampaign'],
			},
		},
	},
	{
		displayName: 'Lead URL',
		name: 'leadUrl',
		type: 'string',
		default: '',
		description: 'The LinkedIn profile URL of the lead. For example: https://www.linkedin.com/in/john-doe/.',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['stopLeadInCampaign'],
			},
		},
	},
];

// Add leads to campaign
const addLeadsFields: INodeProperties[] = [
	// Required fields
	{
		...campaignIdField,
		description: 'The ID of the campaign to which leads will be added.',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addLeads'],
			},
		},
	},
	{
		displayName: 'Account Lead Pairs',
		name: 'accountLeadPairs',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: [],
		placeholder: 'Add Account Lead Pair',
		options: [
			{
				name: 'pair',
				displayName: 'Account Lead Pair',
				values: [
					{
						displayName: 'LinkedIn Account ID',
						name: 'linkedInAccountId',
						type: 'number',
						default: null,
					},
					{
						displayName: 'Lead',
						name: 'lead',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: false,
						},
						default: {},
						placeholder: 'Add Lead',
						options: [
							{
								name: 'details',
								displayName: 'Lead Details',
								values: leadFields,
							}
						],
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addLeads'],
			},
		},
	}
];

// Get leads from campaign
const getLeadsFromCampaign: INodeProperties[] = [
	// Required fields
	...getPaginationFields('campaign', 'getLeads'),
	{
		...campaignIdField,
		description: 'The ID of the campaign from which to retrieve leads.',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['getLeads'],
			},
		},
	},

	// Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['campaign'], 
                operation: ['getLeads'],
            },
        },
        default: {},
        options: [
			{
				displayName: 'Time From',
				name: 'timeFrom',
				type: 'dateTime',
				default: '',
				description: 'Filters leads created on or after this timestamp.',
			},
			{
				displayName: 'Time To',
				name: 'timeTo',
				type: 'dateTime',
				default: '',
				description: 'Filters leads created before or at this timestamp.',
			},
			{
				displayName: 'Time Filter',
				name: 'timeFilter',
				type: 'options',
				default: 'Everywhere',
				options: [
					{ name: 'Creation Time', value: 'CreationTime' },
					{ name: 'Everywhere', value: 'Everywhere' },
				],
				description: 'The type of time filter to apply. Valid values: CreationTime, Everywhere. Defaults to Everywhere if not specified.',
			},
        ],
    },   
];

// Get campaigns for a lead
const getCampaignsForLeadFields: INodeProperties[] = [
	// Required fields
	...getPaginationFields('campaign', 'getCampaignsForLead'),
	{
		displayName: 'Profile URL',
		name: 'profileUrl',
		type: 'string',
		default: '',
		description: `The full LinkedIn profile URL of the lead. Must follow the format: 'https://www.linkedin.com/in/username/'. Leave empty if not filtering by profile URL.`,
		displayOptions: {
			show: {
				resource: ['campaign'],		
				operation: ['getCampaignsForLead'],
			},
		},
	},

	// Additional fields 
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['campaign'], 
                operation: ['getCampaignsForLead'],
            },
        },
        default: {},
        options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'The email address of the lead. Leave empty if not filtering by email.',
			},
			{
				displayName: 'LinkedIn ID',
				name: 'linkedinId',
				type: 'string',
				default: '',
				description: `The LinkedIn ID of the lead. Can be obtained from other API responses (e.g., 'linkedin_id' field). Leave empty if not filtering by LinkedIn ID.`,
			},
        ],
    },   
];

// Export all fields
export const campaignFields: INodeProperties[] = [
	...getAllCampaignsFields,
	...getCampaignByIdFields,
	...resumeCampaignByIdFields,
	...pauseCampaignByIdFields,
	...stopLeadInCampaignFields,
	...addLeadsFields,
	...getLeadsFromCampaign,
	...getCampaignsForLeadFields,
];