import React, { useState } from 'react';
import { 
  X, QrCode, Camera, CheckCircle, Calendar, MapPin, 
  Utensils, Coffee, Plus, Minus, ShoppingCart, 
  TrendingUp, Percent, Eye, Play, ThumbsUp, 
  MessageSquare, Send, Award, Clock
} from 'lucide-react';

interface ProjectDemoProps {
  projectId: string;
  onClose: () => void;
}

export default function ProjectDemos({ projectId, onClose }: ProjectDemoProps) {
  // Demo 1: QR Attendance State
  const [attendanceLogs, setAttendanceLogs] = useState<Array<{ name: string; time: string; status: string; loc: string }>>([
    { name: "S. Bersosina", time: "09:05 AM", status: "Present", loc: "Block C, SE Lab" },
    { name: "E. Abraham", time: "09:12 AM", status: "Present", loc: "Block C, SE Lab" },
  ]);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const simulateQrScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setScanning(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newLog = {
        name: "Y. Sosina (You)",
        time: timeStr,
        status: "Present (Verified)",
        loc: "Main Campus, Addis Ababa"
      };
      setAttendanceLogs(prev => [newLog, ...prev]);
      setScanResult("Attendance Registered Successfully!");
    }, 2000);
  };

  // Demo 2: Digital Hotel Menu State
  const menuItems = [
    { id: "m1", name: "Special Kitfo", category: "Traditional", price: 450, emoji: "🍲", desc: "Finely chopped minced beef, seasoned with mitmita and niter kibbeh (clarified butter)." },
    { id: "m2", name: "Shiro Tegabino", category: "Traditional", price: 220, emoji: "🍛", desc: "Savory powdered chickpea stew served bubbling hot in a traditional clay pot." },
    { id: "m3", name: "Doro Wat", category: "Traditional", price: 550, emoji: "🍗", desc: "Slow-cooked rich chicken stew with hard-boiled eggs and exquisite spices." },
    { id: "m4", name: "Ethiopian Macchiato", category: "Beverages", price: 90, emoji: "☕", desc: "Layered, bold, and creamy espresso with beautiful velvety steamed milk froth." },
  ];
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const copy = { ...prev };
      if (copy[id] <= 1) {
        delete copy[id];
      } else {
        copy[id]--;
      }
      return copy;
    });
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum: number, qty: number) => sum + qty, 0);
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((sum: number, [id, qty]) => {
      const item = menuItems.find(m => m.id === id);
      const quantity = qty as number;
      return sum + (item ? item.price * quantity : 0);
    }, 0);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart({});
      setOrderPlaced(false);
    }, 4000);
  };

  // Demo 3: Digital Marketing Stats State
  const [marketingPeriod, setMarketingPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [activeAdCampaign, setActiveAdCampaign] = useState('All');
  
  const marketingData = {
    daily: { clicks: '1.2K', conv: '3.4%', seo: 91, reach: '12,500' },
    weekly: { clicks: '8.4K', conv: '3.8%', seo: 94, reach: '92,400' },
    monthly: { clicks: '36.2K', conv: '4.2%', seo: 95, reach: '410,000' }
  };

  const adCampaigns = [
    { id: "c1", name: "Traditional Ethiopian Cuisine Promo", budget: "$150/day", status: "Active", CTR: "5.2%", color: "bg-[#20c997]" },
    { id: "c2", name: "Web Engineering Student Services", budget: "$80/day", status: "Active", CTR: "4.1%", color: "bg-blue-500" },
    { id: "c3", name: "Contactless QR Systems Pilot", budget: "$200/day", status: "Paused", CTR: "3.8%", color: "bg-yellow-500" }
  ];

  // Demo 4: YouTube Clone State
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1342);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(8420);
  const [commentInput, setCommentInput] = useState('');
  const [videoComments, setVideoComments] = useState([
    { author: "Zekarias M.", text: "This design is super smooth! Love the responsive layout.", time: "2 hours ago" },
    { author: "Hana Girma", text: "Beautiful portfolio integration. The transitions are perfect.", time: "5 hours ago" }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setVideoComments(prev => [
      { author: "Guest Visitor (You)", text: commentInput, time: "Just now" },
      ...prev
    ]);
    setCommentInput('');
  };

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleSubscribeToggle = () => {
    if (subscribed) {
      setSubscribed(false);
      setSubscribersCount(prev => prev - 1);
    } else {
      setSubscribed(true);
      setSubscribersCount(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#111418] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/80 bg-[#161b22]">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#20c997] animate-pulse" />
            <h3 className="text-sm font-mono font-semibold text-gray-400 tracking-wider uppercase">
              {projectId === "p1" && "QR Attendance Simulator"}
              {projectId === "p2" && "Contactless Hotel Menu Simulator"}
              {projectId === "p3" && "Marketing Performance Dashboard"}
              {projectId === "p4" && "YouTube Interactive Player Demo"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Demo Stage */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          
          {/* ==================== DEMO 1: QR ATTENDANCE SYSTEM ==================== */}
          {projectId === "p1" && (
            <div className="space-y-6">
              <div className="bg-[#1b1f24] p-5 rounded-xl border border-gray-800 flex flex-col md:flex-row items-center gap-6">
                
                {/* Scanner Interface */}
                <div className="w-full md:w-1/2 flex flex-col items-center p-6 bg-black rounded-lg border border-gray-800 relative overflow-hidden min-h-[260px] justify-center">
                  {scanning ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-40 h-40 border-2 border-dashed border-[#20c997] flex items-center justify-center rounded-lg overflow-hidden">
                        <Camera size={36} className="text-[#20c997] animate-bounce" />
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-[#20c997] animate-scanner-laser shadow-[0_0_10px_#20c997]" />
                      </div>
                      <p className="text-xs font-mono text-gray-400 animate-pulse">Syncing GPS location & scanning QR...</p>
                    </div>
                  ) : scanResult ? (
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-4 bg-[#20c997]/10 rounded-full border border-[#20c997]/20">
                        <CheckCircle size={44} className="text-[#20c997]" />
                      </div>
                      <p className="text-sm font-semibold text-[#20c997]">{scanResult}</p>
                      <button
                        onClick={() => setScanResult(null)}
                        className="px-4 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-white rounded-md font-mono"
                      >
                        Reset Scanner
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-4">
                      <QrCode size={64} className="text-gray-500" />
                      <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                        To test, click below to simulate scanning a smart, cryptographically signed geolocation-bound attendance QR.
                      </p>
                      <button
                        onClick={simulateQrScan}
                        className="px-5 py-2.5 bg-[#20c997] hover:bg-[#1baa80] text-[#111418] font-bold text-xs rounded-lg uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
                      >
                        Simulate Scan
                      </button>
                    </div>
                  )}
                </div>

                {/* Dashboard Logs */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold tracking-wide uppercase text-gray-300 flex items-center gap-2">
                      <Calendar size={16} className="text-[#20c997]" />
                      Live Attendance Log
                    </h4>
                    <span className="text-[10px] font-mono bg-[#20c997]/10 text-[#20c997] px-2 py-0.5 rounded-full border border-[#20c997]/20">
                      Total: {attendanceLogs.length} Checked In
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {attendanceLogs.map((log, index) => (
                      <div 
                        key={index} 
                        className={`p-3.5 bg-black/40 rounded-lg border border-gray-800/80 flex items-start justify-between gap-3 ${index === 0 && scanResult ? 'border-[#20c997]/30 bg-[#20c997]/5' : ''}`}
                      >
                        <div className="space-y-1 text-xs">
                          <p className="font-bold text-white flex items-center gap-1.5">
                            {log.name}
                            {log.status.includes('Verified') && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#20c997] inline-block" />
                            )}
                          </p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1">
                            <MapPin size={10} /> {log.loc}
                          </p>
                        </div>
                        <div className="text-right flex flex-col justify-between items-end h-full">
                          <span className="text-[10px] font-mono font-semibold text-[#20c997]">{log.time}</span>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-gray-900 border border-gray-800 text-gray-400 rounded mt-1.5">
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Instructions / Spec Sheet */}
              <div className="text-xs text-gray-500 space-y-1 border-t border-gray-800/60 pt-4 leading-relaxed font-sans">
                <p className="font-semibold text-gray-400">Technical Highlights:</p>
                <p>• Integrates HTML5 QR Code scanning libraries dynamically into responsive React shells.</p>
                <p>• Enforces geolocation locks so attendance cannot be spoofed outside of classrooms or designated workstations.</p>
                <p>• Features micro-interactions and instant local storage syncing for extreme reliability.</p>
              </div>
            </div>
          )}

          {/* ==================== DEMO 2: DIGITAL HOTEL MENU ==================== */}
          {projectId === "p2" && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Menu Items Showcase */}
                <div className="flex-1 space-y-4">
                  <h4 className="text-sm font-bold tracking-wide uppercase text-gray-300 flex items-center gap-2">
                    <Utensils size={16} className="text-[#20c997]" />
                    Explore contactless menu
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="p-4 bg-[#1b1f24] rounded-xl border border-gray-800/80 flex flex-col justify-between h-full hover:border-gray-700 transition-colors">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="text-2xl">{item.emoji}</span>
                            <span className="text-xs font-mono font-bold text-[#20c997] bg-[#20c997]/5 border border-[#20c997]/15 px-2 py-0.5 rounded">
                              {item.price} ETB
                            </span>
                          </div>
                          <h5 className="font-bold text-white text-sm mt-1">{item.name}</h5>
                          <p className="text-xs text-gray-400 leading-normal line-clamp-2">{item.desc}</p>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-800/60 flex justify-between items-center">
                          <span className="text-[10px] text-gray-500 uppercase font-mono">{item.category}</span>
                          <button
                            onClick={() => addToCart(item.id)}
                            className="p-1.5 rounded-lg bg-[#20c997] hover:bg-[#1baa80] text-[#111418] font-bold text-xs flex items-center gap-1 transition-transform active:scale-95"
                          >
                            <Plus size={14} /> Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart & Ordering Panel */}
                <div className="w-full lg:w-80 bg-[#161b22] p-5 rounded-xl border border-gray-800 flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-4">
                      <h4 className="text-xs uppercase font-mono font-bold text-gray-400 flex items-center gap-1.5">
                        <ShoppingCart size={14} />
                        Your Order Table #4
                      </h4>
                      <span className="text-xs font-mono text-gray-400">
                        ({getCartCount()} items)
                      </span>
                    </div>

                    {orderPlaced ? (
                      <div className="text-center py-12 space-y-3 animate-fade-in">
                        <div className="w-12 h-12 bg-[#20c997]/10 text-[#20c997] rounded-full flex items-center justify-center mx-auto border border-[#20c997]/20">
                          <CheckCircle size={24} className="animate-bounce" />
                        </div>
                        <h5 className="font-bold text-[#20c997] text-sm">Order Sent Successfully!</h5>
                        <p className="text-[11px] text-gray-400 leading-normal">
                          Your contactless order is now in the kitchen. A waiter will bring your meals shortly!
                        </p>
                      </div>
                    ) : Object.keys(cart).length === 0 ? (
                      <div className="text-center py-12 text-gray-500 text-xs">
                        <Coffee size={36} className="mx-auto text-gray-600 mb-3" />
                        Select traditional delicious meals to populate your cart!
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                        {Object.entries(cart).map(([id, qty]) => {
                          const item = menuItems.find(m => m.id === id);
                          if (!item) return null;
                          return (
                            <div key={id} className="flex justify-between items-center text-xs bg-black/30 p-2.5 rounded-lg border border-gray-800">
                              <div className="space-y-0.5">
                                <p className="font-bold text-white">{item.name}</p>
                                <p className="text-[10px] text-gray-400">{item.price} ETB x {qty}</p>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-md p-1">
                                <button
                                  onClick={() => removeFromCart(id)}
                                  className="text-gray-400 hover:text-white p-0.5"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-mono text-white text-xs px-1">{qty}</span>
                                <button
                                  onClick={() => addToCart(id)}
                                  className="text-gray-400 hover:text-[#20c997] p-0.5"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {!orderPlaced && Object.keys(cart).length > 0 && (
                    <div className="border-t border-gray-800 pt-4 mt-4 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">Subtotal:</span>
                        <span className="font-mono font-bold text-white">{getCartTotal()} ETB</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">Service & VAT (15%):</span>
                        <span className="font-mono font-bold text-white">{Math.round(getCartTotal() * 0.15)} ETB</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-dashed border-gray-800 pt-2.5">
                        <span className="text-white font-bold">Total:</span>
                        <span className="font-mono font-bold text-[#20c997] text-base">{Math.round(getCartTotal() * 1.15)} ETB</span>
                      </div>
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full py-2.5 bg-[#20c997] hover:bg-[#1baa80] text-[#111418] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors"
                      >
                        Place Contactless Order
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Technical Spec */}
              <div className="text-xs text-gray-500 space-y-1 border-t border-gray-800/60 pt-4 leading-relaxed font-sans">
                <p className="font-semibold text-gray-400">Technical Highlights:</p>
                <p>• Elegant UI matching premium high-end tablet hardware standards for restaurants and hospitality suites.</p>
                <p>• Offline-first design utilizing LocalStorage so client selections are never lost due to temporary WiFi drops.</p>
                <p>• Superb UI/UX and rapid animations providing instant visual micro-feedbacks during ordering flow.</p>
              </div>
            </div>
          )}

          {/* ==================== DEMO 3: DIGITAL MARKETING ==================== */}
          {projectId === "p3" && (
            <div className="space-y-6">
              <div className="bg-[#1b1f24] p-5 rounded-xl border border-gray-800 space-y-6">
                
                {/* Tab select and overall info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp size={16} className="text-[#20c997]" />
                      Sosina's Automated Marketing Dashboard
                    </h4>
                    <p className="text-[11px] text-gray-400">Continuous analysis of user acquisition and ad conversion logs</p>
                  </div>

                  <div className="flex gap-1.5 bg-black p-1 rounded-lg border border-gray-800">
                    {['daily', 'weekly', 'monthly'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setMarketingPeriod(p as 'daily' | 'weekly' | 'monthly')}
                        className={`px-3 py-1 text-[10px] font-mono rounded uppercase tracking-wider transition-colors ${
                          marketingPeriod === p
                            ? 'bg-[#20c997] text-[#111418] font-bold'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dashboard Stats Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-black/40 rounded-xl border border-gray-800 text-center">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Total Reach</p>
                    <p className="text-lg sm:text-xl font-mono font-bold text-[#20c997] mt-1">
                      {marketingData[marketingPeriod].reach}
                    </p>
                    <span className="text-[9px] text-emerald-500 font-mono font-semibold">+14.2%</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-gray-800 text-center">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Click Through</p>
                    <p className="text-lg sm:text-xl font-mono font-bold text-white mt-1">
                      {marketingData[marketingPeriod].clicks}
                    </p>
                    <span className="text-[9px] text-emerald-500 font-mono font-semibold">+8.5%</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-gray-800 text-center">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Conversion Rate</p>
                    <p className="text-lg sm:text-xl font-mono font-bold text-white mt-1">
                      {marketingData[marketingPeriod].conv}
                    </p>
                    <span className="text-[9px] text-emerald-500 font-mono font-semibold">+4.2%</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-gray-800 text-center">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Global SEO Score</p>
                    <p className="text-lg sm:text-xl font-mono font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
                      <Percent size={14} />
                      {marketingData[marketingPeriod].seo}
                    </p>
                    <span className="text-[9px] text-[#20c997] font-mono font-semibold">Excellent</span>
                  </div>
                </div>

                {/* Simulated Chart representation */}
                <div className="p-5 bg-black/60 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-xs uppercase font-mono text-gray-400 font-bold">Client Traffic Distribution</h5>
                    <span className="text-[10px] font-mono text-[#20c997] flex items-center gap-1"><Eye size={12}/> Live Log Analysis</span>
                  </div>
                  {/* Highly styled visual CSS Chart bars */}
                  <div className="h-28 flex items-end justify-between gap-2.5 pt-4">
                    {[
                      { label: "Mon", height: "40%", val: "3.2K" },
                      { label: "Tue", height: "65%", val: "5.1K" },
                      { label: "Wed", height: "55%", val: "4.4K" },
                      { label: "Thu", height: "85%", val: "6.8K", highlight: true },
                      { label: "Fri", height: "95%", val: "7.9K", highlight: true },
                      { label: "Sat", height: "70%", val: "5.5K" },
                      { label: "Sun", height: "50%", val: "3.9K" }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                        <div className="text-[9px] font-mono font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-10 bg-gray-900 border border-gray-800 px-1 rounded">
                          {bar.val}
                        </div>
                        <div 
                          style={{ height: bar.height }} 
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            bar.highlight 
                              ? 'bg-gradient-to-t from-[#1baa80] to-[#20c997] shadow-lg shadow-[#20c997]/20 group-hover:brightness-110' 
                              : 'bg-gray-800 group-hover:bg-gray-700'
                          }`}
                        />
                        <span className="text-[10px] font-mono text-gray-500">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ad Campaigns List */}
                <div className="space-y-3">
                  <h5 className="text-xs uppercase font-mono text-gray-400 font-bold">Active Acquisition Channels</h5>
                  <div className="space-y-2">
                    {adCampaigns.map((camp) => (
                      <div key={camp.id} className="p-3 bg-black/40 rounded-lg border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${camp.color}`} />
                          <span className="text-xs font-bold text-white">{camp.name}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-gray-400">
                          <span>Budget: <strong className="text-white">{camp.budget}</strong></span>
                          <span>CTR: <strong className="text-[#20c997]">{camp.CTR}</strong></span>
                          <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${camp.status === 'Active' ? 'bg-[#20c997]/10 text-[#20c997]' : 'bg-gray-800 text-gray-500'}`}>
                            {camp.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Technical Spec */}
              <div className="text-xs text-gray-500 space-y-1 border-t border-gray-800/60 pt-4 leading-relaxed font-sans">
                <p className="font-semibold text-gray-400">Technical Highlights:</p>
                <p>• Highly optimized, reactive UI layout that handles massive real-time asynchronous marketing feeds.</p>
                <p>• Engineered with fluid grid systems and modern dashboard styling aesthetics to maximize information density.</p>
                <p>• Utilizes custom mathematical layout configurations to display data without heavy system package overhead.</p>
              </div>
            </div>
          )}

          {/* ==================== DEMO 4: YOUTUBE CLONE ==================== */}
          {projectId === "p4" && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Player and Info */}
                <div className="flex-1 space-y-4">
                  
                  {/* Virtual Video Screen */}
                  <div className="aspect-video w-full bg-black rounded-xl border border-gray-800 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-950 via-gray-900 to-[#111418] opacity-80" />
                    <Play size={48} className="text-[#20c997] relative z-10 hover:scale-110 transition-transform cursor-pointer" />
                    <p className="text-xs font-mono text-gray-400 mt-2.5 relative z-10 uppercase tracking-wider">Simulating High-Fidelity Video Feed</p>
                    
                    {/* Tiny custom progress bar bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-gray-800">
                      <div className="w-1/3 h-full bg-[#20c997] rounded-r shadow-[0_0_8px_#20c997]" />
                    </div>
                  </div>

                  {/* Video Metadata */}
                  <div className="space-y-3.5">
                    <h4 className="text-base sm:text-lg font-bold text-white font-display">
                      Building high-performance interactive web portals with React & TypeScript
                    </h4>

                    {/* Social feedback widgets */}
                    <div className="flex flex-wrap justify-between items-center gap-4 py-3 border-y border-gray-800/80">
                      
                      {/* Author Card */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#20c997] flex items-center justify-center text-[#111418] font-bold text-xs uppercase">
                          YS
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Y. Sosina (You)</p>
                          <p className="text-[10px] text-gray-400 font-mono">{(subscribersCount).toLocaleString()} subscribers</p>
                        </div>
                        <button
                          onClick={handleSubscribeToggle}
                          className={`ml-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                            subscribed 
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                              : 'bg-white hover:bg-gray-200 text-[#111418]'
                          }`}
                        >
                          {subscribed ? 'Subscribed' : 'Subscribe'}
                        </button>
                      </div>

                      {/* Action Likes & Share */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleLikeToggle}
                          className={`flex items-center gap-1.5 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/80 rounded-full text-xs transition-colors border ${
                            liked ? 'border-[#20c997] text-[#20c997]' : 'border-transparent text-gray-300 hover:text-white'
                          }`}
                        >
                          <ThumbsUp size={14} />
                          <span className="font-mono font-semibold">{likesCount}</span>
                        </button>
                        <span className="text-xs text-gray-500 font-mono">1.2K Views</span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Live Chat / Comments Frame */}
                <div className="w-full lg:w-80 bg-[#161b22] p-4 rounded-xl border border-gray-800 flex flex-col justify-between h-[360px]">
                  
                  <div className="flex flex-col h-full justify-between">
                    <div className="border-b border-gray-800 pb-2.5 mb-3 flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-[#20c997]" />
                      <h4 className="text-xs uppercase font-mono font-bold text-gray-400">Comments ({videoComments.length})</h4>
                    </div>

                    {/* Scrollable comment list */}
                    <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar text-xs">
                      {videoComments.map((comment, i) => (
                        <div key={i} className="space-y-1 p-2 bg-black/20 rounded-lg border border-gray-800/60 animate-fade-in">
                          <div className="flex justify-between text-[10px]">
                            <strong className="text-gray-300">{comment.author}</strong>
                            <span className="text-gray-500 font-mono">{comment.time}</span>
                          </div>
                          <p className="text-gray-400 leading-normal">{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Comment submission form */}
                    <form onSubmit={handleAddComment} className="mt-4 pt-3 border-t border-gray-800 flex gap-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add a public comment..."
                        className="flex-1 bg-black text-xs px-3 py-2 rounded-lg border border-gray-800 focus:border-[#20c997]/50 focus:outline-none text-white placeholder-gray-500"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-lg bg-[#20c997] hover:bg-[#1baa80] text-[#111418] transition-colors"
                      >
                        <Send size={14} />
                      </button>
                    </form>
                  </div>

                </div>

              </div>

              {/* Technical Spec */}
              <div className="text-xs text-gray-500 space-y-1 border-t border-gray-800/60 pt-4 leading-relaxed font-sans">
                <p className="font-semibold text-gray-400">Technical Highlights:</p>
                <p>• Demonstrates mastery of interactive state binding with instant component rerendering loops.</p>
                <p>• Clean aspect-ratio container setups that respond seamlessly to mobile portrait vs widescreen desktop viewports.</p>
                <p>• Polished, highly faithful reproduction of complex digital stream mechanics and subscription matrices.</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
