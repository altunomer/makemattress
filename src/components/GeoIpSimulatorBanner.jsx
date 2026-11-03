import React, { useState } from 'react';
import { Globe, MapPin, Zap, ChevronRight, X, Info } from 'lucide-react';
import { simulatedRegions } from '../data/initialData';

export default function GeoIpSimulatorBanner({
  currentRegion,
  onSelectRegion,
  activeLang
}) {
  const [collapsed, setCollapsed] = useState(false);

  const activeRegionObj = simulatedRegions.find(r => r.code === currentRegion) || simulatedRegions[0];

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 left-4 z-40 bg-[#1E1E1C] text-white px-3 py-2 rounded-full shadow-2xl border border-[#3E3E38] text-[11px] font-semibold flex items-center gap-2 hover:bg-[#2C2C28] transition-all"
        title="Open Cloudflare GeoIP Routing Simulator"
      >
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span>GeoIP Edge Simulator ({activeRegionObj.flag} {activeRegionObj.code})</span>
      </button>
    );
  }

  return (
    <aside aria-label="Cloudflare GeoIP Edge Routing Simulator" className="bg-[#181816] text-[#E0DDD5] border-b border-[#2C2C28] py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-400/20">
            <Zap className="w-3 h-3 text-amber-400" />
            CF-IPCountry (Edge Route)
          </span>
          <span className="text-[11px] text-[#A6A092]">
            Simulated Visitor Location: <strong className="text-white">{activeRegionObj.name} {activeRegionObj.flag}</strong> &bull; Auto-route target: <span className="text-emerald-400 font-mono font-bold">/{activeRegionObj.lang}/</span>
          </span>
        </div>

        {/* Region Switch Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-[#777] hidden lg:inline mr-1">
            Test Region:
          </span>
          {simulatedRegions.map(reg => (
            <button
              key={reg.code}
              onClick={() => onSelectRegion(reg.code)}
              className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                currentRegion === reg.code
                  ? 'bg-amber-400 text-[#141412] font-bold shadow-xs'
                  : 'bg-[#262622] text-[#B0AAA0] hover:text-white hover:bg-[#33332D]'
              }`}
            >
              <span>{reg.flag}</span>
              <span>{reg.code}</span>
            </button>
          ))}

          <button
            onClick={() => setCollapsed(true)}
            className="text-[#666] hover:text-[#999] ml-2 p-1"
            title="Minimize bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
