const { ResourceManagementClient } = require("@azure/arm-resources");
const { SubscriptionClient } = require("@azure/arm-resources-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");
const {
    AuthorizationManagementClient,
    RoleAssignmentCreateParameters,
} = require("@azure/arm-authorization")
require("dotenv").config();


const credential = new DefaultAzureCredential();
const subscriptionId = "";
const resourceClient = new ResourceManagementClient(credential, subscriptionId);
const subscriptionClient = new SubscriptionClient(credential);
const authClient = new AuthorizationManagementClient(credential, subscriptionId);

const resourceGroupName = "";


//resourceGroups.list
async function subscriptions_list() {
    const result_list = [];
    for await (const item of subscriptionClient.subscriptions.list()) {
        result_list.push(item);
    }
    console.log(result_list);
}


//resourceGroups.list
async function resourceGroups_list() {
    const result_list = [];
    for await (const item of resourceClient.resourceGroups.list()) {
        result_list.push(item);
    }
    console.log(result_list);
}


//resourceGroups.get
async function resourceGroups_get() {
    const result_get = await resourceClient.resourceGroups.get(resourceGroupName);
    console.log(result_get);
}


//resources.listByResourceGroup
async function resources_listByResourceGroup() {
    const resultArray = [];
    for await (const item of resourceClient.resources.listByResourceGroup(
        resourceGroupName
    )) {
        resultArray.push(item);
    }
    console.log(resultArray);
}


//resources.list
async function resources_list() {
    const resultArray = [];
    for await (const item of resourceClient.resources.list()) {
        const resource = await resources_getById(item)
        resultArray.push(resource);
        console.log(resource)
    }
}


async function getApiVersion(resourceType) {
    const providerNamespace = resourceType.split('/')[0]
    const provider = await resourceClient.providers.get(providerNamespace);
    return provider.resourceTypes[0].apiVersions[0]
}


//resources.getById
async function resources_getById(resource) {
    const apiVersion = await getApiVersion(resource.type)
    try {
        const get_result = await resourceClient.resources.getById(
            resource.id,
            apiVersion
        );
        return get_result;
    } catch (ex) {
        return resource;
    }
}

async function roleAssignments_list() {
    const list = await authClient.roleAssignments;
    console.log(list)
        // for await (const item of authClient.roleAssignments.list()) {
        //   console.log(item);
        // }
}

resources_list();