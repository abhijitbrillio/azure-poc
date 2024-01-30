const { DefaultAzureCredential } = require("@azure/identity")
const {
    ResourceManagementClient
} = require("@azure/arm-resources")
require('dotenv').config()

const resourceGroupName = "test-group";
const subscriptionId = "05205141-e127-4449-be58-8f276e1df559";
const resourceClient = new ResourceManagementClient(new DefaultAzureCredential(), subscriptionId);

//resourceGroups.get
async function resourceGroups_get() {
    const result_get = await resourceClient.resourceGroups.get(resourceGroupName);
    console.log(result_get);
}

//resourceGroups.checkExistence
async function resourceGroups_checkExistence() {
    const result_check = await resourceClient.resourceGroups.checkExistence(
        resourceGroupName
    );
    console.log(result_check);

    const unknowGroup = "unknowGroup";
    const result_check_unknowGroup = await resourceClient.resourceGroups.checkExistence(
        unknowGroup
    );
    console.log(result_check_unknowGroup);
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
  

// resourceGroups_checkExistence();
resources_listByResourceGroup();