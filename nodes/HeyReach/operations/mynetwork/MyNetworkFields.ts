import { INodeProperties } from 'n8n-workflow';

// Get my network for sender
export const myNetworkFields: INodeProperties[] = [
    // Required fields
    {
        displayName: 'Sender ID',
        name: 'senderId',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['myNetwork'],
                operation: ['getMyNetworkForSender'],
            },
        },
        default: 0,
        description: 'Unique identifier of the sender LinkedIn account',
        required: true,
    },
    {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['myNetwork'],
                operation: ['getMyNetworkForSender'],
            },
        },
        default: 0,
        description: 'The page number for pagination. Defaults to 0.',
    },
    {
        displayName: 'Page Size',
        name: 'pageSize',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['myNetwork'],
                operation: ['getMyNetworkForSender'],
            },
        },
        default: 10,
        description: 'The page size for pagination, with a maximum of 100. Defaults to 10.',
    },
];