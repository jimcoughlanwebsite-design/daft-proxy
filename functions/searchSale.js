// functions/searchSale.js
import fetch from "node-fetch";

export async function handler(event, context) {
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:daft="http://api.daft.ie/v3">
      <soapenv:Header/>
      <soapenv:Body>
        <daft:search_sale>
          <api_key>474286d0c99073889e4de649f980e0e7a06aee7b</api_key>
          <query>house for sale in Dublin</query>
        </daft:search_sale>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await fetch("https://api.daft.ie/v3", {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "SOAPAction": "search_sale"
      },
      body: soapEnvelope
    });

    const text = await response.text();
    return {
      statusCode: 200,
      body: text
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
