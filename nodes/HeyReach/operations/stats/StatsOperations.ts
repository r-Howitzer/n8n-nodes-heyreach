import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { cleanNestedExpression } from '../common/CommonFields';

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
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const accountIds = this.getNodeParameter('accountIds');
                                const campaignIds = this.getNodeParameter('campaignIds');
                                const startDate = cleanNestedExpression(this.getNodeParameter('additionalFields.startDate', -1));
                                const endDate = cleanNestedExpression(this.getNodeParameter('additionalFields.endDate', -1));
                                const body: Record<string, any> = {
                                    campaignIds,
                                    accountIds
                                };  

                                if(startDate != -1)
                                    body.startDate = startDate;
                                if(endDate != -1)
                                    body.endDate = endDate;
                    
                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
        ],
        default: 'getOverallStats',
    },
];