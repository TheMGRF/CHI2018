<?php
namespace pages;

use api\APIEndpoints;
use database\JSONRecordSet;
use firebase\jwt\JWT;
use http\Exception\UnexpectedValueException;

/**
 * Creates a JSON web page based on the supplied parameters
 *
 * Note: Nearly all API endpoint can be provided a `limit`
 * parameter to limit the amount of objects returned by a call.
 *
 * @author Thomas Griffiths (W18013094)
 */
class JsonWebPage implements Pageable {

    private $apiEndpoints;
    private $recordSet;
    private $page;

    /**
     * JsonWebPage constructor to set path and determine
     * page vs API locations.
     *
     * @param $pathArg The passed path argument
     */
    public function __construct($pathArg) {
        $path = (empty($pathArg[4])) ? "api" : $pathArg[4];

        $this->apiEndpoints = new APIEndpoints();
        $this->recordSet = new JSONRecordSet(DATABASE);

        // Choose which page to load depending on the path
        switch ($path) {
            case "api":
                $this->setPage($this->info());
                break;
            case "endpoints":
                $this->setPage($this->endpoints());
                break;
            case "login":
                $this->setPage($this->login());
                break;
            case "update":
                $this->setPage($this->update());
                break;
            case "authors":
                $this->setPage($this->authors());
                break;
            case "contentauthors":
                $this->setPage($this->contentAuthors());
                break;
            case "authorsforcontent":
                $this->setPage($this->authorsForContent());
                break;
            case "slots":
                $this->setPage($this->slots());
                break;
            /*case "users":
                $this->setPage($this->users());
                break;*/
            case "content":
                $this->setPage($this->content());
                break;
            case "rooms":
                $this->setPage($this->rooms());
                break;
            case "sessiontypes":
                $this->setPage($this->sessionTypes());
                break;
            case "sessions":
                $this->setPage($this->sessions());
                break;
            case "sessionids":
                $this->setPage($this->sessionIDs());
                break;
            case "sessionsonday":
                $this->setPage($this->sessionsOnDay());
                break;
            case "sessionsbeforeday":
                $this->setPage($this->sessionsBeforeDay());
                break;
            /*case "sessionscontent":
                $this->setPage($this->sessionsContent());
                break;*/
            case "sessioncontent":
                $this->setPage($this->sessionContent());
                break;
            default:
                $this->setPage($this->defaultMessage());
                break;
        }
    }

    /**
     * Return JSON formatted info about the API and its
     * endpoints.
     *
     * @return false|string The JSON formatted info
     */
    private function info() {
        http_response_code(200);
        return json_encode([
            "message" => "Welcome to the CHI2018 API!",
            "author" => "Thomas Griffiths (W18013094)",
            "endpoints" => $this->apiEndpoints->getEndpointsRoutes()
        ]);
    }

    /**
     * Return a JSON formatted list of available endpoints
     * associated with the API.
     *
     * @return false|string The JSON formatted list of endpoints
     */
    private function endpoints() {
        http_response_code(200);
        return json_encode(["endpoints" => $this->apiEndpoints->getEndpointsJSON()]);
    }

    /**
     * Login endpoint to take an email and password and authenticate
     * the user login to return a token and admin status.
     *
     * @return false|string The JSON formatted token and admin status
     */
    private function login() {
        $this->post();

        $msg = "Invalid request. Username and password required";
        $status = 400;
        $token = null;
        $admin = 0;
        $input = json_decode(file_get_contents("php://input"));

        if (isset($input->email) && isset($input->password)) {
            $query = "SELECT username, password, admin FROM users WHERE email LIKE :email";
            $params = ["email" => $input->email];
            $res = json_decode($this->recordSet->getJSONRecordSet($query, $params), true);
            if ($res["data"] != null) {
                $password = $res["data"][0]["password"];

                if (password_verify($input->password, $password)) {
                    $msg = "User authorised. Welcome " . $res["data"][0]["username"] . "!";
                    $admin = $res["data"][0]["admin"];
                    $status = 200;
                    $token = array();
                    $token["email"] = $input->email;
                    $token["username"] = $res["data"][0]["username"];
                    $token["admin"] = $admin;
                    $token['iat'] = time();
                    $token['exp'] = time() + 3600; // set a token expiration time of 1 hour
                    $jwtkey = JWTKEY;
                    $token = JWT::encode($token, $jwtkey);
                } else {
                    $msg = "Invalid username or password";
                    $status = 401;
                }
            } else {
                $msg = "Invalid username or password";
                $status = 401;
            }
        }

        return json_encode([
            "status" => $status,
            "message" => $msg,
            "token" => $token,
            "admin" => $admin
        ]);
    }

