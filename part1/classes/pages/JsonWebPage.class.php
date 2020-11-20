<?php
namespace pages;

/**
 * Creates a JSON web page based on the supplied parameters
 *
 * @author Thomas Griffiths (W18013094)
 */
class JsonWebPage implements Grabbable {

    private $page;

    /**
     * JsonWebPage constructor.
     *
     * @param array $pathArg yes
     */
    public function __construct(array $pathArg) {
        $path = (empty($pathArg[3])) ? "api" : $pathArg[3];

        switch ($path) {
            case "api":
                $this->page = $this->welcome();
                break;
            case "help":
                $this->page = $this->help();
                break;
            case "yes":
                $this->page = $this->yes();
                break;
            default:
                $this->page = $this->default();
                break;
        }
    }

    private function welcome() {
        return json_encode(["message" => "welcome", "author" => "Thomas Griffiths"]);
    }

    private function help() {
        $msg = ["message" => "You'll need it bud."];
        return json_encode($msg);
    }

    private function yes() {
        $msg = ["yes" => "yes"];
        return json_encode($msg);
    }

    private function default() {
        return json_encode(["message" => "CHI2018 API!"]);
    }


    public function getPage() {
        // headers for not caching the results
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

        // headers to tell that result is JSON
        header('Content-type: application/json');

        echo $this->page;
    }

}

?>
