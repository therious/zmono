import "reflect-metadata";
import {Config, Inflate} from "@therious/boot";
import {components} from '@therious/components';

// get the relevant classes registered for injection with an import
import './fsm-utils/test-class';
import {connectApp} from "./connect-app";

console.log(`components=${components()}`);

(async ()=>{
    try {
        const config = await Config.fetch('/config/hello.yaml');
        console.warn(`config loaded`);
        const inflate = new Inflate(config);
        const extendedConfig = inflate.intializeSequence('bootSequence');

        connectApp();
    } catch(e) {
        console.error(e);
    }
})();

