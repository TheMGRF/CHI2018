<?php
namespace pages;

use JSONRecordSet;

/**
 * Creates a JSON web page based on the supplied parameters
 *
 * @author Thomas Griffiths (W18013094)
 */
class JsonWebPage implements Pageable {

    const END_POINTS = ["api", "help", "login", "update"];

    private $recordSet;
    private $page;

    /**
     * JsonWebPage constructor.
     *
     * @param array $pathArg yes
     */
    public function __construct(array $pathArg) {
        $path = (empty($pathArg[3])) ? "api" : $pathArg[3];
        $this->recordSet = new JSONRecordSet(DATABASE);

        switch ($path) {
            case "api":
                $this::setPage($this::info());
                break;
            case "help":
                $this::setPage($this::help());
                break;
            case "login":
                $this::setPage($this::login());
                break;
            case "update":
                $this::setPage($this::update());
                break;
            case "authors":
                $this::setPage($this::authors());
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
            "endpoints" => $this::END_POINTS
        ]);
    }

    private function help() {
        http_response_code(200);
        $msg = ["message" => "You'll need it bud."];
        return json_encode($msg);
    }

    private function login() {
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
}

?>
