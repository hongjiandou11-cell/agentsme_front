/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Workspace from './pages/Workspace';
import Market from './pages/Market';
import Help from './pages/Help';
import ProductConcept from './pages/ProductConcept';
import VideoClone from './pages/VideoClone';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/market" element={<Market />} />
        <Route path="/help" element={<Help />} />
        <Route path="/product-concept" element={<ProductConcept />} />
        <Route path="/video-clone" element={<VideoClone />} />
      </Routes>
    </Router>
  );
}
