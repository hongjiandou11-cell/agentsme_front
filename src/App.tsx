/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import Workspace from './pages/Workspace';
import Market from './pages/Market';
import Help from './pages/Help';
import ProductConcept from './pages/ProductConcept';
import VideoClone from './pages/VideoClone';
import ProductMaterial from './pages/ProductMaterial';
import AppShell from './pages/AppShell';
import ContentPublish from './pages/ContentPublish';
import Pricing from './pages/Pricing';
import InspirationLibrary from './pages/InspirationLibrary';
import AppGrowthCase from './pages/AppGrowthCase';
import EcommerceCase from './pages/EcommerceCase';
import EcommerceVideoClone from './pages/EcommerceVideoClone';

function AnimatedRoutes() {
  const location = useLocation();
  return (
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/market" element={<Market />} />
        <Route path="/help" element={<Help />} />
        <Route path="/product-concept" element={<ProductConcept />} />
        <Route path="/video-clone" element={<VideoClone />} />
        <Route path="/ecommerce-video-clone" element={<EcommerceVideoClone />} />
        <Route path="/product-material" element={<ProductMaterial />} />
        <Route path="/app-shell" element={<AppShell />} />
        <Route path="/content-publish" element={<ContentPublish />} />
        <Route path="/inspiration-library" element={<InspirationLibrary />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/case/app-growth" element={<AppGrowthCase />} />
        <Route path="/case/ecommerce" element={<EcommerceCase />} />
      </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