    /**
     * Create a DB query to update the specified session's name
     * passed through the HTTP header.
     *
     * @return false|string The JSON formatted status messages
     */
    private function update() {
        $input = json_decode(file_get_contents("php://input"));

        if (!$input) {
            return json_encode(array("status" => 400, "message" => "Invalid request"));
        } else if (!isset($input->token)) {
            return json_encode(array("status" => 401, "message" => "Not authorised"));
        }
        if (!isset($input->name) || !isset($input->sessionId)) {
            return json_encode(array("status" => 400, "message" => "Invalid request"));
        }

        try {
            $jwtkey = JWTKEY;
            $tokenDecoded = JWT::decode($input->token, $jwtkey, array('HS256'));
        } catch (UnexpectedValueException $e) {
            return json_encode(array("status" => 401, "message" => $e->getMessage()));
        }

        $query = "UPDATE sessions SET name = :name WHERE sessionId = :sessionId";
        $params = ["name" => $input->name, "sessionId" => $input->sessionId];
        $res = $this->recordSet->getJSONRecordSet($query, $params);
        return json_encode(array("status" => 200, "message" => "ok"));
    }

    /**
     * Return a list of authors filtered by name or ID from the API.
     *
     * @return string The JSON formatted list of authors
     */
    private function authors() {
        $query = "
SELECT authors.authorId, name, contentId FROM `authors`
INNER JOIN `content_authors` ON content_authors.authorId = authors.authorId
";

        $params = [];
        if (isset($_REQUEST["name"])) {
            $query = $this->search($query, "name");
            $params = ["name" => $_REQUEST["name"]];
        } else if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "authorId");
            $params = ["id" => $_REQUEST["id"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return a list of content ids, authors and institutions from
     * the API endpoint.
     *
     * @return string The JSON formatted list of content authors
     */
    private function contentAuthors() {
        $query = "SELECT * FROM `content_authors`";

        $params = [];
        if (isset($_REQUEST["contentId"])) {
            $query = $this->search($query, "contentId");
            $params = ["contentId" => $_REQUEST["contentId"]];
        } else if (isset($_REQUEST["authorId"])) {
            $query = $this->search($query, "authorId");
            $params = ["authorId" => $_REQUEST["authorId"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return a list of author names filtered by content and session
     * authors dependent on content ID.
     *
     * @return string The JSON formatted author names
     */
    private function authorsForContent() {
        $query = "
SELECT
  name
FROM
  `authors`
  INNER JOIN `content_authors` ON content_authors.authorId = authors.authorId
  INNER JOIN `sessions_content` ON sessions_content.contentId = content_authors.contentId
";

        $val = "4672";
        if (isset($_REQUEST["contentId"])) {
            $val = $_REQUEST["contentId"];
        }

        $query .= "WHERE sessions_content.contentId = :contentId";
        $params = ["contentId" => $val];

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return information associated with slots according to types, ids and
     * days join with sessions.
     *
     * @return string The JSON formatted list of slots
     */
    private function slots() {
        $query = "SELECT * FROM `slots` LEFT JOIN `sessions` ON slots.slotId = sessions.slotId";

        $params = [];
        if (isset($_REQUEST["type"])) {
            $query = $this->search($query, "type");
            $params = ["type" => $_REQUEST["type"]];
        } else if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "slotId");
            $params = ["slotId" => $_REQUEST["id"]];
        } else if (isset($_REQUEST["day"])) {
            $query = $this->search($query, "dayString");
            $params = ["dayString" => $_REQUEST["day"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /*private function users() {
        $query = "SELECT * FROM `users`";

        if (isset($_REQUEST["username"])) {
            $query = $this->search($query, "username", $_REQUEST["username"]);
        } else if (isset($_REQUEST["email"])) {
            $query = $this->search($query, "email", $_REQUEST["email"]);
        } else if (isset($_REQUEST["admins"])) {
            $query = $this->search($query, "admin", 1);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }*/

    /**
     * Return a list of content from the DB dependent on ID.
     *
     * @return string The JSON formatted list of content
     */
    private function content() {
        $query = "SELECT * FROM `content`";

        $params = [];
        if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "contentId");
            $params = ["authorId" => $_REQUEST["id"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Get a list of rooms filtered by room ID.
     *
     * @return string The JSON formatted list of rooms
     */
    private function rooms() {
        $query = "SELECT * FROM `rooms`";

        $params = [];
        if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "roomId");
            $params = ["roomId" => $_REQUEST["id"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return a list of session types filtered by the type ID.
     *
     * @return string The JSON formatted list of session types
     */
    private function sessionTypes() {
        $query = "SELECT * FROM `session_types`";

        $params = [];
        if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "typeId");
            $params = ["typeId" => $_REQUEST["id"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return a list of copious session information dependent on
     * a variety of IDs.
     *
     * @return string The JSON formatted list of sessions
     */
    private function sessions() {
        $query = "SELECT * FROM `sessions`";

        $params = [];
        if (isset($_REQUEST["sessionId"])) {
            $query = $this->search($query, "sessionId");
            $params = ["sessionId" => $_REQUEST["sessionId"]];
        } else if (isset($_REQUEST["typeId"])) {
            $query = $this->search($query, "typeId");
            $params = ["typeId" => $_REQUEST["typeId"]];
        } else if (isset($_REQUEST["roomId"])) {
            $query = $this->search($query, "roomId");
            $params = ["roomId" => $_REQUEST["roomId"]];
        } else if (isset($_REQUEST["chairId"])) {
            $query = $this->search($query, "chairId");
            $params = ["chairId" => $_REQUEST["chairId"]];
        } else if (isset($_REQUEST["slotId"])) {
            $query = $this->search($query, "slotId");
            $params = ["slotId" => $_REQUEST["slotId"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return a list of specifically just session IDs
     *
     * @return string The JSON formatted list of session IDs
     */
    private function sessionIDs() {
        $query = "SELECT sessionId FROM `sessions`";

        $params = [];
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return a huge list of session information dependent copious
     * joins and by the specified day,
     *
     * @return string The JSON formatted string of session information
     */
    private function sessionsOnDay() {
        $query = "
SELECT DISTINCT
  sessions.sessionId,
  sessions.slotId,
  sessions_content.contentId,
  session_types.name AS 'type', 
  sessions.name AS 'name',
  content.title, 
  content.abstract, 
  content.award, 
  authors.name as 'chair', 
  rooms.name as 'room',
  slots.startHour,
  slots.startMinute,
  slots.endHour,
  slots.endMinute

FROM 
  `sessions` 
  INNER JOIN `slots` ON sessions.slotId = slots.slotId
  INNER JOIN `session_types` ON sessions.typeId = session_types.typeId 
  INNER JOIN `sessions_content` ON sessions.sessionId = sessions_content.sessionId 
  INNER JOIN `content` ON content.contentId = sessions_content.contentId 
  LEFT JOIN `authors` ON sessions.chairId = authors.authorId 
  INNER JOIN `rooms` ON sessions.roomId = rooms.roomId 
";

        $params = [];
        if (isset($_REQUEST["day"])) {
            $query = $this->search($query, "dayString");
        }

        if (isset($_REQUEST["day"]) && isset($_REQUEST["slotId"])) {
            $query .= " AND sessions.slotId = :slotId";
            $params = ["dayString" => $_REQUEST["day"], "slotId" => $_REQUEST["slotId"]];
        } else {
            $params = ["dayString" => $_REQUEST["day"]];
        }

        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return a huge list of session information dependent copious
     * joins and before the specified day.
     *
     * Example: SELECT sessionId FROM `sessions` INNER JOIN `slots` ON sessions.slotId=slots.slotId WHERE slots.dayInt < 3;
     *
     * @return string
     */
    private function sessionsBeforeDay() {
        $query = "
SELECT DISTINCT
  sessions.sessionId,
  sessions_content.contentId,
  session_types.name AS 'type', 
  content.title, 
  content.abstract, 
  content.award, 
  authors.name as 'chair', 
  rooms.name as 'room'
FROM 
  `sessions` 
  INNER JOIN `slots` ON sessions.slotId = slots.slotId
  INNER JOIN `session_types` ON sessions.typeId = session_types.typeId 
  INNER JOIN `sessions_content` ON sessions.sessionId = sessions_content.sessionId 
  INNER JOIN `content` ON content.contentId = sessions_content.contentId 
  INNER JOIN `authors` ON sessions.chairId = authors.authorId 
  INNER JOIN `rooms` ON sessions.roomId = rooms.roomId 
";

        $params = [];
        $before = 7;
        if (isset($_REQUEST["day"])) {
            $before = ":day";
            $params = ["day" => $_REQUEST["day"]];
        }

        $query .= "WHERE slots.dayInt < $before";

        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /*private function sessionsContent() {
        $query = "SELECT * FROM `sessions_content`";

        if (isset($_REQUEST["sessionId"])) {
            $query = $this->search($query, "sessionId", $_REQUEST["sessionId"]);
        } else if (isset($_REQUEST["contentId"])) {
            $query = $this->search($query, "contentId", $_REQUEST["contentId"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }*/

    /**
     * Return a list of session content including awards and abstracts
     * filtered by ID.
     *
     * @return string The JSON formatted list of session content
     */
    private function sessionContent() {
        $query = "
SELECT
  sessions.name,
  sessions_content.sessionId,
  title,
  abstract,
  award
FROM
  `sessions_content`
  INNER JOIN `content` ON sessions_content.contentId = content.contentId
  INNER JOIN `sessions` ON sessions.sessionId = sessions_content.sessionId
";
        $params = [];
        if (isset($_REQUEST["contentId"])) {
            $query .= " WHERE sessions_content.contentId = :contentId";
            $params = ["contentId" => $_REQUEST["contentId"]];
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

    /**
     * Return the default errored 400 API endpoint
     *
     * @return false|string The JSON encoded API error message
     */
    private function defaultMessage() {
        http_response_code(400);
        return json_encode(["message" => "Invalid API endpoint provided!"]);
    }

    /**
     * Get the API JSON content for this "page"
     */
    public function getPage() {
        // dont cache the JSON
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

        // define that this is actually JSON
        header('Content-type: application/json');

        echo $this->page;
    }

    /**
     * Set the JSON content for this "page"
     *
     * @param string $page The JSON content to set for this "page"
     */
    public function setPage($page) {
        $this->page = $page;
    }

    /**
     * Search for a specific value in the DB result
     *
     * For some stupid reason SQLite being the terrible
     * system it is does not support CONCAT and thus we
     * have to resort to their bodged alternative...
     *
     * @param string $query The original DB query to add to
     * @param string $element The element to search for
     * @return string The completed and amended query
     */
    private function search($query, $element) {
        //return $query . " WHERE `" . $element . "` LIKE CONCAT('%', :" . $element . ", '%')"; // why tf doesnt sqlite support this
        return $query . " WHERE `" . $element . "` LIKE '%' || :" . $element . " || '%'";
    }

    /**
     * Add a limit specification to a DB query.
     *
     * @param string $query The DB query to add to
     * @param int $limit The amount to limit to
     * @return string The limited DB query
     */
    private function limit($query, $limit) {
        return $query . " LIMIT " . $limit;
    }

    /**
     * Set the POST information of the API
     */
    private function post() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET, POST");
    }
}

?>
