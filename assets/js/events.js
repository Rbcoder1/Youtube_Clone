import ApplicationState from './ApplicationState.js';
import NetworkRequest from './LogicFunction.js'
import loadContent from './ui.js'
import {loading} from './ui.js';

// variable declarations 
const mainContent = document.getElementById("mainContent");
// event defincation 
// loading data in application when it load or Page Refresh
window.addEventListener('load',async function(){
    const url = 'https://youtube-v311.p.rapidapi.com/activities/?part=snippet&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=15';

    console.log("Pages Loaded Successfully")

    ApplicationState.isLoading = true
    loading(mainContent)
    // Fetching Data From Network Request 
    let result = await NetworkRequest(url,'none')
    ApplicationState.Videos = result.items;
    loadContent(mainContent,ApplicationState.Videos)
    ApplicationState.isLoading = false
    console.log(result)
})