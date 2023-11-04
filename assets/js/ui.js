// This File Contain All Method/Function That Update or Render UI. 
import ApplicationState from "./ApplicationState.js"

// variable declaration 
let str = ""

// function definations 
export function loading(loadingArea){
    if(ApplicationState.isLoading){
        loadingArea.innerHTML = "loading"
    }
}

export default function loadContent(loadContainer,data){
    data.map((e)=>{
        let videoCard = `<div class="video-card">
                            <div class="card-img">
                                <img src=${e.snippet.thumbnails.high.url} alt="video-img">
                            </div>
                            <div class="card-body">
                                <h2>${e.snippet.title}</h2>
                            </div>
                        </div>`
        str += videoCard
    })
    loadContainer.innerHTML = str;
    str = ""
}