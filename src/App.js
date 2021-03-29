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
                try {
                    loading.toggleSpinner();
                    const response = await api.posts();
                    const croll = await crolling.posts("QQQ");

                    if(!response.isError){
                        loading.toggleSpinner();
                        content.change({name : name, data : response.data, croll : croll.data})                       
                    } 

                }catch(e){
                    loading.toggleSpinner();
                    console.log(e)
                }
            },
            onNews: async (name) => {
                loading.toggleSpinner();
                console.log('ons 로딩시작')
                const croll = await crolling.news('nasdaq');
                content.change({name:name,  croll : croll.data})
                console.log('ons 호출')

                if(!croll.isError){
                    // if(!croll.data.nowPrice) 
                    //     croll.data.nowPrice = '데이터가 없습니다.'
                    // content.searchByKeyword(container,croll.data)
                    
                    loading.toggleSpinner();
                    console.log('ons 로딩끝')
                } else {
                    console.log(croll);
                    loading.toggleSpinner();
                    console.log('ons 에러')
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
            },
            onNew: async (result,inputValue) => {
                
                loading.toggleSpinner();
                //console.log('onNew 로딩시작')

               const croll = await crolling.news(inputValue);
                console.log(' onNew 호출 ')
                

                if(!croll.isError){
                    // if(!croll.data.nowPrice) 
                    //     croll.data.nowPrice = '데이터가 없습니다.'
                    // content.searchByKeyword(container,croll.data)
                    content.searchNews(result,croll.data)
                    
                    loading.toggleSpinner();
                    //console.log('onNew 로딩끝')
                } else {
                   // console.log(croll);

                    loading.toggleSpinner();
                    onsole.log('onNew exception')
                }
            }
        });   

        const loading = new Loading({
            $target
        });

        
    }
}