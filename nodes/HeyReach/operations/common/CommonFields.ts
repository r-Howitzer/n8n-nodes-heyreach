import { INodeProperties } from 'n8n-workflow';
import { LIMIT_DESCRIPTION_100, LIMIT_DESCRIPTION_1000, OFFSET_DESCRIPTION } from '../Constants';

/**
 * Generates pagination fields for n8n nodes with a limit of 100.
 * @param resource Resource name
 * @param operation Operation name
 * @returns Array of INodeProperties for pagination
 */
export const getPaginationFields = (
    resource: string,
    operation: string
): INodeProperties[] => [
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        default: 0,
        required: true,
        description: OFFSET_DESCRIPTION,
        displayOptions: {
            show: {
                resource: [resource],
                operation: [operation],
            },
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 10,
        required: true,
        description: LIMIT_DESCRIPTION_100,
        displayOptions: {
            show: {
                resource: [resource],
                operation: [operation],
            },
        },
    },
];

/**
 * Generates pagination fields for n8n nodes with max rows of 1000
 * @param resource Resource name
 * @param operation Operation name
 * @returns Array of INodeProperties for pagination
 */
export const getPaginationFields1000 = (
    resource: string,
    operation: string
): INodeProperties[] => [
    {
        displayName: 'Offset',
        name: 'offset',
        type: 'number',
        default: 0,
        required: true,
        description: OFFSET_DESCRIPTION,
        displayOptions: {
            show: {
                resource: [resource],
                operation: [operation],
            },
        },
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 100,
        required: true,
        description: LIMIT_DESCRIPTION_1000,
        displayOptions: {
            show: {
                resource: [resource],
                operation: [operation],
            },
        },
    },
];

export const leadFields: INodeProperties[] = [
    { 
        displayName: 'First Name', 
        name: 'firstName',
        type: 'string',
        default: '' 
    },
    { 
        displayName: 'Last Name',
        name: 'lastName', 
        type: 'string', 
        default: '' 
    },
    { 
        displayName: 'Profile URL', 
        name: 'profileUrl', 
        type: 'string', 
        default: '' 
    },
    { 
        displayName: 'Location', 
        name: 'location', 
        type: 'string', 
        default: '' 
    },
    { 
        displayName: 'Summary',
        name: 'summary',
        type: 'string',
        default: '' 
    },
    { 
        displayName: 'Company Name', 
        name: 'companyName', 
        type: 'string',
        default: '' 
    },
    { 
        displayName: 'Position', 
        name: 'position', 
        type: 'string', 
        default: '' 
    },
    { 
        displayName: 'About', 
        name: 'about', 
        type: 'string',
        default: '' 
    },
    { 
        displayName: 'Email Address', 
        name: 'emailAddress', 
        type: 'string', 
        default: '' 
    },
    {
        displayName: 'Custom User Fields',
        name: 'customUserFields',
        type: 'fixedCollection',
        typeOptions: { 
            multipleValues: true
        },
        placeholder: 'Add Custom Field',
        default: [],
        options: [
            {
                name: 'field',
                displayName: 'Custom Field',
                values: [
                    { 
                        displayName: 'Name', 
                        name: 'name', 
                        type: 'string', 
                        default: '' 
                    },
                    { 
                        displayName: 'Value', 
                        name: 'value', 
                        type: 'string', 
                        default: '' 
                    },
                ],
            },
        ],
    },
];