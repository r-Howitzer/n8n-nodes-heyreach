import { INodeProperties } from 'n8n-workflow';

export const linkedInAccountOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['linkedInAccount'],
            },
        },
        options: [
            {
                name: 'Get All',
                value: 'getAllLinkedInAccounts',
                action: 'Retrieve a list of LinkedIn accounts',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/li_account/GetAll',
                        body: {
                            keyword: '={{$parameter["additionalFields"]["keyword"]}}',
                            offset: '={{$parameter["offset"]}}',
                            limit: '={{$parameter["limit"]}}',
                        },
                    },
                },
            },
            {
                name: 'Get',
                value: 'getLinkedInAccountById',
                action: 'Retrieve a LinkedIn account',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/li_account/GetById',
                        qs: {
                            accountId: '={{$parameter["accountId"]}}',
                        },
                    },
                },
            },
        ],
        default: 'getAllLinkedInAccounts',
    },
];