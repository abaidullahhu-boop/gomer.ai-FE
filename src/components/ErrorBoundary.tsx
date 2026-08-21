import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Catches render-time errors anywhere below it. Without a boundary React
 * unmounts the whole tree on a throw, which shows the user a blank white page
 * with no explanation and no way out.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4 text-center">
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <p className="max-w-[360px] text-sm text-muted-foreground">
          The page ran into an unexpected error. Reloading usually clears it.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-1 text-sm font-medium text-foreground underline"
        >
          Reload the page
        </button>
      </div>
    );
  }
}
