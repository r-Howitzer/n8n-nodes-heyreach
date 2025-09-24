import { INodeProperties } from 'n8n-workflow';

// Get overall stats
export const statsFields: INodeProperties[] = [
    // Required fields
    {
        displayName: 'Account IDs',
        name: 'accountIds',
        type: 'number',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['stats'],
                operation: ['getOverallStats'],
            },
        },
        // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-number
        default: [],
        description: 'Array of LinkedIn sender account IDs to filter by. If empty, all senders are included.',
    },
    {
        displayName: 'Campaign IDs',
        name: 'campaignIds',
        type: 'number',
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['stats'],
                operation: ['getOverallStats'],
            },
        },
        // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-number
        default: [],
        description: 'Array of campaign IDs to filter by. If empty, all campaigns are included.',
    },

    // Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['stats'], 
                operation: ['getOverallStats']
            }
        },
        default: {},
        options: [
            {
                displayName: 'Start Date',
                name: 'startDate',
                type: 'dateTime',
                default: '',
                description: 'Start date filter (ISO 8601 UTC)',
            },
            {
                displayName: 'End Date',
                name: 'endDate',
                type: 'dateTime',
                default: '',
                description: 'End date filter (ISO 8601 UTC)',
            },
        ],
    },
];