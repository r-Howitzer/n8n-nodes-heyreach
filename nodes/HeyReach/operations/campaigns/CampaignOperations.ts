import { INodeProperties } from 'n8n-workflow';

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