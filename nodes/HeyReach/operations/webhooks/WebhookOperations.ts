import { INodeProperties } from 'n8n-workflow';

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
                },
            },
           
        ],
        default: 'createWebhook',
    },
];