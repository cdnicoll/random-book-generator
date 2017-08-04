function getRandomBook() {
    var genreElement = document.querySelector('input[name="genre"]:checked');
    var selectedGenre = genreElement.value;
    //var selectedLightColor = genreElement.dataset.colorLight;


    var selectedStartYear = document.querySelector('input[name="yearStart"]').value;
    var selectedEndYear = document.querySelector('input[name="yearEnd"]').value;

    var uri;
    if (selectedStartYear  === "" || selectedEndYear === "") {
        uri = selectedGenre;
    }
    else {
        uri = +selectedStartYear+"/"+selectedEndYear+"/"+selectedGenre;
    }

    fetchRandomBook(uri, function(json) {
        fetchBookDetail(json.key, function(json) {
            var bookSynopsisElement = getElements('#book-synopsis');
            var description = undefined;

            if (typeof json !== 'undefined' && typeof json.description !== 'undefined' && typeof json.description.value !== 'undefined') {
                description = json.description.value;
            }
            else if (typeof json.description !== 'undefined') {
                description = json.description;
            }
            else {
                // @todo
                // This is a bug where there is no description. What may need to be done to fix this
                // is to check the book edition, the problem here is that there can be multiple editions
                description = "This is a bug and I can't get descrition.\n";
                description += "Title: " + json.title
            }

            fetchBookEditions(json.key, function(json) {
                console.log("There are " + json.size + " editions");
                console.log("Book Editions: " , json);

                fetchBookEdition(_.first(json.entries).isbn_10[0], function(json) {
                    console.log(json);
                    console.log(_.findKey(json, 'details'));
                    console.log(_.first(json));
                    console.log(_.first(json).details);
                })

            });

            bookSynopsisElement[0].innerText = description;
        });
    })
}

function getElements(elmSel) {
    return document.querySelectorAll(elmSel);
}

function updateBackground() {
    var genreElement = document.querySelector('input[name="genre"]:checked');
    var selectedLightColor = genreElement.dataset.colorLight;
    var selectedMediumColor = genreElement.dataset.colorMedium;
    var selectedDarkColor = genreElement.dataset.colorDark;

    // change background
    getElements('#main-container')[0].style.backgroundColor = selectedLightColor;
    getElements('#book-synopsis')[0].style.backgroundColor = selectedMediumColor;
    getElements('#book-synopsis')[0].style.borderColor = selectedDarkColor;
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
        //callback(ex);
    });
}

function fetchBookEditions(id, callback)
{
    fetch('/book/edition'+id)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
        console.log('Book Editions Json: ', json);
        callback(json);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
        //callback(ex);
    });
}

function fetchBookEdition(isbn, callback)
{
    fetch('/book/edition/'+isbn)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
        console.log('Book Editions Json: ', json);
        callback(json);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
        //callback(ex);
    });
}