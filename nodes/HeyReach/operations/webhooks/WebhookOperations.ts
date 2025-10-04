import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { cleanNestedExpression } from '../common/CommonFields';

export const webhookOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['webhook'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'createWebhook',
                action: 'Create a new webhook',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/webhooks/CreateWebhook',
                        body: {
                            webhookName: '={{$parameter["webhookName"]}}',
                            webhookUrl: '={{$parameter["webhookUrl"]}}',
                            eventType: '={{$parameter["eventType"]}}',
                            campaignIds: '={{ $parameter["campaignIds"] ?? [] }}',
                        },
                    },
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const webhookName = cleanNestedExpression(this.getNodeParameter('webhookName', -1));
                                const webhookUrl = cleanNestedExpression(this.getNodeParameter('webhookUrl', -1));
                                const eventType = cleanNestedExpression(this.getNodeParameter('eventType', -1));
                                const campaignIds = cleanNestedExpression(this.getNodeParameter('campaignIds', []));
                                requestOptions.body = {
                                    webhookName,
                                    webhookUrl,
                                    campaignIds,
                                    eventType
                                };

                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Delete',
                value: 'deleteWebhook',
                action: 'Delete a webhook',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '/webhooks/DeleteWebhook',
                        qs: {
                            webhookId: '={{$parameter["webhookId"]}}',
                        },
                    },
                },
            },
            {
                name: 'Get',
                value: 'getWebhookById',
                action: 'Retrieve a single webhook',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/webhooks/GetWebhookById',
                        qs: {
                            webhookId: '={{$parameter["webhookId"]}}',
                        },
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAllWebhooks',
                action: 'Retrieve all webhooks',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/webhooks/GetAllWebhooks',
                        body: {
                            offset: '={{$parameter["offset"]}}',
                            limit: '={{$parameter["limit"]}}',
                        },
                    },
                },
            },
            {
                name: 'Update',
                value: 'updateWebhook',
                action: 'Update an existing webhook',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '/webhooks/UpdateWebhook',
                        qs: { webhookId: '={{$parameter["webhookId"]}}' },
                        body: {
                            webhookName: '={{$parameter["additionalFields"]["webhookName"]}}',
                            webhookUrl: '={{$parameter["additionalFields"]["webhookUrl"]}}',
                            eventType: '={{$parameter["additionalFields"]["eventType"]}}',
                            campaignIds: '={{ ($parameter["additionalFields"]?.["eventType"] === "EVERY_MESSAGE_REPLY_RECEIVED" || $parameter["additionalFields"]?.["eventType"] === "LEAD_TAG_UPDATED") ? [] : $parameter["additionalFields"]?.["campaignIds"] ?? null }}',                            
                            isActive: '={{$parameter["additionalFields"]["isActive"]}}',
                        },
                    },
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const webhookName = cleanNestedExpression(this.getNodeParameter('additionalFields.webhookName', -1));
                                const webhookUrl = cleanNestedExpression(this.getNodeParameter('additionalFields.webhookUrl', -1));
                                var campaignIds = cleanNestedExpression(this.getNodeParameter('additionalFields.campaignIds', -1));
                                const eventType = cleanNestedExpression(this.getNodeParameter('additionalFields.eventType', -1));
                                const isActive = this.getNodeParameter('additionalFields.isActive', -1);
                                const body: Record<string, any> = {};  
                                if(campaignIds == -1)
                                    campaignIds = null;
                                if(webhookName != -1)
                                    body.webhookName = webhookName
                                if(webhookUrl != -1)
                                    body.webhookUrl = webhookUrl
                                if(eventType != -1)
                                    body.eventType = eventType;
                                if(isActive != -1)
                                    body.isActive = isActive;
                                if(eventType === 'EVERY_MESSAGE_REPLY_RECEIVED' || eventType === 'LEAD_TAG_UPDATED')
                                    campaignIds = [];
                                
                                body.campaignIds = campaignIds;
                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
           
        ],
        default: 'createWebhook',
    },
];