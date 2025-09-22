import { INodeProperties } from 'n8n-workflow';

export const statsOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['stats'],
            },
        },
        options: [
            {
                name: 'Get Overall',
                value: 'getOverallStats',
                action: 'Retrieve overall statistics',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/stats/GetOverallStats',
                        body: {
                            accountIds: '={{$parameter["accountIds"]}}',
                            campaignIds: '={{$parameter["campaignIds"]}}',
                            startDate: '={{$parameter["additionalFields"]["startDate"]}}',
                            endDate: '={{$parameter["additionalFields"]["endDate"]}}',
                        },
                    },
                },
            },
        ],
        default: 'getOverallStats',
    },
];