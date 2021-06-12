const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");
const fs = require('fs');
const exec = require('child_process').exec;

const newItem = {
  id: "3",
  category: "groceries",
  name: "Cosmos DB",
  description: "Complete Cosmos DB Node.js Quickstart ⚡",
  isComplete: false
};

async function main() {
  
  console.log(JSON.stringify(config));


  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, databaseId, containerId);
  // </CreateClientObjectDatabaseContainer>
  
  try {
    // <QueryItems>
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT * FROM c ORDER BY c.ClientName"
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
    
    fs.appendFile("./items/customers.json", JSON.stringify(items), function (err) {
      if (err) throw err;
      console.log('Items have been written to disk !');
    });
    
    // </QueryItems>
    
    // <CreateItem>
    /** Create new item
     * newItem is defined at the top of this file
     */
    // const { resource: createdItem } = await container.items.create(newItem);
    
    // console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
    // // </CreateItem>
    
    // // <UpdateItem>
    // /** Update item
    //  * Pull the id and partition key value from the newly created item.
    //  * Update the isComplete field to true.
    //  */
    // const { id, category } = createdItem;
    
    // console.log(JSON.stringify(createdItem));
    // console.log("--");
    

    // createdItem.isComplete = true;

    // await setTimeout(() => {  'Updating items...............'; }, 2000)
    
    // const { resource: updatedItem } = await container
    //   .item(id, category)
    //   .replace(createdItem);

    // await setTimeout(() => {  console.log(JSON.stringify(JSON.stringify(updatedItem))); }, 2000)
    
    // console.log(`Updated item: ${updatedItem.id} - ${updatedItem.description}`); 
    // console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);
    // </UpdateItem>
    
    // <DeleteItem>    
    /**
     * Delete item
     * Pass the id and partition key value to delete the item
     */
    // const { resource: result } = await container.item(id, category).delete();
    // console.log(`Deleted item with id: ${id}`);
    // </DeleteItem>  
    
  } catch (err) {
    console.log(err.message);
  }
}

main();
