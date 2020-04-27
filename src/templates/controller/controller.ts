import * as _ from "lodash";
import { Base } from "../base";

export class Controller extends Base {
  private _phpString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {
    super(fileName, suffix);
    let classPrefixList: string[] = this.className.split("Controller");
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) {
      classPrefix = _.first(classPrefixList);
    }
    let initialPath =
      this.projectName === undefined
        ? "../../"
        : `package:${this.projectName}/`;
    this._phpString = `
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ${this.className} extends CI_Controller {

  public function __construct()
  {
      parent::__construct();

      // $this->load->model('some_model');
  }

	public function index()
	{
	 //	$this->load->view('welcome_message');
	}
}`;
  }

  get phpString(): string {
    return this._phpString;
  }
}
