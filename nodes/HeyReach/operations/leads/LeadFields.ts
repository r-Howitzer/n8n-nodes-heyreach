import { INodeProperties } from 'n8n-workflow';

// Common fields
const requiredProfileUrlField: INodeProperties = {
    displayName: 'Profile URL',
    name: 'profileUrl',
    type: 'string',
    default: '',
    required: true,
    description: 'Full LinkedIn profile URL of the lead. Example: https://www.linkedin.com/in/john-doe-123456789/',
};

const requiredTagsField: INodeProperties = {
    displayName: 'Tags',
    name: 'tags',
    type: 'string',
    typeOptions: {
        multipleValues: true,
    },
    default: [],
    required: true,
    description: 'List of tags to add for the lead',
};

const linkedInIdField: INodeProperties = {
    displayName: 'Lead LinkedIn ID',
    name: 'leadLinkedInId',
    type: 'string',
    default: '',
    description: 'LinkedIn ID of the lead (optional if Profile URL is provided)',
};

const profileUrlOptionalField: INodeProperties = {
    ...requiredProfileUrlField,
    required: false,
};

// Get lead by profile URL
const getLead: INodeProperties[] = [
    // Required fields
    {
        ...requiredProfileUrlField,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['getLead'],
            },
        },
    }
];

// Get tags for lead by profile URL
const getTagsForLead: INodeProperties[] = [
    // Required fields
    {
        ...requiredProfileUrlField,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['getTagsForLead'],
            },
        },
    }
];

// Add tags to a lead
const addTagsToLead: INodeProperties[] = [
    // Required fields
    {
        ...requiredTagsField,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['addTagsToLead'],
            },
        },
    },
    {
        displayName: 'Create Tag If Not Existing',
        name: 'createTagIfNotExisting',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['addTagsToLead'],
            },
        },
        default: true,
        description: `If true, tags that do not exist will be created. If false and a tag doesn't exist, a Bad Request response will be returned. Defaults to true.`,
    },

    // Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['lead'], 
                operation: ['addTagsToLead'],
            },
        },
        default: {},
        options: [
            linkedInIdField,
            profileUrlOptionalField,
        ],
    },   
];

// Replace tags for a lead
const replaceTags:  INodeProperties[] = [
    {
        ...requiredTagsField,
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['replaceTags'],
            },
        },
    },
    {
        displayName: 'Create Tag If Not Existing',
        name: 'createTagIfNotExisting',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['replaceTags'],
            },
        },
        default: false,
        description: `If true, creates tags that don't exist. If false and a tag doesn't exist, a Bad Request response will be returned. Defaults to false.`,
    },

    // Additional fields collection
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['lead'], 
                operation: ['replaceTags'],
            },
        },
        default: {},
        options: [
            linkedInIdField,
            profileUrlOptionalField,
        ],
    },   
];

// Export all fields
export const leadFields: INodeProperties[] = [
    ...getLead,
    ...getTagsForLead,
    ...addTagsToLead,
    ...replaceTags,
];