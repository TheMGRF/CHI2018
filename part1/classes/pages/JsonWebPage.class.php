<?php
namespace pages;

use api\APIEndpoints;
use database\JSONRecordSet;

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
                $this::setPage($this::info());
                break;
            case "endpoints":
                $this::setPage($this::endpoints());
                break;
            case "help":
                $this::setPage($this::help());
                break;
            case "login":
                $this::setPage($this::login());
                break;
            case "logout":
                $this::setPage($this::logout());
                break;
            case "update":
                $this::setPage($this::update());
                break;
            case "authors":
                $this::setPage($this::authors());
                break;
            case "contentauthors":
                $this::setPage($this::contentAuthors());
                break;
            case "slots":
                $this::setPage($this::slots());
                break;
            case "users":
                $this::setPage($this::users());
                break;
            case "content":
                $this::setPage($this::content());
                break;
            case "rooms":
                $this::setPage($this::rooms());
                break;
            case "sessiontypes":
                $this::setPage($this::sessionTypes());
                break;
            case "sessions":
                $this::setPage($this::sessions());
                break;
            case "sessionscontent":
                $this::setPage($this::sessionsContent());
                break;
            default:
                $this::setPage($this::defaultMessage());
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

        //$msg = "Invalid request. Username and password required";
        $msg = "Default";
        $status = 400;
        $token = null;
        $input = json_decode(file_get_contents("php://input"));

        if (isset($input->email) && isset($input->password)) {
            $query  = "SELECT username, password FROM users WHERE email LIKE :email";
            $params = ["email" => $input->email];
            $res = json_decode($this->recordSet->getJSONRecordSet($query, $params), true);
            //$password = ($res['count']) ? $res['data'][0]['password'] : null;
            $password = $res['data'][0]['password'];

            if (password_verify($input->password, $password)) {
                $msg = "User authorised. Welcome ". $res['data'][0]['username'] . "!";
                $status = 200;
                $token = "1234";
            } else {
                $msg = "username or password are invalid";
                $status = 401;
            }
        }

         return json_encode([
             "status" => $status,
             "message" => $msg,
             "token" => $token
         ]);
    }

    private function logout() {
        return json_encode(["logged-in" => false]);
    }

    private function update() {
        return json_encode(["updated" => false]);
    }

    private function authors() {
        $query = "SELECT * FROM `authors`";

        if (isset($_REQUEST["name"])) {
            $query = $this->search($query, "name", $_REQUEST["name"]);
        } else if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "authorId", $_REQUEST["id"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

    private function contentAuthors() {
        $query = "SELECT * FROM `content_authors`";

        if (isset($_REQUEST["contentId"])) {
            $query = $this->search($query, "contentId", $_REQUEST["contentId"]);
        } else if (isset($_REQUEST["authorId"])) {
            $query = $this->search($query, "authorId", $_REQUEST["authorId"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

    private function slots() {
        $query = "SELECT * FROM `slots`";

        if (isset($_REQUEST["type"])) {
            $query = $this->search($query, "type", $_REQUEST["type"]);
        } else if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "slotId", $_REQUEST["id"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

    private function users() {
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
    }

    private function content() {
        $query = "SELECT * FROM `content`";

        if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "contentId", $_REQUEST["id"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

    private function rooms() {
        $query = "SELECT * FROM `rooms`";

        if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "roomId", $_REQUEST["id"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

    private function sessionTypes() {
        $query = "SELECT * FROM `session_types`";

        if (isset($_REQUEST["id"])) {
            $query = $this->search($query, "typeId", $_REQUEST["id"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

    private function sessions() {
        $query = "SELECT * FROM `sessions`";

        if (isset($_REQUEST["sessionId"])) {
            $query = $this->search($query, "sessionId", $_REQUEST["sessionId"]);
        } else if (isset($_REQUEST["typeId"])) {
            $query = $this->search($query, "typeId", $_REQUEST["typeId"]);
        } else if (isset($_REQUEST["roomId"])) {
            $query = $this->search($query, "roomId", $_REQUEST["roomId"]);
        } else if (isset($_REQUEST["chairId"])) {
            $query = $this->search($query, "chairId", $_REQUEST["chairId"]);
        } else if (isset($_REQUEST["slotId"])) {
            $query = $this->search($query, "slotId", $_REQUEST["slotId"]);
        }
        if (isset($_REQUEST["limit"])) {
            $query = $this->limit($query, $_REQUEST["limit"]);
        }

        return $this->recordSet->getJSONRecordSet($query . ";", []);
    }

    private function sessionsContent() {
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

    private function search(string $query, string $element, string $search) {
        return $query . " WHERE `" . $element . "` LIKE " . "'%" . $search . "%'";
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
