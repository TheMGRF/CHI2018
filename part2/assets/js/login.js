let myJSON = {"email": "john@example.com", "password": "johnpassword"};

const postJSON = (api) => {
    fetch(api, {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify(myJSON.toString())
    })
        .then(
            function (response) {
                return response.json();
            })
        .then(
            function (data) {
                console.log(data);
            })
        .catch(
            function (err) {
                console.log("Something went wrong!", err);
            }
        );
}

postJSON("http://localhost/part1/api/login/");