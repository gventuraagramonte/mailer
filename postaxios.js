const Axios = require('axios')

async function trayendoInfo(){
    const info = await Axios.get("https://insights-api.newrelic.com/v1/accounts/2662887/query?nrql=SELECT percentile(duration, 50, 70, 80, 90, 95, 99, 99.9) FROM Transaction WHERE appName = 'Plataforma Canales V3' AND name = 'WebTransaction/RestWebService/authorization/{product}/{merchantId} (POST)' limit max WHERE merchantId = '650161883' SINCE 1 month ago", {
        headers: {
            'Content-Type':'application/json',
            'X-Query-Key': 'NRIQ-qyyUXD51mCr0Q2ZJNFc9Nfe6PH7Nn29e'
        }
    })

    const resultado = info.data.results[0].percentiles
    //const convertJSON = JSON.parse(resultado)

    console.log(resultado)
    console.log(resultado['50'])
}

trayendoInfo().catch(console.error)