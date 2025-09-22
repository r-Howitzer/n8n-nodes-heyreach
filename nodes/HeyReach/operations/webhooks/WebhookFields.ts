import { INodeProperties } from 'n8n-workflow';
import { getPaginationFields } from '../common/CommonFields';

export enum WebhookEventType {
    CONNECTION_REQUEST_SENT = 'CONNECTION_REQUEST_SENT',
    CONNECTION_REQUEST_ACCEPTED = 'CONNECTION_REQUEST_ACCEPTED',
    MESSAGE_SENT = 'MESSAGE_SENT',
    MESSAGE_REPLY_RECEIVED = 'MESSAGE_REPLY_RECEIVED',
    INMAIL_SENT = 'INMAIL_SENT',
    INMAIL_REPLY_RECEIVED = 'INMAIL_REPLY_RECEIVED',
    FOLLOW_SENT = 'FOLLOW_SENT',
    LIKED_POST = 'LIKED_POST',
    VIEWED_PROFILE = 'VIEWED_PROFILE',
    CAMPAIGN_COMPLETED = 'CAMPAIGN_COMPLETED',
    LEAD_TAG_UPDATED = 'LEAD_TAG_UPDATED',
    EVERY_MESSAGE_REPLY_RECEIVED = 'EVERY_MESSAGE_REPLY_RECEIVED',
}

export const WebhookEventLabels: Record<WebhookEventType, string> = {
  [WebhookEventType.CONNECTION_REQUEST_SENT]: 'Connection Request Sent',
  [WebhookEventType.CONNECTION_REQUEST_ACCEPTED]: 'Connection Request Accepted',
  [WebhookEventType.MESSAGE_SENT]: 'Message Sent',
  [WebhookEventType.MESSAGE_REPLY_RECEIVED]: 'Message Reply Received',
  [WebhookEventType.INMAIL_SENT]: 'InMail Sent',
  [WebhookEventType.INMAIL_REPLY_RECEIVED]: 'InMail Reply Received',
  [WebhookEventType.FOLLOW_SENT]: 'Follow Sent',
  [WebhookEventType.LIKED_POST]: 'Liked Post',
  [WebhookEventType.VIEWED_PROFILE]: 'Viewed Profile',
  [WebhookEventType.CAMPAIGN_COMPLETED]: 'Campaign Completed',
  [WebhookEventType.LEAD_TAG_UPDATED]: 'Lead Tag Updated',
  [WebhookEventType.EVERY_MESSAGE_REPLY_RECEIVED]: 'Every Message/InMail Reply Received',
};

// Common fields
const webhookIdField: INodeProperties = {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'number',
    default: 0,
    required: true,
};

const webhookNameField: INodeProperties = {
    displayName: 'Webhook Name',
    name: 'webhookName',
    type: 'string',
    default: '',
    description: 'The name of the webhook. Must be between 3 and 25 characters.',
};

const eventTypeField: INodeProperties = {
    displayName: 'Event Type',
    name: 'eventType',
    type: 'options',
    options: Object.values(WebhookEventType).map(value => ({
        name: WebhookEventLabels[value as WebhookEventType],
        value,
    })),
    default: WebhookEventType.CONNECTION_REQUEST_SENT,
    description: `The event type that triggers the webhook.`,
};

const campaignIdsField: INodeProperties = {
    displayName: 'Campaign IDs',
    name: 'campaignIds',
    type: 'number',
    typeOptions: {
        multipleValues: true,
    },
    default: [],
    description: 'A list of campaign IDs to associate with the webhook. If empty, the webhook applies to all campaigns.',
};

const webhookUrlField: INodeProperties = {
    displayName: 'Webhook URL',
    name: 'webhookUrl',
    type: 'string',
    default: '',
}

// ---------- OPERATIONS ----------
// Create webhook
const createWebhookFields: INodeProperties[] = [
    // Required fields
    {
        ...webhookNameField,
        required: true,
        displayOptions: { 
            show: {
                resource: ['webhook'], 
                operation: ['createWebhook']
            }
        },
    },
    {
        ...webhookUrlField,
        displayOptions: { 
            show: {
                resource: ['webhook'], 
                operation: ['createWebhook']
            }
        },
        required: true,
        description: 'The destination URL that will receive POST requests from the webhook. Must be a valid URL.',
    },
    {
        ...eventTypeField,
        displayOptions: { 
            show: {
                resource: ['webhook'], 
                operation: ['createWebhook']
            }
        },
        required: true,
    },
    {
        ...campaignIdsField,
        displayOptions: { 
            show: {
                resource: ['webhook'], 
                operation: ['createWebhook']
            },
            hide: {
                eventType: [
                    WebhookEventType.LEAD_TAG_UPDATED,
                    WebhookEventType.EVERY_MESSAGE_REPLY_RECEIVED,
                ],
            },
        },
    },
];

// Get all webhooks
const getAllWebhooksFields: INodeProperties[] = [
    // Required fields
    ...getPaginationFields('webhook', 'getAllWebhooks'),
];

// Update webhook
const updateWebhookFields: INodeProperties[] = [
    // Required fields
    {
        ...webhookIdField,
        displayOptions: {
            show: {
                resource: ['webhook'], 
                operation: ['updateWebhook']
            }
        },
        description: 'Unique identifier of the webhook to update.',
    },

    // Additional fields
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['webhook'], 
                operation: ['updateWebhook']
            }
        },
        default: {},
        options: [
            webhookNameField,
            eventTypeField,
            campaignIdsField,
            {
                ...webhookUrlField,
                description: 'The URL to which the webhook will send POST requests. Must be a valid URL. Leave null to keep the existing URL.',
            },
            {
                displayName: 'Is Active',
                name: 'isActive',
                type: 'boolean',
                default: false,
                description: 'Indicates whether the webhook is active. Leave null to keep the current status.',
            },
        ],
    },
];

// Get webhook by ID
const getWebhookByIdFields: INodeProperties[] = [
    // Required fields
    {
        ...webhookIdField,
        displayOptions: {
            show: {
                resource: ['webhook'],
                operation: ['getWebhookById'],
            },
        },
        description: 'Unique identifier of the webhook to retrieve',
    },
];

// Delete webhook
const deleteWebhookFields: INodeProperties[] = [
    // Required fields
    {
        ...webhookIdField,
        displayOptions: {
            show: {
                resource: ['webhook'],
                operation: ['deleteWebhook'],
            },
        },
        description: 'Unique identifier of the webhook to delete',
    },
];

// Export All Fields
export const webhookFields: INodeProperties[] = [
    ...createWebhookFields,
    ...updateWebhookFields,
    ...getAllWebhooksFields,
    ...getWebhookByIdFields,
    ...deleteWebhookFields,
];