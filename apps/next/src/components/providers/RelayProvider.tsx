import { ReactNode } from "react";
import { RelayEnvironmentProvider } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import type { FetchFunction, IEnvironment } from 'relay-runtime';


/**
 * Define a function that fetches the results of an operation (query/mutation)
 * and returns its results as a Promise.
 */
const fetchQuery: FetchFunction = async (operation, variables) => {
  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return await response.json();
};

/**
 * Create a network layer from the fetch function
 */
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment: any  = new Environment({
  network,
  store,
}) ;

interface RelayProviderProps {
  children: ReactNode;
}

export const RelayProvider = ({ children }: RelayProviderProps) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};