declare global {
    namespace Graphs {
        interface Config {
            data: number[];

            scriptNames: Graphs.ScriptNames;
            
            // should be kept, or remove from log file.
            ignoreInfo: boolean;
            ignoreWarnings: boolean;
        }
    }

    // Make values accessible via window
    interface Window {
        _config?: Graphs.Config;
    }
}

export {}