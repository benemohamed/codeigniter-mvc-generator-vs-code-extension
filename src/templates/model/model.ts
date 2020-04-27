import * as _ from "lodash";
import { Base } from "../base";

export class Model extends Base {
  private _phpString: string;

  constructor(fileName: string, suffix: string, private projectName?: string) {
    super(fileName, suffix);
    this._phpString = `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * summary
 */
class ${this.className} extends CI_Model {
    /**
     * @var string
     */
    private $table;

    /**
     * Construct
     */
    public function __construct() {
        // $this->load->database();

        $this -> table = 'files';
    }

    /**
     * Get data from the table
     * @param  array  $params
     * @return mixed         data
     */
    public function get() {
        // The SELECT portion of a query
        $this -> db -> select('*');

        //  Table name
        $this -> db -> from($this -> table);

        $query = $this -> db -> get();

        // returns the result
        return $query -> result();

    }

    /*
     * Insert  data
     * @return bool|int
     */
    public function insert($data = array()) {

        // insert  data to  table
        $insert = $this -> db -> insert($this -> table, $data);

        // return the status
        return $insert ? $this -> db -> insert_id() : false;
    }

    /**
     * Update data
     * @param array $data  data
     * @param int $some_id
     * @return bool
     */
    public function update($data, int $some_id) {

        //update data in $this->table table
        $update = $this -> db -> update($this -> table, $data, ['some_id' => $some_id]);

        // return the status
        return $update ? true : false;
    }

    /**
     * Delete data
     * @param  int    $file_id File id
     * @return bool
     */
    public function delete(int $some_id) {
        // Delete from $this->table table
        $delete = $this -> db -> delete ($this -> table, ['some_id' => $some_id]);
        // return the status
        return $delete ? true : false;
    }
}`;
  }

  get phpString(): string {
    return this._phpString;
  }
}
