// @ts-check

const config = {
  endpoint: "https://intrafizcosdb.documents.azure.com:443/",
  key: "Pl4DrJYaliasta3C9XksnUoogiT6MEsc7XFtnKe5RS9MszsiCoaMP69pl85dTzbnD6z3MwRpm3gjiFLtJMRfLA==",
  databaseId: "db_energy",
  containerId: "cbs_customers",
  partitionKey: { kind: "Hash", paths: ["/CustomerId"] }
};

module.exports = config;
