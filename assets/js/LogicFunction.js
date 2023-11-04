// function for network request for spefic url 
export default async function NetworkRequest(url,parameter) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3c05e5717fmshb9cb14ced90af95p16376fjsn703abfabb9f2',
            'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return result
    } catch (error) {
        console.error(error);
        return error
    }
}
