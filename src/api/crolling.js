const axios = require("axios");
const cheerio = require("cheerio");

const QQQ_URL = "/finance/quote/QQQ:NASDAQ"


const request = async url => {
  try {
      const response = await axios.get(url);
     
      if(response.status == 200) {
          const data = await response.data;
          
          return data;
      } else {
          const errorData = await response;
          throw errorData;
      }
  } catch(e) {
    loading.toggleSpinner();
      throw {
          message: e.message,
          status: e.status
      };
  }
};

const crolling = {
  posts: async keyword => {
      /*
          keyword로 breed를 찾고 각 breed의 id로 이미지를 찾는다.
      */
      try {
          const requests = await request("/finance/quote/" + keyword + ":NASDAQ");
          // const responses = await Promise.all(requests);
         
          const $ = cheerio.load(requests);
          const data = { prePrice :  $(".tO2BSb.eExqnb.DnMTof").find("div.YMlKec.fxKbKc").text(),
                         nowPrice :  $(".AHmHk").find("div.YMlKec.fxKbKc").text()
                       }
                       
          return {
              isError: false,
              data: data
          };
      } catch(e) {
        loading.toggleSpinner();
          return {
              isError: true,
              data: e
          };
      }
  },

  news: async () => {
    
        try {
            const requests = await request("/rss/search?q=nasdaq+when:1d&hl=ko&gl=KR&ceid=KR:ko");
            // const responses = await Promise.all(requests);
            //console.log(1,requests)

            let itemList = [];

            const $ = cheerio.load(requests);
            const $bodyList = $("item")

            $bodyList.each(function(i, elem) {
                console.log($(this))
                itemList[i] = {
                    
                    tag: $(this).find('description').text()

                };
              });

            // const section = $(".fAThCb")
            // const data = { prePrice :  $(".tO2BSb.eExqnb.DnMTof").find("div.YMlKec.fxKbKc").text(),
            //             nowPrice :  $(".AHmHk").find("div.YMlKec.fxKbKc").text()
            //             }
           
            // console.log(3,section)
            
            return {
                isError: false,
                data: itemList
            };

        } catch(e) {
            return {
                isError: true,
                data: e
            };
        }
    
    }
  
};

export { crolling };



// function delay(ms) {
//   return new Promise(function(resolve, reject) {
//       setTimeout(function(){
//           resolve();
//       },ms);
//   });
// }

// function getHTML(url) {
//   return new Promise(resolve=>{
//       delay(300).then(function() {

//           axios.get(url).then(function(data) {
//               resolve(data);
//           });

//       });
//   })    
// }

// function call(URL,name){
//   getHTML(URL)
//     .then(html => {
//       const $ = cheerio.load(html.data);
//       const data = { prePrice :  $(".tO2BSb.eExqnb.DnMTof").find("div.YMlKec.fxKbKc").text(),
//                      nowPrice :  $(".AHmHk").find("div.YMlKec.fxKbKc").text()
//                    }
//       console.log(data)
//     }).then(e => {
//         console.log(e)
//     })
// }

// const api = {
//   posts: async () => {
//       /*
//           keyword로 breed를 찾고 각 breed의 id로 이미지를 찾는다.
//       */
//       try {
//           const requests = await request(`${API_ENDPOINT}/api/v1/posts/list`);
        
          
//           return {
//               isError: false,
//               data: responses
//           };
//       } catch(e) {
//           return {
//               isError: true,
//               data: e
//           };
//       }
//   },
  
// };




// export const print = () => {
//   returncall(QQQ_URL,'QQQ')
// }


// export const start = () => {
//   print()
//   setInterval(print,10000);
// }


