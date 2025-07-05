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

 async function getGeoLocation(ip) {
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    console.log(`Skipping Geo-IP lookup for private/localhost IP: ${ip}`);
    return null;
  }

  const key = "ec32d8dd8fa20f";
  const apiUrl = `https://ipinfo.io/${ip}?token=${key}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const [lat, lon] = data.loc.split(',');

    return {
      country: data.country,
      region: data.region,
      city: data.city,
      zip: data.postal,
      lat,
      lon,
      timezone: data.timezone,
      org: data.org
    };
  } catch (error) {
    console.error('Error fetching geo location:', error);
    return null;
  }
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
