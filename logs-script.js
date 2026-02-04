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
    // Silent fail
  }
  return { publicIp };
}


async function getGeoLocation(ip) {
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    return null;
  }

  const apiUrl = `https://ipinfo.io/${ip}?token=ec32d8dd8fa20f`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const [lat, lon] = data.loc ? data.loc.split(',') : [null, null];

    return {
      country: data.country,
      region: data.region,
      city: data.city,
      postal: data.postal,
      lat,
      lon,
      timezone: data.timezone,
      org: data.org
    };
  } catch (error) {
    return null;
  }
}



async function sendPostRequest() {
  const ipData = await getIpAddresses();

  const geoData = await getGeoLocation(ipData.publicIp);

  if (!geoData) {
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

    await response.json();
  } catch (error) {
    // Silent fail
  }
}

document.addEventListener('DOMContentLoaded', sendPostRequest);
