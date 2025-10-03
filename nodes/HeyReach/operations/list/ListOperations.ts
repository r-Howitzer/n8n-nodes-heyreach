import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { cleanNestedExpression } from '../common/CommonFields';

export const listOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['list'],
            },
        },
        options: [
            {
                name: 'Add Leads',
                value: 'addLeadsToList',
                action: 'Add leads to a list',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/list/AddLeadsToList',
                         body: {
                            listId: '={{$parameter["listId"]}}',
                            leads: `={{$parameter["wrapperLeads"]["leads"].map(lead => ({
                                ...lead,
                                customUserFields: lead.customUserFields?.field || []
                            }))}}`,
                        },
                    },
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const listId = this.getNodeParameter('listId');
                                var leadsCleaned = cleanNestedExpression(this.getNodeParameter('leads'));        
                                requestOptions.body = {
                                    listId,
                                    leads: leadsCleaned,
                                };

                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Create Empty',
                value: 'createEmptyList',
                action: 'Create an empty list',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/list/CreateEmptyList',
                        body: {
                            name: '={{$parameter["listName"]}}',
                            type: '={{$parameter["listType"]}}',
                        },
                    },
                },
            },
                        {
                name: 'Delete Leads (By LinkedIn ID)',
                value: 'deleteLeadsFromList',
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
                action: 'Delete leads from a list by LinkedIn ID',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '/list/DeleteLeadsFromList',
                        body: {
                            listId: '={{$parameter["listId"]}}',
                            leadMemberIds: '={{$parameter["leadMemberIds"]}}',
                        },
                    },
                },
            },
            {
                name: 'Delete Leads (By Profile URL)',
                value: 'deleteLeadsFromListByProfileUrl',
                // eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
                action: 'Delete leads from a list by LinkedIn profile URL',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '/list/DeleteLeadsFromListByProfileUrl',
                        body: {
                            listId: '={{$parameter["listId"]}}',
                            profileUrls: '={{$parameter["leadProfileUrls"]}}',
                        },
                    },
                },
            },
            {
                name: 'Get',
                value: 'getListById',
                action: 'Retrieve a list',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/list/GetById',
                        qs: { listId: '={{$parameter["listId"]}}' },
                    },
                },
            },
            {
                name: 'Get Companies',
                value: 'getCompaniesFromList',
                action: 'Retrieve companies from a list',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/list/GetCompaniesFromList',
                        body: {
                            listId: '={{$parameter["listId"]}}',
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
                                const listId = this.getNodeParameter('listId');
                                const keyword = cleanNestedExpression(this.getNodeParameter('additionalFields.keyword', -1));
                                const body: Record<string, any> = {
                                    listId,
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
                name: 'Get Leads',
                value: 'getLeadsFromList',
                action: 'Retrieve leads from a list',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/list/GetLeadsFromList',
                        body: {
                            listId: '={{$parameter["listId"]}}',
                            keyword: '={{$parameter["additionalFields"]["keyword"]}}',
                            leadProfileUrl: '={{$parameter["additionalFields"]["leadProfileUrl"]}}',
                            leadLinkedInId: '={{$parameter["additionalFields"]["leadLinkedInId"]}}',
                            createdFrom: '={{$parameter["additionalFields"]["createdFrom"]}}',
                            createdTo: '={{$parameter["additionalFields"]["createdTo"]}}',
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
                                const listId = this.getNodeParameter('listId');
                                const keyword = cleanNestedExpression(this.getNodeParameter('additionalFields.keyword', -1));
                                const leadProfileUrl = cleanNestedExpression(this.getNodeParameter('additionalFields.leadProfileUrl', -1));
                                const leadLinkedInId = cleanNestedExpression(this.getNodeParameter('additionalFields.leadLinkedInId', -1));
                                const createdFrom = cleanNestedExpression(this.getNodeParameter('additionalFields.createdFrom', -1));
                                const createdTo = cleanNestedExpression(this.getNodeParameter('additionalFields.createdTo', -1));
                                const body: Record<string, any> = {
                                    listId,
                                    offset,
                                    limit
                                };  

                                if(keyword != -1)
                                    body.keyword = keyword;
                                if(leadProfileUrl != -1)
                                    body.leadProfileUrl = leadProfileUrl;
                                if(leadLinkedInId != -1)
                                    body.leadLinkedInId = leadLinkedInId;
                                if(createdFrom != -1)
                                    body.createdFrom = createdFrom;
                                if(createdTo != -1)
                                    body.createdTo = createdTo;

                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get Lists',
                value: 'getListsForLead',
                action: 'Retrieve lists associated with a specific lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/list/GetListsForLead',
                        body: {
                            email: '={{$parameter["additionalFields"]["email"]}}',
                            linkedinId: '={{$parameter["additionalFields"]["linkedinId"]}}',
                            profileUrl: '={{$parameter["additionalFields"]["profileUrl"]}}',
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
                                const email = cleanNestedExpression(this.getNodeParameter('additionalFields.email', -1));
                                const linkedinId = cleanNestedExpression(this.getNodeParameter('additionalFields.linkedinId', -1));
                                const profileUrl = cleanNestedExpression(this.getNodeParameter('additionalFields.profileUrl', -1));
                                const body: Record<string, any> = {
                                    offset,
                                    limit
                                };  

                                if(email != -1)
                                    body.email = email;
                                if(linkedinId != -1)
                                    body.linkedinId = linkedinId;
                                if(profileUrl != -1)
                                    body.profileUrl = profileUrl;
                    
                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get Many',
                value: 'getAllLists',
                action: 'Retrieve all lists',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/list/GetAll',
                        body: {
                            campaignIds: '={{$parameter["additionalFields"]["campaignIds"]}}',
                            keyword: '={{$parameter["additionalFields"]["keyword"]}}',
                            listType: '={{$parameter["additionalFields"]["listType"]}}',
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
                                const campaignIds = cleanNestedExpression(this.getNodeParameter('additionalFields.campaignIds', -1));
                                const listType = cleanNestedExpression(this.getNodeParameter('additionalFields.listType', -1));
                                const keyword = cleanNestedExpression(this.getNodeParameter('additionalFields.keyword', -1));
                                const body: Record<string, any> = {
                                    offset,
                                    limit
                                };  

                                if(campaignIds != -1)
                                    body.campaignIds = campaignIds;
                                if(listType != -1)
                                    body.listType = listType;
                                if(keyword != -1)
                                    body.keyword = keyword;
                    
                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
        ],
        default: 'getListById',
    },
];