import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { cleanNestedExpression } from '../common/CommonFields';

export const leadOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['lead'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'getLead',
                action: 'Retrieve the details of a specific lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/GetLead',
                        body: {
                            profileUrl: '={{$parameter["profileUrl"]}}',
                        },
                    },
                },
            },
            {
                name: 'Add Tags',
                value: 'addTagsToLead',
                action: 'Add tags to a lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/AddTags',
                        body: {
                            tags: '={{$parameter["tags"]}}',
                            leadProfileUrl: '={{$parameter["additionalFields"]["profileUrl"]}}',
                            leadLinkedInId: '={{$parameter["additionalFields"]["leadLinkedInId"]}}',
                            createTagIfNotExisting: '={{$parameter["createTagIfNotExisting"]}}',
                        },
                    },
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const tags = this.getNodeParameter('tags');
                                const createTagIfNotExisting = this.getNodeParameter('createTagIfNotExisting');
                                const leadProfileUrl = cleanNestedExpression(this.getNodeParameter('additionalFields.profileUrl', -1));
                                const leadLinkedInId = cleanNestedExpression(this.getNodeParameter('additionalFields.leadLinkedInId', -1));
                                const body: Record<string, any> = {
                                    tags,
                                    createTagIfNotExisting
                                };  
                                
                                if(leadProfileUrl != -1)
                                    body.leadProfileUrl = leadProfileUrl;
                                if(leadLinkedInId != -1)
                                    body.leadLinkedInId = leadLinkedInId;
                    
                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
            {
                name: 'Get Tags',
                value: 'getTagsForLead',
                action: 'Retrieve all tags for a lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/GetTags',
                        body: {
                            profileUrl: '={{$parameter["profileUrl"]}}',
                        },
                    },
                },
            },
            {
                name: 'Replace Tags',
                value: 'replaceTags',
                action: 'Replace all existing tags for a lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/lead/ReplaceTags',
                        body: {
                            tags: '={{$parameter["tags"]}}',
                            leadProfileUrl: '={{$parameter["additionalFields"]["profileUrl"]}}',
                            leadLinkedInId: '={{$parameter["additionalFields"]["leadLinkedInId"]}}',
                            createTagIfNotExisting: '={{$parameter["createTagIfNotExisting"]}}',
                        },
                    },
                    send: {
                        preSend: [
                            async function (
                                this: IExecuteSingleFunctions,
                                requestOptions: IHttpRequestOptions
                            ): Promise<IHttpRequestOptions> {
                                const tags = this.getNodeParameter('tags');
                                const createTagIfNotExisting = this.getNodeParameter('createTagIfNotExisting');
                                const leadProfileUrl = cleanNestedExpression(this.getNodeParameter('additionalFields.profileUrl', -1));
                                const leadLinkedInId = cleanNestedExpression(this.getNodeParameter('additionalFields.leadLinkedInId', -1));
                                const body: Record<string, any> = {
                                    tags,
                                    createTagIfNotExisting
                                };  

                                if(leadProfileUrl != -1)
                                    body.leadProfileUrl = leadProfileUrl;
                                if(leadLinkedInId != -1)
                                    body.leadLinkedInId = leadLinkedInId;
                    
                                requestOptions.body = body;
                                return requestOptions;
                            }
                        ]
                    }
                },
            },
        ],
        default: 'getLead',
    },
];