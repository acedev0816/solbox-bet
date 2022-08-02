import React, { Suspense, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import ViewBase from './ViewBase';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import { PhantomWalletAdapter, SolletExtensionWalletAdapter, SolletWalletAdapter, GlowWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";

// pages
import Home from "./pages/Home"
import Faq from "./pages/Faq"
import About from './pages/About';
import HowToCreate from './pages/HowToCreate';
import GoldenPass from './pages/GoldenPass';
import { Provider } from 'react-redux';
import { store } from './store';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const wallets = [
  new PhantomWalletAdapter(),
  new GlowWalletAdapter(),
  new SlopeWalletAdapter(),
  new TorusWalletAdapter(),
];

// const Home = React.lazy(() => import('./pages/Home'));
// const Faq = React.lazy(() => import('./pages/Faq'));


function App() {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<ViewBase />}>
                    <Route index element={<Home />} />
                    <Route path="faq" element={<Faq />} />
                    <Route path="about" element={<About />} />
                    <Route path="how-to-create" element={<HowToCreate />} />
                    <Route path="golden-pass" element={<GoldenPass />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </Provider>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
