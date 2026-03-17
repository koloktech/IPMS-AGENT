import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, DollarSign, ClipboardList, BarChart2, Map as MapIcon, Clock,
  Home, List, PieChart, Bot, MessageSquare, User, Settings, Folder, Star, History,
  Sparkles, ArrowUpRight, ArrowDownRight, ArrowRight, CheckCircle2, ChevronDown,
  Send, UserCircle2
} from 'lucide-react';

const agentData: Record<string, any> = {
  risk: {
    id: 'risk',
    label: 'Select Project',
    icon: AlertTriangle,
    title: 'Project Risk Assessment',
    options: [
      'Pan Borneo Highway', 'Kuching Smart City', 'Sibu Port Modernization',
      'Miri Airport Expansion', 'Sarawak Water Supply', 'Kuching-Samarahan Railway'
    ],
    metrics: [
      { label: 'Risk Score', value: '7.2', unit: '/10', trend: 'up', trendValue: '+0.5' },
      { label: 'Critical Items', value: '12', unit: 'projects', trend: 'up', trendValue: '+2' },
      { label: 'At Risk', value: '8', unit: 'of 45', trend: 'up', trendValue: '+1' },
      { label: 'Mitigation', value: '45%', unit: 'complete', trend: 'neutral', trendValue: '0%' }
    ],
    insights: [
      'Project faces complexity due to multi-divisional coordination across 4 divisions',
      'Current weather patterns in monsoon season may delay construction in Miri & Limbang',
      'Resource constraints identified in specialized equipment availability',
      'Community engagement processes progressing slower than anticipated'
    ],
    recommendation: 'Escalate resource planning for weather-dependent phases. Increase community engagement team capacity by 25%.',
    tableHeaders: ['Phase', 'Division', 'Risk Level', 'Impact', 'Action'],
    tableData: [
      ['Construction', 'Kuching', 'Medium', 'High', 'Supervise'],
      ['Civil Works', 'Sibu', 'High', 'Critical', 'Expedite'],
      ['Land Acq', 'Sri Aman', 'High', 'High', 'Engage'],
      ['Environment', 'Miri', 'Medium', 'Medium', 'Monitor']
    ],
    chatConfig: {
      suggestions: ["What are the main risks?", "How does weather affect us?", "Show mitigation plan"],
      demoResponse: "Based on the current risk profile, the primary concern is the upcoming monsoon season affecting Phase 3. I recommend re-allocating heavy machinery before November to mitigate this."
    }
  },
  budget: {
    id: 'budget',
    label: 'Select Department',
    icon: DollarSign,
    title: 'Budget Anomaly Report',
    options: [
      'Public Works', 'Education', 'Health', 'Infrastructure & Dev',
      'Urban Development', 'Water & Sanitation'
    ],
    metrics: [
      { label: 'Anomalies', value: '23', unit: 'items', trend: 'up', trendValue: '+5' },
      { label: 'Variance', value: '8.4%', unit: 'of budget', trend: 'up', trendValue: '+2.1%' },
      { label: 'Flagged', value: 'RM 2.3M', unit: 'amount', trend: 'up', trendValue: '+400K' },
      { label: 'Severity', value: '6', unit: '/10', trend: 'neutral', trendValue: '0' }
    ],
    insights: [
      'Personnel overspend of 11.2% due to project acceleration initiatives',
      'Equipment procurement spike (RM 580K vs RM 500K budgeted)',
      'Public Works shows excellent cost control with -10% variance',
      'Services budget increase due to emergency maintenance in rural areas'
    ],
    recommendation: 'Review emergency maintenance contract procedures. Normalize equipment procurement through bulk purchasing.',
    tableHeaders: ['Department', 'Category', 'Budgeted', 'Actual', 'Status'],
    tableData: [
      ['Infra Dev', 'Personnel', 'RM 1.2M', 'RM 1.35M', 'HIGH'],
      ['Public Works', 'Materials', 'RM 800K', 'RM 720K', 'GOOD'],
      ['Water Board', 'Equipment', 'RM 500K', 'RM 580K', 'CRITICAL'],
      ['Education', 'Services', 'RM 300K', 'RM 315K', 'MEDIUM']
    ],
    chatConfig: {
      suggestions: ["Why is Water Board over budget?", "Show cost saving opportunities", "Forecast next quarter"],
      demoResponse: "The Water Board's equipment overspend (RM 580K vs RM 500K) is primarily due to emergency pump replacements. Bulk purchasing could save 15% next quarter."
    }
  },
  meeting: {
    id: 'meeting',
    label: 'Select Division',
    icon: ClipboardList,
    title: 'Meeting Brief Report',
    options: [
      'Kuching Division', 'Sibu Division', 'Miri Division',
      'Limbang Division', 'Bintulu Division', 'Sri Aman Division'
    ],
    metrics: [
      { label: 'Total Projects', value: '28', unit: 'projects', trend: 'neutral', trendValue: '0' },
      { label: 'Delayed', value: '10', unit: 'projects', trend: 'up', trendValue: '+3' },
      { label: 'Critical', value: '4', unit: 'projects', trend: 'up', trendValue: '+1' },
      { label: 'On Track', value: '14', unit: 'projects', trend: 'down', trendValue: '-4' }
    ],
    insights: [
      'Kuching Division leads with highest project concentration (28 total)',
      'Delay increase of +3 projects correlates with monsoon season impact',
      '4 critical projects require immediate steering committee intervention',
      'Budget utilization at 87% indicates tight resource constraints'
    ],
    recommendation: 'Schedule emergency steering committee meeting for 4 critical projects. Allocate 10% contingency budget for monsoon-affected phases.',
    tableHeaders: ['Status', 'Count', '% of Total', 'Budget Impact', 'Escalation'],
    tableData: [
      ['On Track', '14', '50%', 'Good', 'Continue'],
      ['At Risk', '10', '36%', 'Medium', 'Weekly'],
      ['Critical', '4', '14%', 'High', 'Daily'],
      ['Summary', '28', '100%', '87% used', 'Action']
    ],
    chatConfig: {
      suggestions: ["Summarize critical projects", "Draft email to committee", "What are the key blockers?"],
      demoResponse: "Here is a quick summary: 4 projects are currently in critical status, mostly due to weather delays. Budget utilization is high at 87%. Immediate action is needed for the Miri-Limbang corridor."
    }
  },
  performance: {
    id: 'performance',
    label: 'Select Agency',
    icon: BarChart2,
    title: 'Agency Performance Analysis',
    options: [
      'Sarawak Development Authority', 'Muda Agricultural Dev', 'Sarawak Dams Dev Company',
      'Sarawak Digital School', 'Sarawak Rivers Authority', 'Sarawak Land Authority'
    ],
    metrics: [
      { label: 'Overall Score', value: '8.1', unit: '/10', trend: 'up', trendValue: '+0.3' },
      { label: 'Projects Done', value: '42', unit: 'projects', trend: 'up', trendValue: '+3' },
      { label: 'On-Time', value: '94%', unit: 'rate', trend: 'up', trendValue: '+2%' },
      { label: 'Quality', value: '4.7', unit: '/5', trend: 'neutral', trendValue: '0' }
    ],
    insights: [
      'Sarawak Development Authority demonstrates strong 94% on-time delivery',
      'Quality scores consistently high (4.7/5) across all project types',
      'Completed 42 projects - 3 more than previous period',
      'Cost variance controlled at +3% indicating efficient resource management'
    ],
    recommendation: 'Recognize SDA as exemplary performer. Assign to Pan Borneo Highway management. Scale team for Smart City expansion.',
    tableHeaders: ['Metric', 'Current', 'Target', 'Performance', 'Status'],
    tableData: [
      ['Quality', '4.7/5', '4.5/5', 'Exceeds', 'GOOD'],
      ['Timeline', '94%', '90%', 'Exceeds', 'GOOD'],
      ['Cost Control', '8.2/10', '8/10', 'Meets', 'GOOD'],
      ['Communication', '4.8/5', '4.5/5', 'Exceeds', 'GOOD']
    ],
    chatConfig: {
      suggestions: ["Who is the top performer?", "Compare SDA with SLA", "Why did quality drop?"],
      demoResponse: "Sarawak Development Authority (SDA) is currently the top performer with a 94% on-time delivery rate and a 4.7/5 quality score. They have successfully completed 42 projects this year."
    }
  },
  geo: {
    id: 'geo',
    label: 'Select Division',
    icon: MapIcon,
    title: 'Geo-Spatial Analysis Results',
    options: [
      'Kuching Division', 'Sibu Division', 'Miri Division',
      'Limbang Division', 'Bintulu Division', 'Sri Aman Division'
    ],
    metrics: [
      { label: 'Coverage Area', value: '2,241', unit: 'km²', trend: 'neutral', trendValue: '0' },
      { label: 'Data Points', value: '12,547', unit: 'locations', trend: 'up', trendValue: '+1,200' },
      { label: 'Density', value: '5.6', unit: '/km²', trend: 'up', trendValue: '+0.5' },
      { label: 'Anomalies', value: '34', unit: 'zones', trend: 'up', trendValue: '+8' }
    ],
    insights: [
      'Kuching Division shows highest infrastructure density due to urban concentration',
      'Data collection improved with +1,200 new survey points enhancing accuracy',
      'Identified 34 anomalous zones requiring investigation in rural areas',
      'Geographic constraints in Bintulu impact survey frequency and data cycles'
    ],
    recommendation: 'Establish quarterly drone surveys for remote areas. Consolidate infrastructure clusters in Sibu and Bintulu for efficiency.',
    tableHeaders: ['Division', 'Area (km²)', 'Density', 'Status', 'Priority'],
    tableData: [
      ['Kuching', '2,240', '8.2/km²', 'High', 'Monitor'],
      ['Sibu', '8,400', '2.1/km²', 'Moderate', 'Develop'],
      ['Miri', '15,800', '1.5/km²', 'Sparse', 'Invest'],
      ['Limbang', '5,100', '0.9/km²', 'Sparse', 'Priority']
    ],
    chatConfig: {
      suggestions: ["Where are the anomalies?", "Show infrastructure density", "Plan drone flight path"],
      demoResponse: "The 34 anomalous zones are primarily clustered in the rural areas of the Bintulu and Sibu divisions. I recommend deploying drone surveys to these specific coordinates to gather more accurate terrain data."
    }
  },
  timeline: {
    id: 'timeline',
    label: 'Select Project',
    icon: Clock,
    title: 'Project Timeline Analysis',
    options: [
      'Pan Borneo Highway', 'Kuching Smart City', 'Sibu Port Modernization',
      'Miri Airport Expansion', 'Sarawak Water Supply', 'Kuching-Samarahan Railway'
    ],
    metrics: [
      { label: 'Progress', value: '62%', unit: 'complete', trend: 'up', trendValue: '+8%' },
      { label: 'Delayed', value: '23', unit: 'days', trend: 'up', trendValue: '+5' },
      { label: 'Critical Path', value: '47', unit: 'days left', trend: 'down', trendValue: '-2' },
      { label: 'Variance', value: '-15%', unit: 'behind', trend: 'down', trendValue: '-3%' }
    ],
    insights: [
      'Pan Borneo Phase 1 is 62% complete with delays from extended monsoon',
      '23-day cumulative delay from civil works in Miri-Limbang corridor flooding',
      'Critical path shows 47 days remaining - tight but recoverable',
      'Kuching-Samarahan component ahead of schedule providing flexibility'
    ],
    recommendation: 'Deploy additional crews for weekend shifts in Miri-Limbang. Bring forward Kuching completion. Implement weekly tracking.',
    tableHeaders: ['Phase', 'Progress', 'Status', 'Est. Complete', 'Risk'],
    tableData: [
      ['Phase 1: Kuching', '100%', 'Done', 'Jan 2024', 'None'],
      ['Phase 2: Sibu', '85%', 'On Track', 'Apr 2024', 'Low'],
      ['Phase 3: Miri', '35%', 'Delayed', 'Jul 2024', 'High'],
      ['Phase 4: Limbang', '0%', 'Not Start', 'Oct 2024', 'Critical']
    ],
    chatConfig: {
      suggestions: ["When will Phase 3 complete?", "What is the critical path?", "How to recover the delay?"],
      demoResponse: "To recover the 23-day delay on the critical path, you can deploy additional crews for weekend shifts in the Miri-Limbang corridor. This could bring the estimated completion date back to early July 2024."
    }
  }
};

