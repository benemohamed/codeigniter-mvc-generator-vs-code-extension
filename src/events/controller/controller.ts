import * as path from "path";
import * as _ from "lodash";
import { existsSync } from "fs";
import { FileSystemManager } from "../../utils/file_system_manager";
import { Controller } from "../../templates/controller/controller";

export class ControllerFile {
  constructor(
    private rootPath: string,
    private fileName: string,
    private folders?: string[]
  ) {
    console.debug(`ViewFile(rootPath: ${rootPath}, fileName: ${fileName})`);

  }

  public createResponsiveViews() {
    this.createFiles(
      this.snakeCasedFileName + "Controller.php",
      new Controller(
        this.snakeCasedFileName,
        "Controller"
      ).phpString
    );
  }

  private get snakeCasedFileName(): string {
    let snakeCasedFileName = _.kebabCase(this.fileName);
    console.debug(`get snakeCasedFileName: ${snakeCasedFileName}`);
    return _.capitalize(snakeCasedFileName);
  }

  private get pathValue(): string {
    if (this.folders === undefined) {
      return path.join(
        this.rootPath,
        "application",
        "controllers"
      );
    }
    return path.join(
      this.rootPath,
      "application",
      "controllers"
    );
  }

  private createFiles(fileName: string, data: string) {
    if (existsSync(path.join(this.pathValue, this.snakeCasedFileName))) {
      console.warn(`${fileName} already exists`);
      return;
    }

    FileSystemManager.createFile(this.pathValue, fileName, data);
  }
}
