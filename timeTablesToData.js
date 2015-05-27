
function load(url){
  return fetch(url)
  .then(url => {
    return url.text();
  })
  .then(html => {
    var parser = new DOMParser;
    var dom = parser.parseFromString(html, "text/html");
    return dom;
  })
  .catch(err => console.log(err)); 
}

var getTable = (url) => {
  load(url)
  .then(dom  => {
    return dom.querySelector('table');
  })
  .catch(err => console.log(err));
}


function zip(a, b) {
  var obj = {};
  a.forEach(function(key, i) {
    var value = b[i];
    obj[key] = value;
  })
  return obj
}

function timeTableToData(table){
  var times = [];
  var stops = Array.from(table.querySelectorAll('thead tr th')).map(th => th.textContent);
  var rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
    var tds = Array.from(tr.querySelectorAll('td'));
    tds = tds.map(td => td.textContent);
    return zip(headers, tds);
  })
  return rows;
}

get(data.toTransitCenter[0]).then(r => {
  var parser = new DOMParser; 
  var dom = parser.parseFromString(r, 'text/html'); 
  console.log(timeTableToData(dom.querySelector('table')))
})

