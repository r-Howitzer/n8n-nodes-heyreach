import { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['lead'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'getLead',
                action: 'Retrieve the details of a specific lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/GetLead',
                        body: {
                            profileUrl: '={{$parameter["profileUrl"]}}',
                        },
                    },
                },
            },
            {
                name: 'Add Tags',
                value: 'addTagsToLead',
                action: 'Add tags to a lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/AddTags',
                        body: {
                            tags: '={{$parameter["tags"]}}',
                            leadProfileUrl: '={{$parameter["additionalFields"]["profileUrl"]}}',
                            leadLinkedInId: '={{$parameter["additionalFields"]["leadLinkedInId"]}}',
                            createTagIfNotExisting: '={{$parameter["createTagIfNotExisting"]}}',
                        },
                    },
                },
            },
            {
                name: 'Get Tags',
                value: 'getTagsForLead',
                action: 'Retrieve all tags for a lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/GetTags',
                        body: {
                            profileUrl: '={{$parameter["profileUrl"]}}',
                        },
                    },
                },
            },
            {
                name: 'Replace Tags',
                value: 'replaceTags',
                action: 'Replace all existing tags for a lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/ReplaceTags',
                        body: {
                            tags: '={{$parameter["tags"]}}',
                            leadProfileUrl: '={{$parameter["additionalFields"]["profileUrl"]}}',
                            leadLinkedInId: '={{$parameter["additionalFields"]["leadLinkedInId"]}}',
                            createTagIfNotExisting: '={{$parameter["createTagIfNotExisting"]}}',
                        },
                    },
                },
            },
        ],
        default: 'getLead',
    },
];