const API_KEY = "AIzaSyC1T7xMORfnsna4L1uDKUucr8Nj4PbU4MI"

// function for network request for spefic url 
export default async function NetworkRequest(params) {
    let Headers = { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS'
    };

    params.url = params.url + `?key=${API_KEY}&channelId=${params.CHANNEL_ID != undefined?params.CHANNEL_ID:""}&${params.parameter}&q=${params.query}`
    console.log(params.url)
    try {
        const response = await fetch(params.url, Headers);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
        return error
    }
}
