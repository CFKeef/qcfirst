import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { normalize } from "styled-normalize";
import type { AppProps, NextWebVitalsMetric } from "next/app";

// Fonts

const GlobalStyle = createGlobalStyle`
${normalize}

body {
	font-family: "proxima_nova";
	--halfgap: .75REM;
	--fullgap: 1REM;
	--doublegap: 2REM;
	--border-radius: 5px;
	--form-height: 40px;
	--letter-spacing: .05REM;
	--success: #0070F3;
	--error: #F33;
}

::selection {
  background: #F81CE5; /* WebKit/Blink Browsers */
}
::-moz-selection {
  background: #F81CE5; /* Gecko Browsers */
}

:root {
	--fg: #000;
	--bg: #fff;
	--text: #000;
	--accent1: #FAFAFA;
	--accent2: #EAEAEA;
	--accent3: #999;
	--accent4: #888;
	--accent5: #666;
	--accent6: #444;
	--accent7: #333;
	--accent8: #111;
} 

[data-theme="dark"] {
	--fg: #fff;
	--bg: #000;
	--text: #FFF;
	--accent1: #111;
	--accent2: #333;
	--accent3: #444;
	--accent4: #666;
	--accent5: #888;
	--accent6: #999;
	--accent7: #EAEAEA;
	--accent8: #FAFAFA;
}
`;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.log(metric);
}

export default MyApp;
