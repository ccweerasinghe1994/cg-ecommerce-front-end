import { ReactNode } from "react";

const useError = (errorObject: Error | null) => {
  const ErrorDisplay = (error: Error | null): ReactNode => {
    if (!(error instanceof Error)) return null;

    return (
      <div className="error-container" role="alert">
        <p className="error-message text-red-500">
          {error.message || "An error occurred"}
        </p>
      </div>
    );
  };

  return ErrorDisplay(errorObject);
};

export default useError;
