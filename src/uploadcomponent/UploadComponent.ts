import { Component, VApp, VNode, ComponentBuildFunc, Props, cssClass, id, email, VInputNode, Attribute, isDefinedAndNotEmpty} from '@kloudsoftware/eisen'
import { HttpClient } from '@kloudsoftware/chromstahl-plugin';

class UploadDTO {
    file: File;
    name: string;
    version: string;
}

export class UploadComponent implements Component {
    build(app: VApp): ComponentBuildFunc {
        return (root: VNode, props: Props) => {
            root.addClass("container center-container");
            let dto = new UploadDTO();
            const http = app.get<HttpClient>("http");
            const nameInput = app.k("input", { attrs: [id("name"), cssClass("user-input")] }) as VInputNode;
            const versionInput = app.k("input", { attrs: [id("version"), cssClass("user-input")] }) as VInputNode;
            const fileInput = app.k("input", { attrs: [id("version"), cssClass("user-input"), new Attribute("type", "file")] }) as VInputNode;
            const btn = app.k("button", {value: "Click me!"});

            nameInput.bindObject(dto, "name");
            versionInput.bindObject(dto, "version");
            fileInput.bindObject(dto, "file");

            btn.addEventlistener("click", () => {
                const formData = new FormData();
                formData.append('name', dto.name);
                formData.append('version', dto.version);
                formData.append('file', dto.file);
                http.performPost("/upload", formData, "multipart/formdata");
                console.log(dto);
            })

            nameInput.validate(() => {
                return isDefinedAndNotEmpty(dto.name);
            }, "error");

            versionInput.validate(() => {
                return isDefinedAndNotEmpty(dto.version);
            }, "error");

            fileInput.validate(() => {
                return true
            }, "error");

            const divContainer = app.k("div", {attrs: [cssClass("card")]}, [nameInput, versionInput, fileInput, btn]);

            root.appendChild(divContainer);

            return {};
        }
    }
}
