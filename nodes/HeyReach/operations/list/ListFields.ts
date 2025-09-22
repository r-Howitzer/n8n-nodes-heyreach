import { INodeProperties } from 'n8n-workflow';
import { getPaginationFields, getPaginationFields1000, leadFields } from '../common/CommonFields';

// Enum for list types
enum ListType {
    USER_LIST = 'USER_LIST',
    COMPANY_LIST = 'COMPANY_LIST',
}

// Label mapping for UI display
const ListTypeLabels: Record<ListType, string> = {
    [ListType.USER_LIST]: 'User List',
    [ListType.COMPANY_LIST]: 'Company List',
};

// Common fields
const listIdField: INodeProperties = {
    displayName: 'List ID',
    name: 'listId',
    type: 'number',
    default: 0,
    required: true,
};

// Get all lists
const getAllListsFields: INodeProperties[] = [
    // Required fields
    ...getPaginationFields('list', 'getAllLists'),

    // Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['list'], 
                operation: ['getAllLists']
            }
        },
        default: {},
        options: [
            {
                displayName: 'Keyword',
                name: 'keyword',
                type: 'string',
                default: '',
                description: 'Search keyword to filter lists by name.',
            },
            {
                displayName: 'Campaign IDs',
                name: 'campaignIds',
                type: 'number',
                typeOptions: {
                    multipleValues: true,
                },
                default: [],
                description: 'Array of campaign IDs to filter lists associated with specific campaigns. Example: [123, 456]',
            },
            {
                displayName: 'List Type',
                name: 'listType',
                type: 'options',
                options: Object.values(ListType).map(value => ({
                    name: ListTypeLabels[value as ListType],
                    value,
                })),
                default: null,
                description: `The type of list to retrieve. Acceptable values: ${Object.keys(ListType).join(', ')}.`,
            },
        ],
    },
];

// Get list by ID
const getListByIdFields: INodeProperties[] = [
    // Required fields
    {
        ...listIdField,
        description: 'The ID of the lead or company list to retrieve.',
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['getListById'],
            },
        },
    },
];

// Get leads from list
const getLeadsFromListFields: INodeProperties[] = [
    // Required fields
    ...getPaginationFields1000('list', 'getLeadsFromList'),
    {
        ...listIdField,
        description: 'The ID of the lead list to retrieve leads from.',
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['getLeadsFromList'],
            },
        },
    },

    // Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['list'], 
                operation: ['getLeadsFromList']
            }
        },
        default: {},
        options: [
            {
                displayName: 'Keyword',
                name: 'keyword',
                type: 'string',
                default: '',
                description: 'A search term to filter leads by lead name or other relevant fields.',
            },
            {
                displayName: 'Lead Profile URL',
                name: 'leadProfileUrl',
                type: 'string',
                default: '',
                description: `The full LinkedIn profile URL of the lead. Must follow the format: 'https://www.linkedin.com/in/username/'. Leave null if not filtering by profile URL.`,
            },
            {
                displayName: 'Lead LinkedIn ID',
                name: 'leadLinkedInId',
                type: 'string',
                default: '',
                description: `The LinkedIn ID of the lead. Can be obtained from other API responses (e.g., 'linkedin_id' field).`,
            },
            {
                displayName: 'Created From',
                name: 'createdFrom',
                type: 'dateTime',
                default: '',
                description: 'Filters leads created on or after this timestamp.',
            },
            {
                displayName: 'Created To',
                name: 'createdTo',
                type: 'dateTime',
                default: '',
                description: 'Filters leads created before or at this timestamp.',
            },
        ],
    },
];

// Delete leads from list
const deleteLeadsFromListFields: INodeProperties[] = [
    // Required fields
    {
        ...listIdField,
        description: 'The ID of the lead list from which the leads will be deleted.',
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['deleteLeadsFromList'],
            },
        },
    },
    {
        displayName: 'Lead Member IDs',
        name: 'leadMemberIds',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        default: [],
        required: true,
        description: `Array of LinkedIn IDs of the leads to be deleted. In API responses, this ID may be called 'linkedin_id'.`,
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['deleteLeadsFromList'],
            },
        },
    },
];

