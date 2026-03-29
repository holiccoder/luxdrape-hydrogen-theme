import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import NotFound from './pages/NotFound/NotFound';
import HomePage from './pages/HomePage/HomePage';
import HomePageV2 from './pages/HomePage/HomePageV2';
import ShopPage from './pages/ShopPage/ShopPage';
import ProductDetailSafePage from './pages/ProductDetailPage/ProductDetailSafePage';
import MotorizedShadesPage from './pages/ProductDetailPage/MotorizedShadesPage';
import BambooShadesPage from './pages/ProductDetailPage/BambooShadesPage';
import ProductDetailLuxV7Page from './pages/ProductDetailPage/ProductDetailLuxV7Page';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductDetailShadesPage from './pages/ProductDetailPage/ProductDetailShadesPage';
import ShadesProductV2Page from './pages/ProductDetailPage/ShadesProductV2Page';
import ProductDetailSwatchesPage from './pages/ProductDetailPage/ProductDetailSwatchesPage';
import ProductDetailHardwarePage from './pages/ProductDetailPage/ProductDetailHardwarePage';
import CartPage from './pages/CartPage/CartPage';
import AboutPage from './pages/AboutPage/AboutPage';
import MeasureGuidePage from './pages/MeasureGuidePage/MeasureGuidePage';
import InstallGuidePage from './pages/InstallGuidePage/InstallGuidePage';
import ContactPage from './pages/ContactPage/ContactPage';
import TradeProgramPage from './pages/TradeProgramPage/TradeProgramPage';
import InfluencerPage from './pages/InfluencerPage/InfluencerPage';
import PolicyPage from './pages/PolicyPage/PolicyPage';
import BlogPage from './pages/BlogPage/BlogPage';
import BuyingGuidePage from './pages/BuyingGuidePage/BuyingGuidePage';
import LivingRoomCollectionPage from './pages/RoomCollectionPage/LivingRoomCollectionPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/v2" element={<HomePageV2 />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:id/safe" element={<ProductDetailSafePage />} />
        <Route path="/products/:id/motorized" element={<MotorizedShadesPage />} />
        <Route path="/products/:id/bamboo" element={<BambooShadesPage />} />
        <Route path="/products/:id/lux-v7" element={<ProductDetailLuxV7Page />} />
        <Route path="/products/:id/shades" element={<ProductDetailShadesPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/:id/shades-v2" element={<ShadesProductV2Page />} />
        <Route path="/products/:id/swatches" element={<ProductDetailSwatchesPage />} />
        <Route path="/products/:id/hardware" element={<ProductDetailHardwarePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guides/measure" element={<MeasureGuidePage />} />
        <Route path="/guides/installation" element={<InstallGuidePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/trade-program" element={<TradeProgramPage />} />
        <Route path="/influencer" element={<InfluencerPage />} />
        <Route path="/policies" element={<PolicyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/buying-guide" element={<BuyingGuidePage />} />
        <Route path="/rooms/living-room" element={<LivingRoomCollectionPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
