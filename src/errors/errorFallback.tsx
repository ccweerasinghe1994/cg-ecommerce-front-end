import { FallbackProps } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log("🚀 ~ Fallback ~ resetErrorBoundary:", resetErrorBoundary);
  console.log("🚀 ~ Fallback ~ error:", error);
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export default Fallback;
