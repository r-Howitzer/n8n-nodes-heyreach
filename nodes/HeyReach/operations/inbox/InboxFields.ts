
import { INodeProperties } from 'n8n-workflow';
import { getPaginationFields } from '../common/CommonFields';

// Get Conversations V2 fields
const getConversationsV2Fields: INodeProperties[] = [
    // Required fields
    ...getPaginationFields('inbox', 'getConversationsV2'),

    // Additional fields 
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['inbox'], 
                operation: ['getConversationsV2'],
            }
        },
        default: {},
        options: [
            {
                displayName: 'Campaign IDs',
                name: 'campaignIds',
                type: 'number',
                typeOptions: {
                    multipleValues: true,
                },
                // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-number
                default: [],
                description: 'Filters conversations by associated campaign IDs',
            },
            {
                displayName: 'Lead LinkedIn ID',
                name: 'leadLinkedInId',
                type: 'string',
                default: '',
                description: 'The LinkedIn ID of the lead to filter conversations by',
            },
            {
                displayName: 'Lead Profile URL',
                name: 'leadProfileUrl',
                type: 'string',
                default: '',
                description: 'The full LinkedIn profile URL of the lead. Must follow the format: \'https://www.linkedin.com/in/username/\'.',
            },
            {
                displayName: 'LinkedIn Account IDs',
                name: 'linkedInAccountIds',
                type: 'number',
                typeOptions: {
                    multipleValues: true,
                },
                // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-number
                default: [],
                description: 'Filters conversations by the LinkedIn sender account IDs',
            },
            {
                displayName: 'Search String',
                name: 'searchString',
                type: 'string',
                default: '',
                description: 'A search term to filter conversations (e.g., by message content or participant name)',
            },
            {
                displayName: 'Seen',
                name: 'seen',
                type: 'boolean',
                // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-boolean
                default: null,
                description: 'Whether to filter conversations based on whether they have been seen',
            },
        ],
    },
];

// Get Chatroom fields
const getChatroomFields: INodeProperties[] = [
    // Required fields
    {
        displayName: 'Account ID',
        name: 'accountId',
        type: 'number',
        default: 0,
        required: true,
        description: 'The LinkedIn account ID associated with the conversation',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['getChatroom'],
            },
        },
    },
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the LinkedIn conversation',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['getChatroom'],
            },
        },
    },
];

// Send Message fields
const sendMessageFields: INodeProperties[] = [
    // Required fields
    {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        default: '',
        required: true,
        description: 'The content/body of the message to be sent',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['sendMessage'],
            },
        },
    },
    {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        required: true,
        description: 'The subject of the message',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['sendMessage'],
            },
        },
    },
    {
        displayName: 'Conversation ID',
        name: 'conversationId',
        type: 'string',
        default: '',
        required: true,
        description: 'The unique identifier of the LinkedIn conversation to send the message to',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['sendMessage'],
            },
        },
    },
    {
        displayName: 'LinkedIn Account ID',
        name: 'linkedInAccountId',
        type: 'number',
        default: 0,
        required: true,
        description: 'The LinkedIn account ID that will be used to send the message',
        displayOptions: {
            show: {
                resource: ['inbox'],
                operation: ['sendMessage'],
            },
        },
    },
];

// Export all fields
export const inboxFields: INodeProperties[] = [
    ...getConversationsV2Fields,
    ...getChatroomFields,
    ...sendMessageFields,
];