# HowitzerLinkedIn-n8n

This project contains custom n8n nodes for integrating with HeyReach and LinkedIn campaigns.

## Features

All features listed in the [HeyReach public API documentation](https://documenter.getpostman.com/view/23808049/2sA2xb5F75) are supported, including campaign management, lead operations, and data retrieval.

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Before running locally make sure `baseURL` which can be found in `HeyReach.node.ts` is set to dev or staging endpoints.
4. Run `npm run build` each time you have change or the for the very first time.
5. Reference the official n8n documentation for running and testing custom nodes locally:  
   [n8n: Run node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/)

## Usage

- Obtain your n8n API key from the HeyReach UI app.
- Use the custom nodes to automate LinkedIn campaign management and lead operations as described in the API documentation.

## Folder Structure

- `nodes/HeyReach/operations/` – Contains folders based on the available features.  
  - Each feature has its own folder.
  - `operations` files specify the category of the endpoints and request params for each API call.
  - `fields` files describe the fields required for each request.
- The starting point for the integration is `HeyReach.node.ts`.  
  - Any new operations should be registered in this file.