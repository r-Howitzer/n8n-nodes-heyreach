import { INodeProperties } from 'n8n-workflow';

export const myNetworkOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['myNetwork'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'getMyNetworkForSender',
                action: 'Retrieve list of network connections for a sender account',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/MyNetwork/GetMyNetworkForSender',
                        body: {
                            senderId: '={{$parameter["senderId"]}}',
                            pageNumber: '={{$parameter["pageNumber"]}}',
                            pageSize: '={{$parameter["pageSize"]}}',
                        },
                    },
                },
            },
        ],
        default: 'getMyNetworkForSender',
    },
];