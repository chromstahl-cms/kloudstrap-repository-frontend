import { Registration } from '@kloudsoftware/chromstahl-plugin'
import { Component } from '@kloudsoftware/eisen';
import { UploadComponent } from './uploadcomponent/UploadComponent'

export default class RegisterPlugin implements Registration {
    register(): Map<string, Component> {
        const m = new Map<string, Component>();
        m.set("/upload", new UploadComponent())
        return m;
    }
}
