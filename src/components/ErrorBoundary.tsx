import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "40px",
            fontFamily: "'Inter', sans-serif",
            color: "#0A0A0C",
            background: "#F8F8F6",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              margin: "0 0 16px 0",
            }}
          >
            Algo salió mal
          </h1>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.75,
              color: "#6B7280",
              maxWidth: "480px",
              margin: "0 0 24px 0",
            }}
          >
            Hubo un error inesperado. Puedes intentar recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: "#0A0A0C",
              color: "#F8F8F6",
              border: "none",
              borderRadius: "100px",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Recargar página
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre
              style={{
                marginTop: "32px",
                padding: "16px",
                background: "#F3F4F6",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "'JetBrains Mono', monospace",
                textAlign: "left",
                maxWidth: "100%",
                overflow: "auto",
              }}
            >
              {this.state.error.message}
              {this.state.error.stack && `\n\n${this.state.error.stack}`}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
