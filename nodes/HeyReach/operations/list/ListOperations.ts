import { INodeProperties } from 'n8n-workflow';

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
                name: 'Get All',
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
                },
            },
            {
                name: 'Delete Leads (By LinkedIn ID)',
                value: 'deleteLeadsFromList',
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
                },
            },
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
        ],
        default: 'getListById',
    },
];