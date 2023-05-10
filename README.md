# This code send a mail report using a lambda function.

## Example NRQL query
```bash
SELECT percentile(duration, 99) FROM Transaction WHERE appName = 'Plataforma Canales V3' AND name = 'WebTransaction/RestWebService/authorization/{product}/{merchantId} (POST)' limit 2 WHERE merchantId = '650161883' SINCE 2 month ago FACET monthOf(timestamp)
```

## CURL for Postman
```bash
curl --location -g 'https://insights-api.newrelic.com/v1/accounts/2662887/query?nrql=SELECT%20percentile(duration%2C%2099)%20FROM%20Transaction%20WHERE%20appName%20%3D%20%27Plataforma%20Canales%20V3%27%20AND%20name%20%3D%20%27WebTransaction%2FRestWebService%2Fauthorization%2F{product}%2F{merchantId}%20(POST)%27%20limit%202%20WHERE%20merchantId%20%3D%20%27650161883%27%20SINCE%202%20month%20ago%20FACET%20monthOf(timestamp)' \
--header 'Accept: application/json' \
--header 'X-Query-Key: NRIQ-qyyUXD51mCr0Q2ZJNFc9Nfe6PH7Nn29e'
```