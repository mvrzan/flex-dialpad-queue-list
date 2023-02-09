<a  href="https://www.twilio.com">
<img  src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg"  alt="Twilio"  width="250"  />
</a>

# Twilio Flex Dialpad Filtered Queue List

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## How it works

The _Dialpad Filtered Queue List_ replaces the out-of-the-box queue dropdown component with a custom component that displays the queues the worker is assigned to, instead of a list of all queues available.

![](./screenshots/flex_dialpad_queue_list.gif)

In case there are no queues selected or assigned to an agent, the default queue from the Flex service configure will be used for an outbound call.

![](./screenshots/flex_dialpad_no_queues.gif)

## How is the queue list being filtered?

When the component mounts (agent opens the dialpad) the plugin will make a call to the `/get-filtered-queues.js` Twilio serverless function.

This function will then call the [TaskRouter API](https://www.twilio.com/docs/taskrouter/api/task-queue#action-list) by passing in the `workerSid` which results in a list of TaskQueues matched by a given Worker.

This information is then sent back to the Flex plugin and it then renders the options for an agent.

## Architectural diagram

The below architectural diagram is a representation of involved Twilio services for this plugin:

**IN PROGRESS**

## General code architecture

The code in this example is following the [Twilio Professional Services template](https://github.com/twilio-professional-services/flex-project-template).

#### Supported Flex version

This plugin only supports Twilio Flex v2.x.

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

# Configuration

## Requirements

To deploy this plugin, you will need:

- An active Twilio account with Flex provisioned. Refer to the [Flex Quickstart](https://www.twilio.com/docs/flex/quickstart/flex-basics#sign-up-for-or-sign-in-to-twilio-and-create-a-new-flex-project%22) to create one.
- npm version 5.0.0 or later installed (type `npm -v` in your terminal to check)
- Node.js version 12 or later installed (type `node -v` in your terminal to check). _Even_ versions of Node are. **Note:** In order to install Twilio Flex CLI plugin that is needed for locally running Flex, Node version 16 is the latest supported version (if you are using Node 18., please revert back or use Node Version Manager).
- [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli) along with the [Flex CLI Plugin](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins) and the [Serverless Plugin](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins). Run the following commands to install them:

```
# Install the Twilio CLI
npm install twilio-cli -g
# Install the Serverless and Flex as Plugins
twilio plugins:install @twilio-labs/plugin-serverless
twilio plugins:install @twilio-labs/plugin-flex
```

- Once the Twilio CLI and Twilio Flex CLI plugins are successfully installed, configure your [Twilio CLI profile](https://www.twilio.com/docs/twilio-cli/general-usage). **Note:** This step is required if you are running Twilio CLI for the first time or if you have multiple Twilio CLI profiles configured.

## Setup

Install the dependencies by running `npm install`:

```bash
cd flex-dialpad-queue-list
cd ../flex-dialpad-queue-list
npm install
```

From the root directory, rename `public/appConfig.example.js` to `public/appConfig.js`.

```bash
mv public/appConfig.example.js public/appConfig.js
```

## Serverless Functions

### Deployment

Create the Serverless config file by copying `.env.example` to `.env`.

```bash
cd serverless
cp .env.example .env
```

Edit `.env` and set these variables with the Sids from your account.

```bash
# The following values are example references only
TWILIO_SERVICE_RETRY_LIMIT=5
TWILIO_SERVICE_MIN_BACKOFF=100
TWILIO_SERVICE_MAX_BACKOFF=300
```

Next, deploy the Serverless functions:

```bash
cd serverless
twilio serverless:deploy

```

**Note**: If you need to re-deploy the serverless functions, they will re-deploy whatever agent extensions JSON file lives in the source control. This means you will lose all of the changes from Sync Map. Once you've deployed the serverless functions, simply publish the changes from the UI.

Additional option is to create a script to fetch the lates JSON file directly from Sync Map and include that as your build artifact.

After successfully deploying your function, you should see at least the following:

```bash
✔ Serverless project successfully deployed


Deployment Details
Domain: xxx-xxx-xxxx-dev.twil.io

Functions:
   https://xxx-xxx-xxxx-dev.twil.io/getQueues
(more)
```

Your functions will now be present in the Twilio Functions Console and be part of the "serverless" service. Copy the base URL from the function.

## Flex Plugin

### Development

Create the plugin config file by copying `.env.example` to `.env`.

```bash
cd flex-dialpad-queue-list
cp .env.example .env
```

Edit `.env` and set the `FLEX_APP_FUNCTIONS_BASE` variable to your Twilio Functions base URL (like https://xxx-serverless-xxxx-dev.twil.io/).

To run the plugin locally, you can use the Twilio Flex CLI plugin. Using your command line, run the following from the root directory of the plugin.

```bash
cd flex-dialpad-queue-list
twilio flex:plugins:start
```

This will automatically start up the webpack dev server and open the browser for you. Your app will run on `http://localhost:3000`.

When you make changes to your code, the browser window will be automatically refreshed.

### Deploy your Flex Plugin

Once you are happy with your Flex plugin, you have to deploy then release it on your Flex application.

Run the following command to start the deployment:

```bash
twilio flex:plugins:deploy --major --changelog "Releasing Flex dialpad queue list plugin" --description "Flex dialpad queue list plugin"
```

After running the suggested next step, navigate to the [Plugins Dashboard](https://flex.twilio.com/admin/) to review your recently deployed plugin and confirm that it’s enabled for your contact center.

**Note:** Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.

You are all set to test this plugin on your Flex application!

## Deployment to QA, Staging and Production environments

### CLI Profiles

Create Twilio CLI Profiles for each environment using

`twilio profiles:create`

This command will prompt your for the Account Sid, Auth Token and and a name/label for the profile. We recommend that the Profile Name matches the Twilio Account name to avoid confusion

To switch between profiles:

`twilio profiles:use "ProfileName"`

To check the configured profiles:

`twilio profiles:list`

### Serverless

Follow the steps in this [guide](https://www.twilio.com/docs/labs/serverless-toolkit/deploying) to deploy Serverless functions to multiple accounts/environment.

Using `.env.example` create `.env.stage` and `.env.prod` files and update each with the correct resource Sids from the respective account.
Note: Make sure your .gitignore contains the names of these files so they will be excluded from any commit to your repo.

After switching the CLI to use a different profile (i.e. Account Sid), you can use these commands to deploy the serverless functions with the correct set of environment variables.

`twilio serverless:deploy --env .env.stage --environment=staging`

`twilio serverless:deploy --env .env.prod --environment=production`

### Plugin

Follow the steps in this [guide](https://www.twilio.com/docs/flex/developer/plugins/environment-variables) to configure your plugin for deployment to multiple environments.

Using `.env.example` create `.env.stage` and `.env.prod` files and update each with the correct resource Sids from the respective account.
Note: Make sure your .gitignore contains the names of these files so they will be excluded from any commit to your repo.

To deploy your plugin to specific accounts/environments use these commands:

`twilio flex:plugins:deploy --profile:StageProfileName`

`twilio flex:plugins:deploy --profile:ProdProfileName`

## Preventing conflicting configuration updates

The Flex plugin loads the configuration interface for supervisor, of which there may be more than one. Therefore, it is a possibility that multiple people may attempt to update the extensions asset at the same time. To prevent workers overwriting each other's changes, a few guards have been put in place:

- When updating configuration with the `admin/update` function, the `version` property must be provided with the same `version` that was retrieved from the `admin/list` function which loaded the initial data. If this does not match, the request will fail. In the user interface, the following alert will be shown: `Routes were updated by someone else and cannot be published. Please reload and try again.` This allows the worker to rescue the changes they were attempting to make, and merge them with the changes that were saved first.
- When retrieving configuration from this `admin/list` function, a check is made that the latest build is what is deployed. The `versionIsDeployed` property is returned indicating whether this is the case. If it is not, this means another user is in the middle of publishing changes. In the user interface, the following alert will be shown: `Another route publish is in progress. Publishing now will overwrite other changes.` This allows the worker to wait for the publish to complete before making changes.

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.
