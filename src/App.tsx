import Graphs from '@components/Graphs';
import { useConfig } from '@context/Config';

const App: React.FC = () => {
    const config = useConfig();

    if (!config) return null;

    return <Graphs />
}

export default App;