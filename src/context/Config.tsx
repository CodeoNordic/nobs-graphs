import { createContext, useContext, useEffect, useState } from 'react';

import { loadCallbacks } from '@utils/performScript';

const defaultConfig: Partial<Graphs.Config> = {
    data: []
};

// Parses the JSON from FileMaker into a readable config
const parseConfig = (cfg: string = '{}') => {
    try {
        const config = JSON.parse(cfg) as Graphs.Config;

        Object.keys(defaultConfig).forEach((key) => {
            (config as RSAny)[key] ??= defaultConfig[key as keyof Graphs.Config];
        });

        return config;
    } catch(err) {
        console.error(err);
    }
}

// Runs any script that was attempted called before the config was loaded
const runLoadCallbacks = () => loadCallbacks.length && loadCallbacks.forEach(cb => {
    cb();
    loadCallbacks.splice(loadCallbacks.indexOf(cb), 1);
});

// FileMaker may call init before useEffect can assign the function
// This acts as a failsafe
window.init = cfg => {
    const parsedConfig = parseConfig(cfg);
    if (!parsedConfig) return;

    window._config = parsedConfig;
    runLoadCallbacks();
};

const ConfigContext = createContext<State<Graphs.Config|null>>([null, () => {}]);
const ConfigProvider: FC = ({ children }) => {
    const [config, setConfig] = useState<Graphs.Config|null>(null);

    useEffect(() => {
        if (window._config !== undefined) setConfig(window._config);

        window.init = cfg => {
            const parsedConfig = parseConfig(cfg);
            if (!parsedConfig) return;

            window._config = parsedConfig;
            setConfig(parsedConfig);

            runLoadCallbacks();
        }
    }, []);

    // Update window._config upon change
    useEffect(() => {
        window._config = config || undefined;
    }, [config]);

    //if (!config) return null;
    return <ConfigContext.Provider value={[config, setConfig]}>
        {children}
    </ConfigContext.Provider>
}

export const useConfig = () => {
    const [config] = useContext(ConfigContext);
    return config;
}

export const useConfigState = () => {
    const ctx = useContext(ConfigContext);
    return ctx;
}

export default ConfigProvider;