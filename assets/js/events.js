import ApplicationState from './ApplicationState.js';
import NetworkRequest from './LogicFunction.js'
import loadContent from './ui.js'
import { loading } from './ui.js';
import { loadCategory } from './ui.js'

// variable declarations 
const mainContent = document.getElementById("mainContent");
const authForm = document.getElementById("authForm");
const SearchBtn = document.getElementById("videoSearch");
const subscriptionBtn = document.getElementById("subscriptionsBtn");
const CHANNEL_ID = "UCW8ZTrL_X38ighAmmznbM0ws"
const CategoryContainer = document.getElementById("listcategory");

// homestate variable 
var homeState = false;

// event defincation 
// loading data in application when it load or Page Refresh
window.addEventListener('load', async function () {
    const url = `https://youtube.googleapis.com/youtube/v3/videos`;
    const url2 = 'https://youtube.googleapis.com/youtube/v3/videoCategories'

    console.log("Pages Loaded Successfully")

    ApplicationState.isLoading = true
    loading(mainContent)
    // Fetching Data From Network Request 
    let result = await NetworkRequest({ url, parameter: 'part=snippet&chart=mostPopular&maxResults=20', CHANNEL_ID })
    let result2 = await NetworkRequest({ url: url2, parameter: 'part=snippet&regionCode=in' })
    ApplicationState.Videos = result.items;
    ApplicationState.Category = result2.items;
    ApplicationState.isLoading = false

    loadContent(mainContent, ApplicationState.Videos)
    loadCategory(CategoryContainer, ApplicationState.Category)
    homeState = true;
})

// loading data for spcific events 
// fetching subscription from API 
subscriptionBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = "https://www.googleapis.com/youtube/v3/subscriptions"

    ApplicationState.isLoading = true
    loadContent(mainContent);
    // Fetching Data From Network Request 
    let result = await NetworkRequest(url, "part=snippet", CHANNEL_ID)
    ApplicationState.Subscription = result
    ApplicationState.isLoading = false
    loadContent(mainContent, ApplicationState.Subscription)
})

// authenticating User and fetching username from user and store in localStorage 
if (authForm != undefined) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // accessing form value after submit event 
        const username = document.getElementById("username").value()

        // verifying the username in youtube database & return channelid 
        data = await verifyUser(username)

        // storing channelid in localStorage & ApplicationState
        channelId = data;
        localStorage.setItem({ 'channelID': channelId })

    })
}

// Search Video for specific Query String 
SearchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = "https://www.googleapis.com/youtube/v3/search";

    const queryString = document.getElementById("videoSearchField").value;
    console.log(queryString)

    // fetching result based on queryString 
    ApplicationState.isLoading = true;
    loading(mainContent)
    let result = await NetworkRequest({ url, parameter: "&part=snippet&maxResult=10", query: queryString, CHANNEL_ID: "" });
    ApplicationState.Videos = result.items
    ApplicationState.isLoading = false;
    loadContent(mainContent, ApplicationState.Videos)
})


// Loading CoisLoadingntent for Specific Category

export const categoryContent = async (e) => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos`;
    let categoryId = e.target.param;
    ApplicationState.isLoading = true
    loading(mainContent)
    // Fetching Data From Network Request 
    let result = await NetworkRequest({ url, parameter: `part=snippet&chart=mostPopular&maxResults=20&videoCategoryId=${categoryId}`, CHANNEL_ID })
    ApplicationState.Videos = result.items;
    ApplicationState.isLoading = false
    loadContent(mainContent, ApplicationState.Videos)
}

