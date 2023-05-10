const aws = require("aws-sdk");
const Axios = require("axios");
const ses = new aws.SES({ region: "us-east-1" });

exports.handler = async function (event) {
  const info = await Axios.get(
    "https://insights-api.newrelic.com/v1/accounts/2662887/query?nrql=SELECT percentile(duration, 50, 70, 80, 90, 95, 99, 99.9) FROM Transaction WHERE appName = 'Plataforma Canales V3' AND name = 'WebTransaction/RestWebService/authorization/{product}/{merchantId} (POST)' limit max WHERE merchantId = '650161883' SINCE 1 month ago",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Query-Key": "NRIQ-qyyUXD51mCr0Q2ZJNFc9Nfe6PH7Nn29e",
      },
    }
  );

  const resultado = info.data.results[0].percentiles;
  const percentilone = resultado["50"].toFixed(2);
  const percentiltwo = resultado["70"].toFixed(2);
  const percentilthree = resultado["80"].toFixed(2);
  const percentilfour = resultado["90"].toFixed(2);
  const percentilfive = resultado["95"].toFixed(2);
  const percentilsix = resultado["99"].toFixed(2);
  const percentilseven = resultado["99.9"].toFixed(2);
  const fecha = Date.now();

  let params = {
    Destination: {
      ToAddresses: ["giorgio060392@hotmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: "Test Giorgio" },
        Html: {
          Data: `
            <html>
                <head>
                    <title>Your Token</title>
                    <style>h1{color:#03A9F4;}</style>
                </head>
                <body>
                    <h1>Monitoreo Niubiz</h1>
                    <div>
                        <table style="border: 1px solid black">
                        <p>Percentiles Cencosud Mensual</p>
                            <tr>
                                <th scope="col" style="border: 1px solid black">Percentiles</th>
                                <th style="border: 1px solid black">P50</th>
                                <th style="border: 1px solid black">P70</th>
                                <th style="border: 1px solid black">P80</th>
                                <th style="border: 1px solid black">P90</th>
                                <th style="border: 1px solid black">P95</th>
                                <th style="border: 1px solid black">P99</th>
                                <th style="border: 1px solid black">P99.9</th>
                            </tr>
                            <tr>
                                <th style="border: 1px solid black">Duration</th>
                                <td style="border: 1px solid black">${percentilone}</td>
                                <td style="border: 1px solid black">${percentiltwo}</td>
                                <td style="border: 1px solid black">${percentilthree}</td>
                                <td style="border: 1px solid black">${percentilfour}</td>
                                <td style="border: 1px solid black">${percentilfive}</td>
                                <td style="border: 1px solid black">${percentilsix}</td>
                                <td style="border: 1px solid black">${percentilseven}</td>
                            </tr>
                        </table
                    </div>
                </body>
            </html>`,
        },
      },

      Subject: { Data: `Prueba ${fecha}` },
    },
    Source: "gventura@niubiz.com.pe",
  };

  return ses.sendEmail(params).promise();
};
