import {  IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { cleanNestedExpression } from '../common/CommonFields';

export const campaignOperations:  INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['campaign'],
            },
        },
        options: [
            {
                name: 'Add Leads',
                value: 'addLeads',
                action: 'Add leads to campaign',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/campaign/AddLeadsToCampaign',
                        body: {
                            campaignId: '={{$parameter["campaignId"]}}',
                            accountLeadPairs: `={{$parameter["accountLeadPairs"].pair.map(pair => ({
                                    linkedInAccountId: parseInt(pair.linkedInAccountId),
                                    lead: {
                                        ...pair.lead.details,
                                        customUserFields: pair.lead.details.customUserFields?.field || []
                                    }
                                }))}}`,                        
                            },
                    },
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const campaignId = this.getNodeParameter('campaignId');
                                var accountLeadPairsCleaned = cleanNestedExpression(this.getNodeParameter('accountLeadPairs'));        
                                requestOptions.body = {
                                    campaignId,
                                    accountLeadPairs: accountLeadPairsCleaned,
                                };

                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get',
                value: 'getById',
                action: 'Retrieve a campaign',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/campaign/GetById',
                        qs: {
                            campaignId: '={{$parameter["campaignId"]}}',
                        },
                    },
                },
            },
            {
                name: 'Get Leads',
                value: 'getLeads',
                action: 'Retrieve leads from campaign',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/campaign/GetLeadsFromCampaign',
                        body: {
                            campaignId: '={{$parameter["campaignId"]}}',
                            timeFrom: '={{$parameter["additionalFields"]["timeFrom"]}}',
                            timeTo: '={{$parameter["additionalFields"]["timeTo"]}}',
                            timeFilter: '={{$parameter["additionalFields"]["timeFilter"]}}',
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
                                const campaignId = this.getNodeParameter('campaignId');
                                const offset = this.getNodeParameter('offset');
                                const limit = this.getNodeParameter('limit');
                                const timeFrom = cleanNestedExpression(this.getNodeParameter('additionalFields.timeFrom', -1));
                                const timeTo = cleanNestedExpression(this.getNodeParameter('additionalFields.timeTo', -1));
                                const timeFilter = cleanNestedExpression(this.getNodeParameter('additionalFields.timeFilter', -1));
                                const body: Record<string, any> = {
                                    campaignId,
                                    offset,
                                    limit
                                };  

                                if(timeFrom != -1)
                                    body.timeFrom = timeFrom;
                                if(timeTo != -1)
                                    body.timeTo = timeTo;
                                if(timeFilter != -1)
                                    body.timeFilter = timeFilter;

                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Retrieve all campaigns',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/campaign/GetAll',
                        body: {
                            keyword: '={{$parameter["additionalFields"]["keyword"]}}',
                            statuses: '={{$parameter["additionalFields"]["statuses"]}}',
                            accountIds: '={{$parameter["additionalFields"]["accountIds"]}}',
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
                                const statuses = cleanNestedExpression(this.getNodeParameter('additionalFields.statuses', -1));
                                const accountIds = cleanNestedExpression(this.getNodeParameter('additionalFields.accountIds', -1));
                                const body: Record<string, any> = {
                                    offset,
                                    limit
                                };  

                                if(keyword != 1)
                                    body.keyword = keyword;
                                if(statuses != -1)
                                    body.statuses = statuses;
                                if(accountIds != -1)
                                    body.accountIds = accountIds;

                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get Many For Lead',
                value: 'getCampaignsForLead',
                action: 'Retrieve campaigns for a lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/campaign/GetCampaignsForLead',
                        body: {
                            email: '={{$parameter["additionalFields"]["email"]}}',
                            linkedinId: '={{$parameter["additionalFields"]["linkedinId"]}}',
                            profileUrl: '={{$parameter["profileUrl"]}}',
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
                                const profileUrl = this.getNodeParameter('additionalFields.profileUrl', -1);
                                const email = cleanNestedExpression(this.getNodeParameter('additionalFields.email', -1));
                                const linkedinId = cleanNestedExpression(this.getNodeParameter('additionalFields.linkedinId', -1));
                                const body: Record<string, any> = {
                                    offset,
                                    limit
                                };  

                                if(profileUrl != -1)
                                    body.profileUrl = profileUrl;
                                if(email != -1)
                                    body.email = email;    
                                if(linkedinId != -1)
                                    body.linkedinId = linkedinId;

                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Pause',
                value: 'pause',
                action: 'Pause a campaign',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/campaign/Pause',
                        qs: { 
                            campaignId: '={{$parameter["campaignId"]}}' 
                        },
                        body: {},
                    },
                },
            },
            {
                name: 'Resume',
                value: 'resume',
                action: 'Resume a campaign',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/campaign/Resume',
                        qs: { 
                            campaignId: '={{$parameter["campaignId"]}}'
                        },
                        body: {},
                    },
                },
            },
            {
                name: 'Stop Lead',
                value: 'stopLeadInCampaign',
                action: 'Stop a lead in campaign',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/campaign/StopLeadInCampaign',
                        body: {
                            campaignId: '={{$parameter["campaignId"]}}',
                            leadMemberId: '={{$parameter["leadMemberId"]}}',
                            leadUrl: '={{$parameter["leadUrl"]}}',
                        },
                    },
                },
            },
        ],
        default: 'getById',
    },
];