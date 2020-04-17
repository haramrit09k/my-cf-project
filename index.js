// ElementHandler
class ElementHandler { 
  element(element) {
    if(element.tagName == 'title'){
      element.append(" | Haramrit Singh Khurana")
    }
    else if(element.tagName == 'h1' && element.getAttribute('id') == 'title'){
      element.append(' | Haramrit')
    }
    else if(element.tagName == 'p' && element.getAttribute('id') == 'description'){
      element.setInnerContent("This is Haramrit\'s variant of the take home project. Please consider him for an intern position at Cloudflare. He's a really hardworking person. Will not let you down for sure :) ")
    }
    else if(element.tagName == 'a' && element.getAttribute('id') == 'url'){
      element.setInnerContent('Here is a link to his LinkedIn profile')
      element.setAttribute('href','https://www.linkedin.com/in/haramrit09k/')
    }
  }
}

// rewriter object
const rewriter = new HTMLRewriter()
  .on('title', new ElementHandler())
  .on('h1', new ElementHandler())
  .on('p', new ElementHandler())
  .on('a', new ElementHandler())

// event listener for fetch
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
  
})

// request handler function
async function handleRequest(request) {

  const response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');

  if (!response.ok) {
      throw new Error("HTTP status code " + response.status);
  }
  
  let url;
  // let html_data;
  const data = await response.json();

  const rand = Math.random();
      console.log(rand);
      if(rand < 0.5){
        url = data['variants']['1'];
      }
      else{
        url = data['variants']['0'];
      }
  console.log(url);
  
  const res = await fetch(url)

  return rewriter.transform(res)

}
