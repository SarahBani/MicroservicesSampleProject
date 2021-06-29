import { createBrowserHistory, History } from 'history';

// Create browser history to use in the Redux store
const baseUrl: string = document.getElementsByTagName('base')[0].getAttribute('href') as string;
export const browserHistory: History = createBrowserHistory({ basename: baseUrl });