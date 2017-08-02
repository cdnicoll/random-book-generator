function getRandomBook() {
    fetchRandomBook(function(json) {
        fetchBookDetail(json.key, function(json) {
            var bookSynopsisElement = getElements('.book-synopsis');
            var description = undefined;
            if (_.isUndefined(json.description.value)) {
                description = json.description;
            }
            else {
                description = json.description.value;
            }

            bookSynopsisElement[0].innerText = description;
        });
    })
}

function getElements(elmSel) {
    return document.querySelectorAll(elmSel);
}

function fetchRandomBook(callback)
{
    fetch('/subject/fantasy')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
        console.log('parsed json', json);
        callback(json);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    });
}

function fetchBookDetail(id, callback)
{
    fetch('/book'+id)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
        console.log('parsed json', json);
        callback(json);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    });
}