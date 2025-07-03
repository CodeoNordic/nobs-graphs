declare global {
    namespace Graphs {
        interface ScriptNames {
            exampleScript: string;

            /** Only used if the script result shall be returned to JS */
            onJsRequest?: string;
            onJsError?: string;            
        }
    }
}

export {};