// Delete leads from list by profile URL
const deleteLeadsFromListByProfileUrlFields: INodeProperties[] = [
    // Required fields
    {
        ...listIdField,
        description: 'The ID of the lead list from which the leads will be deleted.',
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['deleteLeadsFromListByProfileUrl'],
            },
        },
    },
    {
        displayName: 'Lead Profile URLs',
        name: 'leadProfileUrls',
        type: 'string',
        typeOptions: {
            multipleValues: true,
        },
        default: [],
        required: true,
        description: `Array of LinkedIn profile URLs of the leads to be deleted. Example: ['https://www.linkedin.com/in/username/']`,
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['deleteLeadsFromListByProfileUrl'],
            },
        },
    },
];

// Add leads to list - it will reference v2
const addLeadsToListFields: INodeProperties[] = [
    // Required fields
    {
        ...listIdField,
        description: 'The ID of the lead list to which the leads will be added.',
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['addLeadsToList'],
            },
        },
    },
    {
        displayName: 'Leads',
        name: 'wrapperLeads',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: [],
        placeholder: 'Add Lead',
        options: [
            {
                name: 'leads',
                displayName: 'Lead',
                values: leadFields,
            },
        ],
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['addLeadsToList'],
            },
        },
    }
];

// Get companies from list
const getCompaniesFromListFields: INodeProperties[] = [
    // Required fields
    ...getPaginationFields1000('list', 'getCompaniesFromList'),
    {
        ...listIdField,
        description: 'The ID of the company list to retrieve companies from.',
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['getCompaniesFromList'],
            },
        },
    },

    // Additional fields 
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['list'], 
                operation: ['getCompaniesFromList']
            }
        },
        default: {},
        options: [
            {
                displayName: 'Keyword',
                name: 'keyword',
                type: 'string',
                default: '',
                description: 'A keyword to filter companies by name or other attributes.',
            },
        ],
    },
];

// Get lists for lead
const getListsForLeadFields: INodeProperties[] = [
    // Required fields
    ...getPaginationFields1000('list', 'getListsForLead'),

    // Additional fields 
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['list'], 
                operation: ['getListsForLead']
            }
        },
        default: {},
        options: [
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
                description: 'The email address of the lead.',
            },
            {
                displayName: 'Lead LinkedIn ID',
                name: 'linkedinId',
                type: 'string',
                default: '',
                description: `The LinkedIn ID of the lead. Can be obtained from other API responses (e.g., 'linkedin_id' field).`,
            },
            {
                displayName: 'Lead Profile URL',
                name: 'profileUrl',
                type: 'string',
                default: '',
                description: `The full LinkedIn profile URL of the lead. Must follow the format: 'https://www.linkedin.com/in/username/'. Leave null if not filtering by profile URL.`,
            },
        ],
    },
];

// Create empty list
const createEmptyListFields: INodeProperties[] = [
    // Required fields
    {
        displayName: 'List Name',
        name: 'listName',
        type: 'string',
        default: '',
        required: true,
        description: 'The name of the list to create.',
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['createEmptyList'],
            },
        },
    },
    {
        displayName: 'List Type',
        name: 'listType',
        type: 'options',
        required: true,
        options: Object.values(ListType).map(value => ({
            name: ListTypeLabels[value as ListType],
            value,
        })),
        default: ListType.USER_LIST,
        description: `The type of list to create. Acceptable values: ${Object.keys(ListType).join(', ')}.`,
        displayOptions: {
            show: {
                resource: ['list'],
                operation: ['createEmptyList'],
            },
        },
    },
];

// Export all fields
export const listFields: INodeProperties[] = [
    ...getAllListsFields,
    ...getListByIdFields,
    ...getLeadsFromListFields,
    ...deleteLeadsFromListFields,
    ...deleteLeadsFromListByProfileUrlFields,
    ...addLeadsToListFields,
    ...getCompaniesFromListFields,
    ...getListsForLeadFields,
    ...createEmptyListFields,
];