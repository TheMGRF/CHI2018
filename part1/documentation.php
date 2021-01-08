<!DOCTYPE html>
<html>

<head>
    <title>CHI2018 - API | Documentation</title>

    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="author" content="Thomas Griffiths">
    <meta name="description" content="CHI2018 - API | Documentation">
    <meta name="keywords" content="Programming,Web Dev,WebDev,Development,hmtl,css,javascript,php,api">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Styles -->
    <link rel="stylesheet" href="assets/css/api.css">
</head>

<body>
    <div id="header">
        <h1>CHI2018 - API | Documentation</h1>

        <h2>Author: Thomas Griffiths (W18013094)</h2>
        <h2>University Coursework</h2>
        <h3>This page, API and corresponding website are not associated with the CHI Conference or any of its sponsors.</h3>
        <p>See <a id="api-link" href="http://localhost/part1/api" target="_blank">here</a> for the API home page.</p>
    </div>
    <hr>

    <div id="api-endpoints">
        <h2 id="sub-header">Available API Endpoints</h2>
        <p><b>Note:</b> Nearly all endpoints by default support the <span class="code">limit</span> parameter.</p>
        <hr>

        <script>
            // Create an API call to fetch all the available endpoints and
            // then dynamically generate the endpoint data.
            const url = "http://localhost/part1/api/endpoints";

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    let collection = data.endpoints;
                    collection.map(details => (
                        document.getElementById("api-endpoints").innerHTML += "<h4><b>Route:</b> " + details.route + "</h4><p><b>Description:</b> " + details.description + "</p><p><b>Parameters:</b> " + details.parameters + "</p><p><b>Authentication:</b> " + details.authenticated + "</p>" + "<p><b>Example:</b> <span class='code'>" + details.example + "</span></p><hr>"
                    ))
                })
                .catch((err) => {
                    console.log("Something went wrong: ", err)
                })
        </script>
    </div>

</body>

</html>