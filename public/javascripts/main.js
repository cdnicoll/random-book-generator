function getRandomBook() {
    var selectedGenre = document.querySelector('input[name="genre"]:checked').value;
    var selectedStartYear = document.querySelector('input[name="yearStart"]').value;
    var selectedEndYear = document.querySelector('input[name="yearEnd"]').value;

    console.log(_.isNumber(selectedStartYear));

    var uri;
    if (selectedStartYear  === "" || selectedEndYear === "") {
        uri = selectedGenre;
    }
    else {
        uri = +selectedStartYear+"/"+selectedEndYear+"/"+selectedGenre;
    }

    console.log(uri);

    fetchRandomBook(uri, function(json) {
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

function fetchRandomBook(url, callback)
{
    fetch('/subject/'+url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
        console.log('Random Books Json: ', json);
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
        console.log('Book Details Json: ', json);
        callback(json);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    });
}