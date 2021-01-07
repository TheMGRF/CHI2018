<?php
namespace pages;

use api\APIEndpoints;
use database\JSONRecordSet;
use Firebase\JWT\JWT;

/**
 * Creates a JSON web page based on the supplied parameters
 *
 * @author Thomas Griffiths (W18013094)
 */
class JsonWebPage implements Pageable {

    private $apiEndpoints;
    private $recordSet;
    private $page;

    /**
     * JsonWebPage constructor.
     *
     * @param array $pathArg yes
     */
    public function __construct(array $pathArg) {
        $path = (empty($pathArg[3])) ? "api" : $pathArg[3];

        $this->apiEndpoints = new APIEndpoints();
        $this->recordSet = new JSONRecordSet(DATABASE);

        switch ($path) {
            case "api":
                $this->setPage($this->info());
                break;
            case "endpoints":
                $this->setPage($this->endpoints());
                break;
            case "help":
                $this->setPage($this->help());
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
            case "chairs":
                $this->setPage($this->chairs());
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

    private function info() {
        http_response_code(200);
        return json_encode([
            "message" => "Welcome to the CHI2018 API!",
            "author" => "Thomas Griffiths",
            "endpoints" => $this->apiEndpoints->getEndpointsRoutes()
        ]);
    }

    private function endpoints() {
        http_response_code(200);
        return json_encode(["endpoints" => $this->apiEndpoints->getEndpointsJSON()]);
    }

    private function help() {
        http_response_code(200);
        $msg = ["message" => "You'll need it bud."];
        return json_encode($msg);
    }

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

    private function chairs() {
        $query = "SELECT name FROM x"; // TODO:

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

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

    private function sessionIDs() {
        $query = "SELECT sessionId FROM `sessions`";

        $params = [];
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", $params);
    }

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
    public function setPage(string $page) {
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
    private function search(string $query, string $element): string {
        //return $query . " WHERE `" . $element . "` LIKE CONCAT('%', :" . $element . ", '%')";
        return $query . " WHERE `" . $element . "` LIKE '%' || :" . $element . " || '%'";
    }

    private function limit(string $query, int $limit) {
        return $query . " LIMIT " . $limit;
    }

    private function post() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET, POST");
    }
}

?>
