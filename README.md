#  n8n-nodes-heyreach
This is a **HeyReach** Community Node for n8n, enabling seamless integration with **HeyReach** in your workflows.  
**HeyReach** is a powerful LinkedIn automation platform designed to help you scale and optimize your outreach campaigns.  
This project make it easy to manage LinkedIn campaigns and automate your outreach directly from your workflows.

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Installation

## Available Operations

### 🔧 Campaign Management

- **Retrieve all campaigns** – Get a list of all campaigns.
- **Retrieve a campaign** – Get details of a specific campaign.
- **Resume a campaign** – Resume a paused campaign.
- **Pause a campaign** – Pause an active campaign.
- **Stop a lead in campaign** – Stop a specific lead within a campaign.
- **Add leads to campaign** – Add one or multiple leads to a campaign.
- **Retrieve leads from campaign** – Get leads from a campaign.
- **Retrieve campaigns for a lead** – Find all campaigns that a specific lead belongs to.
---

### 💬 Inbox

- **Retrieve all LinkedIn conversations** - Get a list of all LinkedIn conversations.
- **Retrieve a specific LinkedIn conversation and messages** - Retrieve details of a particular LinkedIn conversation along with all associated messages.
- **Send a message to a LinkedIn conversation** - Send a new message to a specific LinkedIn conversation.
---

### 🧑‍💼 Lead

- **Retrieve the details of a specific lead** - Get detailed information about a specific lead.
- **Add tags to a lead** - Add one or more tags to a lead to help categorize or filter.
- **Retrieve all tags for a lead** - Retrieve all tags associated with a specific lead.
- **Replace all existing tags for a lead** - Replace the current tags on a lead with a new set of tags.
---

### 🔗 LinkedIn Account Actions

- **Retrieve a list of LinkedIn accounts** - Get all LinkedIn accounts connected to the system.
- **Retrieve a LinkedIn account** - Get details of a specific LinkedIn account.
---

### 📋 List Actions

- **Retrieve a list** - Get a specific list of leads by ID.
- **Retrieve all lists** - Get all available lead lists.
- **Retrieve leads from a list** - Get all leads within a specific list.
- **Delete leads from a list by LinkedIn ID** - Remove one or more leads from a list using their LinkedIn IDs.
- **Delete leads from a list by LinkedIn profile URL** - Remove leads from a list using their LinkedIn profile URLs.
- **Retrieve companies from a list** - Get all associated companies from a specific list.
- **Add leads to a list** - Add one or more leads to a given list.
- **Retrieve lists associated with a specific lead** - Get all lists that include a specific lead.
- **Create an empty list** - Create a new list with no leads.
---

### 🌐 My Network Actions

- **Retrieve list of network connections for a sender account**  
  Get all network connections associated with a given sender LinkedIn account.

---

### 📊 Stats Actions

- **Retrieve overall statistics**  
  Get general statistics across the system, such as lead or campaign performance.

---

### 🪝 Webhook Actions

- **Retrieve all webhooks** - Get a list of all configured webhooks.
- **Retrieve a single webhook** - Get the details of a specific webhook.

## Setup
### Community Nodes (Recommended)
1. Navigate to **n8n** and sign in.
2. Go to Settings > Community Nodes
3. Click Install
4. Enter `n8n-nodes-heyreach` and click Download
5. Restart your n8n instance
6. The HeyReach node will appear in your node palette
--- 

### Local Setup 
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Before running locally make sure `baseURL` which can be found in `HeyReach.node.ts` is set to dev or staging endpoints.
4. Run `npm run build` each time you have change or the for the very first time.
5. Reference the official [n8n documentation](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for running and testing custom nodes locally

## Credentials
Steps to obtain **API KEY** needed for authentication.
1. Go to **[HeyReach app](https://app.heyreach.io/)** and sign in.
2. Navigate to the **Integrations** section.
3. Find the **n8n** card and click **Connect Now**.
4. Click **New API Key** to generate an API key.
5. **Copy** the generated API key.
6. In **n8n**, create a new **HeyReach connection**.
7. **Paste** the API key into the connection settings and save it.  

✅ That’s it — your HeyReach account is now connected to n8n! 🎉

## Resources

  [HeyReach API documentation](https://documenter.getpostman.com/view/23808049/2sA2xb5F75#61f5ef5d-5f31-4da9-b6af-ef0a6f128146)  
  simon has to change: link to recorded videos.
  

## Folder Structure

- `nodes/HeyReach/operations/` – Contains folders based on the available features.  
  - Each feature has its own folder.
  - `operations` files specify the category of the endpoints and request params for each API call.
  - `fields` files describe the fields required for each request.
- The starting point for the integration is `HeyReach.node.ts`.  
  - Any new operations should be registered in this file.