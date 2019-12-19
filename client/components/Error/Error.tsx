import { ErrorStyles } from './Error.style';

const Error = ({ error }: any) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error: any, index: number) => (
      <ErrorStyles key={index}>
        <p data-test='graphql-error'>
          <strong>Error</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test='graphql-error'>
        <strong>Error</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

export default Error;
