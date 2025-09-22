import { INodeProperties } from 'n8n-workflow';

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
                name: 'Get All',
                value: 'getConversationsV2',
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
                },
            },
            {
                name: 'Get Chatroom',
                value: 'getChatroom',
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