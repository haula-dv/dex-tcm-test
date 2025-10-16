"use client";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function OrderlyAPITest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test public API first
      const publicResponse = await fetch(
        "https://testnet-api-evm.orderly.org/v1/public/info"
      );
      const publicData = await publicResponse.json();

      // Test with API key if available
      const apiKey = process.env.NEXT_PUBLIC_ORDERLY_API_KEY;
      let privateData = null;

      if (apiKey) {
        try {
          const privateResponse = await fetch(
            "https://testnet-api-evm.orderly.org/v1/account",
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
            }
          );
          privateData = await privateResponse.json();
        } catch (privateError) {
          console.warn("Private API test failed:", privateError);
        }
      }

      setResult({
        public: publicData,
        private: privateData,
        apiKey: apiKey ? "Set" : "Not set",
        env: process.env.NEXT_PUBLIC_ORDERLY_ENV || "Not set",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Orderly Network API Test
      </Typography>

      <Button
        variant="contained"
        onClick={testAPI}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Testing..." : "Test API Connection"}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error: {error}
        </Alert>
      )}

      {result && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Test Results:
          </Typography>

          <Typography variant="body2" gutterBottom>
            <strong>Environment:</strong> {result.env}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <strong>API Key:</strong> {result.apiKey}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <strong>Public API Response:</strong>
          </Typography>
          <pre
            style={{
              // background: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "12px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(result.public, null, 2)}
          </pre>

          {result.private && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>Private API Response:</strong>
              </Typography>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  overflow: "auto",
                }}
              >
                {JSON.stringify(result.private, null, 2)}
              </pre>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
