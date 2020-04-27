import * as path from "path";
import * as _ from "lodash";
import { existsSync } from "fs";
import { FileSystemManager } from "../../utils/file_system_manager";
import { Model } from "../../templates/model/model";

export class ModelFile {
  constructor(
    private rootPath: string,
    private fileName: string,
    private folders?: string[]
  ) {
    console.debug(`ViewFile(rootPath: ${rootPath}, fileName: ${fileName})`);
  }

  public createResponsiveViews() {
    this.createFiles(
      this.snakeCasedFileName + "Model.php",
      new Model(this.snakeCasedFileName, "Model")
        .phpString
    );
  }

  private get snakeCasedFileName(): string {
    let snakeCasedFileName = _.capitalize(this.fileName);
    console.debug(`get snakeCasedFileName: ${snakeCasedFileName}`);
    return snakeCasedFileName;
  }

  private get pathValue(): string {
    if (this.folders === undefined) {
      return path.join(this.rootPath, "application", "models");
    }
    return path.join(
      this.rootPath,
      "application",
      "models"
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
