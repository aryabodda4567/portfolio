const BASE_URL = "https://portfolio-server-8f94.onrender.com/api/log";

async function getIpAddresses() {
  let publicIp = null;
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    publicIp = data.ip;
  } catch (error) {
    console.error('Error fetching public IP:', error);
  }
  return { publicIp };
}





async function sendPostRequest() {
  const ipData = await getIpAddresses();
  console.log('IP Data:', ipData);

  const geoData = await getGeoLocation(ipData.publicIp);
  console.log('Geo Data:', geoData);

  if (!geoData) {
    console.warn('No geo data to send.');
    return;
  }

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geoData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Server response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error sending POST request:', error);
  }
}

document.addEventListener('DOMContentLoaded', sendPostRequest);
