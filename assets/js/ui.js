// This File Contain All Method/Function That Update or Render UI. 
import ApplicationState from "./ApplicationState.js"
import {categoryContent} from './events.js'

// variable declaration 
let str = ""

// function definations 
export function loading(loadingArea) {
    if (ApplicationState.isLoading) {
        loadingArea.innerHTML = "loading"
    }
}

export default function loadContent(loadContainer, data) {
    if (data) {
        data.map((e) => {
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
        return 0;
    }
    return -1;

}

export function loadCategory(loadContainer, data) {
    if (data) {
        data.map((e) => {
            let CategoryItem = document.createElement('a')
            CategoryItem.href = "#"
            CategoryItem.classList.add('category')
            CategoryItem.addEventListener('click',categoryContent);
            CategoryItem.param = e.id;  
            CategoryItem.innerText = e.snippet.title.split('&')[0];

            // CategoryItem.appendChild(p);
            loadContainer.appendChild(CategoryItem)
        })
    }
    
}