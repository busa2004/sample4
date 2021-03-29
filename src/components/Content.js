import Card from './Card.js';

export default class Content{
    constructor({$target,onSearch,onNew}){
        this.data = {name: 'home'}
        this.onSearch = onSearch
        this.content = document.createElement('div');
        this.content.className = 'content'
        this.onNew = onNew
        this.url = {
            fearAndGrid : 'https://money.cnn.com/registry/html/.element/img/8.0/data/feargreed/1.png',
            fearAndGridBitCoin : 'https://alternative.me/crypto/fear-and-greed-index.png',
            nasdaq : '//tvcharts.investing.com/init.php?&carrier=4514a7c0ea00d6885dce8de9a7b60e0f&time=1573560994&domain_ID=1&lang_ID=1&timezone_ID=8&pair_ID=14958&interval=86400&refresh=4&session=24x7&client=&user=guest&width=650&height=750&init_page=instrument&m_pids=&watchlist=&site=https://www.investing.com',
            snp500 : 'https://s.tradingview.com/dailyfx/widgetembed/?frameElementId=tradingview_7ad27&symbol=CME_MINI_DL%3AES1!&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f4f7f9&studies=%5B%5D&hideideas=1&theme=White&timezone=exchange&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=www.dailyfx.com&utm_medium=widget&utm_campaign=chart&utm_term=CME_MINI_DL%3AES1!',
            dow : '//tvcharts.investing.com/init.php?&carrier=7ea87191f3c2f1a52d5cdbca8608f90d&time=1573287606&domain_ID=1&lang_ID=1&timezone_ID=8&pair_ID=169&interval=86400&refresh=4&session=24x7&client=&user=guest&width=650&height=750&init_page=instrument&m_pids=&watchlist=&site=https://www.investing.com',
            doller : '//tvc4.forexpros.com/init.php?family_prefix=tvc4&carrier=47010556d9fc07edd72fbaca8a47ebff&domain_ID=18&lang_ID=18&timezone_ID=88&pair_ID=650&interval=900&refresh=6&session=24x3650&client=&user=guest&width=970&height=800&init_page=live-charts&m_pids=&watchlist=650,3,159,1,5,21,8827,158,2,9,4,7,11,8,49,2111,2186&site=https://kr.investing.com',
            bond10 : '//tvc4.forexpros.com/init.php?family_prefix=tvc4&carrier=e81b4cbf5ef0c4c3c2b56ca1f6b9f7fc&time=1524537658&domain_ID=18&lang_ID=18&timezone_ID=88&pair_ID=23705&interval=86400&refresh=16&session=24x7&client=&user=guest&width=650&height=750&init_page=instrument&m_pids=&watchlist=&site=https://kr.investing.com',
            vix : 'http://tvc-invdn-com.akamaized.net/web/1.12.27/index59-prod.html?carrier=e96a58b295fbc250dc894e59e0865a65&time=1533689092&domain_ID=18&lang_ID=18&timezone_ID=88&version=1.12.27&locale=ko&timezone=Asia/Seoul&pair_ID=44336&interval=D&session=24x7&prefix=kr&suffix=_kr&client=0&user=guest&family_prefix=tvc4&init_page=instrument&sock_srv=https://stream96.forexpros.com:443&m_pids=&watchlist=&geoc=KR&site=https://kr.investing.com'
        }

        $target.appendChild(this.content)
        
        this.render()
        
    }

    change(data){

        this.data = data
        this.render()
    }

    setList(table,data){
        
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const price = document.createElement('td'); 
        const count = document.createElement('td');
        const now = document.createElement('td');
        const total = document.createElement('td');
        const nowTotal = document.createElement('td');
        const profit = document.createElement('td');
        th.scope = 'row'
        th.innerHTML = data.title;
        price.innerHTML = data.price;
        count.innerHTML = data.count;
        
        if (data.title == 'QQQ'){
        now.innerHTML = this.data.croll.nowPrice
        nowTotal.innerHTML = (parseFloat(this.data.croll.nowPrice.substring(1)) * data.count).toFixed(2)
        }
        total.innerHTML = (data.price * data.count).toFixed(2)
        profit.innerHTML = (nowTotal.innerHTML - total.innerHTML).toFixed(2)
        
        tr.appendChild(th)
        tr.appendChild(profit)
        tr.appendChild(nowTotal)
        tr.appendChild(total)
        tr.appendChild(now)
        tr.appendChild(price)
        tr.appendChild(count)
        
        
        table.appendChild(tr)
    }

