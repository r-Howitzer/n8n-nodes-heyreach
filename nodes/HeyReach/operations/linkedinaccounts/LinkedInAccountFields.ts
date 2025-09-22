import { INodeProperties } from 'n8n-workflow';
import { getPaginationFields } from '../common/CommonFields';

// Get LinkedIn account by ID
const getLinkedInAccountById: INodeProperties[] = [
    // Required fields 
    {
        displayName: 'Account ID',
        name: 'accountId',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['linkedInAccount'],
                operation: ['getLinkedInAccountById'],
            },
        },
        default: 0,
        required: true,
        description: 'Unique identifier of the LinkedIn account',
    }
];

// Get all LinkedIn accounts
const getAllLinkedInAccounts: INodeProperties[] = [
    // Required fields 
    ...getPaginationFields('linkedInAccount', 'getAllLinkedInAccounts'),

    // Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['linkedInAccount'],
                operation: ['getAllLinkedInAccounts'],
            },
        },
        options: [
            {
                displayName: 'Keyword',
                name: 'keyword',
                type: 'string',
                default: '',
                description: 'A search keyword to filter LinkedIn accounts by name or other relevant fields',
            },
        ],
    },
];

export const linkedInAccountFields: INodeProperties[] = [
    ...getLinkedInAccountById,
    ...getAllLinkedInAccounts,
];
