import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { cleanNestedExpression } from '../common/CommonFields';

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
                name: 'Get Many',
                value: 'getAllLinkedInAccounts',
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
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
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const offset = this.getNodeParameter('offset');
                                const limit = this.getNodeParameter('limit');
                                const keyword = cleanNestedExpression(this.getNodeParameter('additionalFields.keyword', -1));
                                const body: Record<string, any> = {
                                    offset,
                                    limit
                                };  

                                if(keyword != -1)
                                    body.keyword = keyword;
                    
                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get',
                value: 'getLinkedInAccountById',
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
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