    setListHeader(table){
        
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const price = document.createElement('td'); 
        const count = document.createElement('td');
        const now = document.createElement('td');
        const total = document.createElement('td');
        const nowTotal = document.createElement('td');
        const profit = document.createElement('td');
        th.scope = 'row'
        th.innerHTML = '종목명'
        price.innerHTML = '매수가격'
        count.innerHTML =  '수량'
        now.innerHTML =  '현재가격'
        nowTotal.innerHTML =  '현재가격총합'
        total.innerHTML = '매수가격총합'
        profit.innerHTML =  '수익'
        
        tr.appendChild(th)
        tr.appendChild(profit)
        tr.appendChild(nowTotal)
        tr.appendChild(total)
        tr.appendChild(now)
        tr.appendChild(price)
        tr.appendChild(count)
        
        
        table.appendChild(tr)
    }

    searchByKeyword(result,value){
        result.innerHTML = ''   

        const div = document.createElement('div');
        const p = document.createElement('p');
        p.innerHTML = value.nowPrice
        div.appendChild(p)
        result.appendChild(div)
    }

    setIframe(container,src){
        const iframe = document.createElement('iframe');
        iframe.src = src
        iframe.className = 'graph-item'

        container.appendChild(iframe)
    }

    searchBox(container){
        
        const box = document.createElement('div');
        box.className = 'box-div';
        box.id = 'search'
        const input = document.createElement('input');
        input.className = 'box-input'
        input.placeholder = '티커를 입력하세요.'

        const result = document.createElement('div');
        result.className = 'box-result'

        input.addEventListener('keyup', event => {
            if(event.keyCode == 13 && input.value){
                this.onSearch(result,input.value);
            }
        });

        box.appendChild(input)
        box.appendChild(result)
        container.appendChild(box);
    }

    searchNews(table,croll){
        table.innerHTML = ''
            
        croll.forEach(e => {
            this.setNews(table,e)
        });

    }


    newsBox(container){
        
        const box = document.createElement('div');
        
        const input = document.createElement('input');
        
        input.placeholder = '검색어를 입력하세요.'
        
        const result = document.createElement('div');

        const table = document.createElement('table');
        table.className = 'type05'
            
        this.data.croll.forEach(e => {
            this.setNews(table,e)
        });

        input.addEventListener('keyup', event => {
            if(event.keyCode == 13 && input.value){
                this.onNew(table,input.value);
                //console.log ('이벤트 발생')
            }
        });

        result.appendChild(table)
        box.appendChild(input)
        box.appendChild(result)

        container.appendChild(box);
    }

    setImgBox(container,url){
        const div = document.createElement('div')
        div.className = 'box-div'
        const image = document.createElement('img');
        image.className = 'box-image'
        image.src = url;
        div.appendChild(image)
        container.appendChild(div)
    }   

    setNews(table,value){

        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.id = 'news-content'
        th.innerHTML = value.tag;
        
        tr.appendChild(th)
        
        table.appendChild(tr)

    }

    render(){   

    
        this.content.innerHTML = ''
        
        if (this.data.name == 'home'){

        const container1 = document.createElement('div')
        container1.className='box'
        this.searchBox(container1)
        this.setImgBox(container1,this.url.fearAndGrid)
        this.setImgBox(container1,this.url.fearAndGridBitCoin)

        const container2 = document.createElement('div')
        container2.className = 'graph-container'
        this.setIframe(container2,this.url.nasdaq)
        this.setIframe(container2,this.url.dow)
        this.setIframe(container2,this.url.snp500)

       
        const container3 = document.createElement('div')
        container3.className = 'graph-container'
        this.setIframe(container3,this.url.doller)
        this.setIframe(container3,this.url.bond10)
        this.setIframe(container3,this.url.vix)
        
        this.content.appendChild(container1)
        this.content.appendChild(container2)
        this.content.appendChild(container3)
        
        }
        else if(this.data.name == 'news'){

            const div = document.createElement('div');

            this.newsBox(div)

            this.content.appendChild(div)



        }
        else if(this.data.name == 'about'){

            const div = document.createElement('div');
            const table = document.createElement('table');
            table.className = 'type04'

            this.setListHeader(table)
            
            this.data.data.forEach(e => {
                this.setList(table,e)
            });

            div.appendChild(table)
            this.content.appendChild(div)
            
        }

    }
}