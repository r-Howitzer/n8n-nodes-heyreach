import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { cleanNestedExpression } from '../common/CommonFields';

export const inboxOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['inbox'],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getConversationsV2',
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
                action: 'Retrieve all LinkedIn conversations',
                routing: {
                    request: {
                        method: 'POST',
                        // DEV NOTE: It is getConversations but the endpoint is using getConvesationsV2
                        url: '/inbox/GetConversations',
                        body: {
                            filters: {
                                linkedInAccountIds: '={{$parameter["additionalFields"]["linkedInAccountIds"]}}',
                                campaignIds: '={{$parameter["additionalFields"]["campaignIds"]}}',
                                searchString: '={{$parameter["additionalFields"]["searchString"]}}',
                                leadLinkedInId: '={{$parameter["additionalFields"]["leadLinkedInId"]}}',
                                leadProfileUrl: '={{$parameter["additionalFields"]["leadProfileUrl"]}}',
                                seen: '={{$parameter["additionalFields"]["seen"]}}',
                            },
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
                                const seen = cleanNestedExpression(this.getNodeParameter('additionalFields.seen', -1));
                                const linkedInAccountIds = cleanNestedExpression(this.getNodeParameter('additionalFields.linkedInAccountIds', -1));
                                const campaignIds = cleanNestedExpression(this.getNodeParameter('additionalFields.campaignIds', -1));
                                const searchString = cleanNestedExpression(this.getNodeParameter('additionalFields.searchString', -1));
                                const leadLinkedInId = cleanNestedExpression(this.getNodeParameter('additionalFields.leadLinkedInId', -1));
                                const leadProfileUrl = cleanNestedExpression(this.getNodeParameter('additionalFields.leadProfileUrl', -1));
                                const filters: Record<string, any> = {};  
                                if (seen != -1)
                                     filters.seen = seen;
                                if (linkedInAccountIds != -1) 
                                    filters.linkedInAccountIds = linkedInAccountIds;
                                if (campaignIds != -1)
                                     filters.campaignIds = campaignIds;
                                if (searchString != -1) 
                                    filters.searchString = searchString;
                                if (leadLinkedInId != -1) 
                                    filters.leadLinkedInId = leadLinkedInId;
                                if (leadProfileUrl != -1) 
                                    filters.leadProfileUrl = leadProfileUrl;

                                requestOptions.body = {
                                    filters,
                                    offset,
                                    limit,
                                };

                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get Chatroom',
                value: 'getChatroom',
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
                action: 'Retrieve a specific LinkedIn conversation and messages',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/inbox/GetChatroom/{{$parameter["accountId"]}}/{{$parameter["conversationId"]}}',
                    }
                },
            },
            {
                name: 'Send Message',
                value: 'sendMessage',
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
                action: 'Send a message to a LinkedIn conversation',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/inbox/SendMessage',
                        body: {
                            message: '={{$parameter["message"]}}',
                            subject: '={{$parameter["subject"]}}',
                            conversationId: '={{$parameter["conversationId"]}}',
                            linkedInAccountId: '={{$parameter["linkedInAccountId"]}}',
                        },
                    },
                },
            },
        ],
        default: 'getConversationsV2',
    },
];