function getStatusBadgeClasses(status: string) {
  const s = status.toLowerCase();
  if (['good', 'exceeds', 'done', 'supervise', 'on track', 'none', 'low'].includes(s)) {
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }
  if (['high', 'critical', 'delayed', 'expedite'].includes(s)) {
    return 'bg-red-100 text-red-800 border-red-200';
  }
  if (['medium', 'weekly', 'engage', 'monitor', 'moderate'].includes(s)) {
    return 'bg-amber-100 text-amber-800 border-amber-200';
  }
  return 'bg-slate-100 text-slate-800 border-slate-200';
}

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export default function App() {
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any | null>(null);

  // Chatbot states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeAgent = activeAgentId ? agentData[activeAgentId] : null;

  const handleAgentSelect = (id: string) => {
    setActiveAgentId(id);
    setSelectedValue('');
    setResults(null);
    setChatMessages([]);
  };

  const handleGenerate = () => {
    if (!selectedValue) return;
    
    setIsGenerating(true);
    setResults(null);
    setChatMessages([]);

    setTimeout(() => {
      setIsGenerating(false);
      setResults({
        ...activeAgent,
        generatedAt: new Date()
      });
      
      // Initialize chat with a greeting
      setChatMessages([
        {
          role: 'ai',
          content: `Hello! I've analyzed the data for ${selectedValue}. I'm ready to answer any specific questions you have about these results.`
        }
      ]);
    }, 2000);
  };

  useEffect(() => {
    if (selectedValue) {
      handleGenerate();
    }
  }, [selectedValue]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isChatTyping) return;
    
    setChatMessages(prev => [...prev, { role: 'user', content: text }]);
    setChatInput('');
    setIsChatTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: activeAgent?.chatConfig.demoResponse || 'I am analyzing that request based on the current data parameters...' 
      }]);
      setIsChatTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              I
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">IPMS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <NavLink icon={Home} label="Home" />
            <NavLink icon={List} label="Project Listing" />
            <NavLink icon={PieChart} label="Analytics" />
            <NavLink icon={Bot} label="AI Workbench" active />
            <NavLink icon={MessageSquare} label="AI Chatbot" />
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <User size={18} className="text-slate-600" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 hidden lg:flex flex-col py-6 px-4 overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Navigation</h3>
            <div className="space-y-1">
              <SidebarItem icon={Bot} label="AI Workbench" active />
              <SidebarItem icon={Folder} label="My Analysis" />
              <SidebarItem icon={Star} label="Saved Reports" />
              <SidebarItem icon={History} label="History" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Tools</h3>
            <div className="space-y-1">
              <SidebarItem icon={PieChart} label="Analytics" />
              <SidebarItem icon={Settings} label="Settings" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Page Header */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100/50">
              <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">AI-Powered Project Insights</h1>
              <p className="text-slate-600">Sarawak State Development Projects Analysis & Decision Support</p>
            </div>

            {/* Workbench Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Bot size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">AI Agent Toolbox</h2>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {Object.values(agentData).map((agent) => {
                    const Icon = agent.icon;
                    const isActive = activeAgentId === agent.id;
                    return (
                      <button
                        key={agent.id}
                        onClick={() => handleAgentSelect(agent.id)}
                        className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                          isActive 
                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-100' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                        }`}
                      >
                        <Icon size={28} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                        <span className="text-sm font-semibold text-center leading-tight">{agent.title.replace('Project ', '').replace(' Analysis', '').replace(' Report', '').replace(' Results', '')}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Input Section */}
                <AnimatePresence mode="wait">
                  {activeAgent && !isGenerating && !results && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                    >
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {activeAgent.label}
                      </label>
                      <div className="relative max-w-md">
                        <select
                          value={selectedValue}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-3 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow cursor-pointer font-medium"
                        >
                          <option value="">Select an option...</option>
                          {activeAgent.options.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Loading State */}
                <AnimatePresence>
                  {isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-16 flex flex-col items-center justify-center text-center"
                    >
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-blue-600 text-white p-4 rounded-full shadow-lg">
                          <Sparkles size={32} className="animate-pulse" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">AI is analyzing data...</h3>
                      <p className="text-slate-500">Synthesizing insights for {selectedValue}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Results Section */}
                <AnimatePresence>
                  {results && !isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8 mt-8 pt-8 border-t border-slate-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <results.icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{results.title}</h3>
                            <p className="text-sm text-slate-500">Analysis for {selectedValue}</p>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                          <Clock size={14} />
                          Generated {results.generatedAt.toLocaleTimeString()}
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                        <div className="flex items-center gap-2 mb-4 text-indigo-900">
                          <Sparkles size={18} className="text-indigo-600" />
                          <h4 className="font-bold">AI Reasoning & Insights</h4>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {results.insights.map((insight: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700">
                              <CheckCircle2 size={18} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{insight}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-white rounded-lg p-4 border border-indigo-100 shadow-sm flex items-start gap-3">
                          <div className="bg-indigo-100 text-indigo-700 p-1.5 rounded-md mt-0.5">
                            <ArrowRight size={16} />
                          </div>
                          <div>
                            <span className="font-semibold text-indigo-900 block mb-1">Recommendation</span>
                            <span className="text-slate-700">{results.recommendation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {results.metrics.map((m: any, idx: number) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{m.label}</div>
                            <div className="flex items-baseline gap-1 mb-3">
                              <span className="text-3xl font-bold text-slate-800">{m.value}</span>
                              <span className="text-sm font-medium text-slate-500">{m.unit}</span>
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-semibold ${
                              m.trend === 'up' ? 'text-emerald-600' : 
                              m.trend === 'down' ? 'text-red-600' : 'text-slate-500'
                            }`}>
                              {m.trend === 'up' && <ArrowUpRight size={14} />}
                              {m.trend === 'down' && <ArrowDownRight size={14} />}
                              {m.trend === 'neutral' && <ArrowRight size={14} />}
                              {m.trendValue} from last period
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Table */}
                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200">
                                {results.tableHeaders.map((h: string, idx: number) => (
                                  <th key={idx} className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {results.tableData.map((row: string[], rowIdx: number) => (
                                <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                                  {row.map((cell: string, cellIdx: number) => (
                                    <td key={cellIdx} className="py-3 px-4 text-sm text-slate-700">
                                      {cellIdx > 1 && /good|high|critical|medium|done|delayed|track/i.test(cell) ? (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClasses(cell)}`}>
                                          {cell}
                                        </span>
                                      ) : (
                                        <span className="font-medium">{cell}</span>
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Interactive Chatbot Section */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-8">
                        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <MessageSquare size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Ask {activeAgent.title}</h4>
                            <p className="text-xs text-slate-500">Get deeper insights about {selectedValue}</p>
                          </div>
                        </div>
                        
                        <div className="h-80 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-50/50">
                          {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white'
                              }`}>
                                {msg.role === 'user' ? <UserCircle2 size={18} /> : <Bot size={18} />}
                              </div>
                              <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                                msg.role === 'user' 
                                  ? 'bg-blue-600 text-white rounded-tr-none' 
                                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                              }`}>
                                {msg.content}
                              </div>
                            </div>
                          ))}
                          {isChatTyping && (
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                <Bot size={18} />
                              </div>
                              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                            </div>
                          )}
                          <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200">
                          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                            {activeAgent.chatConfig.suggestions.map((suggestion: string, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => handleSendMessage(suggestion)}
                                disabled={isChatTyping}
                                className="whitespace-nowrap px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200 transition-colors disabled:opacity-50"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                          <form 
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(chatInput); }}
                            className="flex gap-2"
                          >
                            <input
                              type="text"
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              placeholder="Ask a question about this data..."
                              disabled={isChatTyping}
                              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
                            />
                            <button
                              type="submit"
                              disabled={!chatInput.trim() || isChatTyping}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Send size={18} />
                            </button>
                          </form>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavLink({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}>
      <Icon size={18} className={active ? 'text-blue-600' : 'text-slate-400'} />
      {label}
    </a>
  );
}

function SidebarItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}>
      <Icon size={18} className={active ? 'text-blue-600' : 'text-slate-400'} />
      {label}
    </a>
  );
}
