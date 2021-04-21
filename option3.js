// Angie Ta 2021 for Eluvio SE Intern Coding Challenge

var async = require('async'); // https://www.npmjs.com/package/async
const ID_LENGTH = 27; // length of example id

async function loadIds(id){
    var request = new XMLHttpRequest()
    var url = ' https://eluv.io/items/'
    var authHeader = btoa(id)

    request.open('GET', url+id, true)
    request.setRequestHeader('Authorization', String(authHeader) );
    request.onload = function() {

        if(this.readyState === 4 && this.status === 200){// if success
            var data = JSON.parse(request.responseText)// access data here
            console.log(data)
        }
        else if(request.status === 404){// if error
            console.log("Error, 404 Not Found")
        }
    }
    request.onerror = function(){
      console.log("Error looking up",id)
    }
    request.send()
}

function printResults(err, results){
  console.log(results) // all unique id information
}

function getIds(ids_to_retrieve){
  var idList = ids_to_retrieve

  //parse valid ids
  idList = new Set(idList) // remove duplicates
  idList = Array.from(idList)
  idList =  idList.filter((id)=> { // assuming all ids are the same length as example id
    return length(id) === ID_LENGTH
  });

  // send 5 simultaneous requests , wait until info return
  // send more requests until the idList is complete
  var url = ' https://eluv.io/items/'
  async.mapLimit(idList, 5, loadIds(id, printResults)) //5 async calls to api made each time until all ids completed
}
