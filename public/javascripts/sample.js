function testResults (form) {
    var TestVar = form.inputbox.value;
    console.log("You typed: " + TestVar);
}

function getElements(elmSel) {
    return document.querySelectorAll(elmSel);
}

var test = getElements('.book-synopsis');

console.log(test[0].innerText);

test[0].innerText = "Javascript just replaced this";

fetch('/subject/fantasy')
    .then(function(response) {
        return response.json()
    }).then(function(json) {
    console.log('parsed json', json)
}).catch(function(ex) {
    console.log('parsing failed', ex)
});