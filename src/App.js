import Navigation from './components/Navigation.js'
import Content from './components/Content.js'
import { api } from './api/api.js';
import { crolling } from './api/crolling.js';
import Loading from './components/Loading.js';
export default class App {
    constructor($target){
        const navigation = new Navigation({$target,
            onClick : name =>{
                content.change({name : name})
            },
            onPosts: async (name) => {
                loading.toggleSpinner();
                const response = await api.posts();
                const croll = await crolling.posts("QQQ");
                if(!response.isError){
                    loading.toggleSpinner();
                    content.change({name : name, data : response.data, croll : croll.data})
                } else {
                    loading.toggleSpinner();
                    console.log(response.data);
                }
            },
            onNews: async (name) => {
                loading.toggleSpinner();
                const croll = await crolling.news();
                content.change({name:name,  croll : croll.data})

                if(!croll.isError){
                    // if(!croll.data.nowPrice) 
                    //     croll.data.nowPrice = '데이터가 없습니다.'
                    // content.searchByKeyword(container,croll.data)
                    
                    loading.toggleSpinner();
                } else {
                    console.log(croll);
                    loading.toggleSpinner();
                }
            }

        });
        const content = new Content({$target,
            onSearch: async (container,keyword) => {
                loading.toggleSpinner();
                const croll = await crolling.posts(keyword);
                if(!croll.isError){
                    if(!croll.data.nowPrice) 
                        croll.data.nowPrice = '데이터가 없습니다.'
                    content.searchByKeyword(container,croll.data)
                    loading.toggleSpinner();
                } else {
                    console.log(croll.data);
                    loading.toggleSpinner();
                }
            }
        });   

        const loading = new Loading({
            $target
        });

        
    }
}