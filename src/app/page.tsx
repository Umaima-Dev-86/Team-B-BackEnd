'use client';
import { useState } from 'react';

export default function EnterpriseERP() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Interactive State Data
  const [products, setProducts] = useState([
    { id: 1, name: 'MacBook Pro 16" M3 Max', sku: 'SKU-MBP16', category: 'Electronics', price: 2499, stock: 18, minStock: 5, status: 'In Stock' },
    { id: 2, name: 'Logitech MX Master 3S', sku: 'SKU-MXM3S', category: 'Accessories', price: 99, stock: 4, minStock: 10, status: 'Low Stock' },
    { id: 3, name: 'Dell UltraSharp 32" 4K', sku: 'SKU-DEL32', category: 'Monitors', price: 850, stock: 12, minStock: 3, status: 'In Stock' },
    { id: 4, name: 'Keychron Q1 Pro Wireless', sku: 'SKU-KCQ1P', category: 'Accessories', price: 199, stock: 0, minStock: 5, status: 'Out of Stock' },
    { id: 5, name: 'Sony WH-1000XM5 ANC', sku: 'SKU-SNYXM5', category: 'Audio', price: 399, stock: 24, minStock: 8, status: 'In Stock' },
    { id: 6, name: 'iPad Pro 12.9" M2 256GB', sku: 'SKU-IPD12', category: 'Electronics', price: 1099, stock: 7, minStock: 4, status: 'In Stock' },
  ]);

  const salesTransactions = [
    { id: 'TXN-9081', customer: 'Ahmad Tech Solutions', items: '3x MacBook Pro 16"', total: '$7,497.00', payment: 'Credit Card', status: 'Completed', date: '2026-10-29' },
    { id: 'TXN-9082', customer: 'Global Creative Studio', items: '2x Dell UltraSharp 32"', total: '$1,700.00', payment: 'Bank Transfer', status: 'Completed', date: '2026-10-28' },
    { id: 'TXN-9083', customer: 'Zara Communications', items: '5x Sony WH-1000XM5', total: '$1,995.00', payment: 'Invoice (Net 30)', status: 'Pending', date: '2026-10-28' },
    { id: 'TXN-9084', customer: 'Syed Hamza Labs', items: '1x Logitech MX Mouse', total: '$99.00', payment: 'Cash', status: 'Completed', date: '2026-10-27' },
    { id: 'TXN-9085', customer: 'Karachi Design Hub', items: '2x Keychron Keyboards', total: '$398.00', payment: 'Credit Card', status: 'Refunded', date: '2026-10-25' },
  ];

  const purchaseOrders = [
    { id: 'PO-4401', supplier: 'Apple Official Distribution', items: '10x MacBook Pro', cost: '$21,000.00', estDelivery: '2026-11-02', status: 'In Transit' },
    { id: 'PO-4402', supplier: 'Logitech Wholesale Asia', items: '50x MX Master Mouse', cost: '$3,200.00', estDelivery: '2026-11-05', status: 'Processing' },
    { id: 'PO-4403', supplier: 'Dell Technologies Global', items: '15x UltraSharp Monitors', cost: '$9,500.00', estDelivery: '2026-10-30', status: 'Delivered' },
  ];

  const handleStockChange = (id: number, delta: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);
        let newStatus = 'In Stock';
        if (newStock === 0) newStatus = 'Out of Stock';
        else if (newStock <= p.minStock) newStatus = 'Low Stock';
        return { ...p, stock: newStock, status: newStatus };
      }
      return p;
    }));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0b0f19' }}>
      
      {/* 1. SIDEBAR */}
      <aside style={{ width: '280px', background: '#111827', borderRight: '1px solid #1f2937', display: 'flex', flexDirection: 'column', padding: '20px 16px', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 24px 8px', borderBottom: '1px solid #1f2937' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>IX</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', background: 'linear-gradient(90deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>InsightX ERP</div>
            <div style={{ fontSize: '11px', color: '#6b7280', letterSpacing: '0.5px' }}>ENTERPRISE SUITE v2.4</div>
          </div>
        </div>

        <nav style={{ margin: '24px 0', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563', padding: '0 12px 8px 12px', letterSpacing: '1px' }}>MODULE NAVIGATION</div>
          {[
            { id: 'products', label: 'Products & Inventory', icon: '📦', count: products.length },
            { id: 'sales', label: 'Sales & POS Ledger', icon: '💰', count: salesTransactions.length },
            { id: 'purchases', label: 'Purchase Orders', icon: '🛒', count: purchaseOrders.length },
            { id: 'reports', label: 'Analytics & Financials', icon: '📊', badge: 'Live' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                marginBottom: '6px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))' : 'transparent',
                color: activeTab === tab.id ? '#60a5fa' : '#9ca3af',
                borderLeft: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '700' : '500',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              {tab.count !== undefined && (
                <span style={{ background: activeTab === tab.id ? '#2563eb' : '#1f2937', color: '#f3f4f6', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span style={{ background: '#059669', color: '#ecfdf5', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ background: '#171e2e', padding: '14px', borderRadius: '12px', border: '1px solid #1f2937' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>U</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f3f4f6' }}>Umaima Naz</div>
              <div style={{ fontSize: '11px', color: '#10b981' }}>● Full Stack Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <header style={{ background: '#111827', borderBottom: '1px solid #1f2937', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', textTransform: 'capitalize' }}>
              {activeTab === 'products' && '📦 Product Catalog & Stock Controller'}
              {activeTab === 'sales' && '💰 Customer Sales & Billing Ledger'}
              {activeTab === 'purchases' && '🛒 Procurement & Purchase Orders'}
              {activeTab === 'reports' && '📊 Executive Financial Summary'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: '#1f2937', color: '#e5e7eb', border: '1px solid #374151', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>⚡ Quick Action</button>
              <button style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>+ Add New Record</button>
            </div>
            <div style={{ height: '24px', width: '1px', background: '#374151' }} />
            <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>Karachi, PK (UTC+5)</div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main style={{ padding: '32px', flex: 1 }}>
          
          {/* ==================== PRODUCTS TAB ==================== */}
          {activeTab === 'products' && (
            <div>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>TOTAL PRODUCT ITEMS</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#60a5fa', marginTop: '6px' }}>{products.length} SKUs</div>
                </div>
                <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>TOTAL INVENTORY VALUATION</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#34d399', marginTop: '6px' }}>${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>CRITICAL LOW STOCK</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#fbbf24', marginTop: '6px' }}>{lowStockCount} Items</div>
                </div>
                <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>SYSTEM HEALTH</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#10b981', marginTop: '6px' }}>100% Operational</div>
                </div>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <input 
                  type="text" 
                  placeholder="🔍 Search SKU or Product Title..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1, padding: '12px 16px', background: '#111827', border: '1px solid #1f2937', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ padding: '12px 16px', background: '#111827', border: '1px solid #1f2937', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="All">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Monitors">Monitors</option>
                  <option value="Audio">Audio</option>
                </select>
              </div>

              {/* Table */}
              <div style={{ background: '#111827', borderRadius: '12px', border: '1px solid #1f2937', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#1f2937', color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '16px' }}>Item & Model</th>
                      <th style={{ padding: '16px' }}>SKU Code</th>
                      <th style={{ padding: '16px' }}>Category</th>
                      <th style={{ padding: '16px' }}>Unit Price</th>
                      <th style={{ padding: '16px' }}>Current Stock</th>
                      <th style={{ padding: '16px' }}>Availability</th>
                      <th style={{ padding: '16px', textAlign: 'right' }}>Adjust Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #1f2937' }}>
                        <td style={{ padding: '16px', fontWeight: '700', color: '#f3f4f6' }}>{p.name}</td>
                        <td style={{ padding: '16px', color: '#6b7280', fontFamily: 'monospace' }}>{p.sku}</td>
                        <td style={{ padding: '16px' }}><span style={{ background: '#1e293b', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', color: '#cbd5e1' }}>{p.category}</span></td>
                        <td style={{ padding: '16px', fontWeight: '600' }}>${p.price.toFixed(2)}</td>
                        <td style={{ padding: '16px', fontWeight: '800', color: p.stock <= p.minStock ? '#fbbf24' : '#e5e7eb' }}>{p.stock} units</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ 
                            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                            background: p.status === 'In Stock' ? 'rgba(16, 185, 129, 0.15)' : p.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: p.status === 'In Stock' ? '#34d399' : p.status === 'Low Stock' ? '#fbbf24' : '#f87171',
                          }}>
                            ● {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button onClick={() => handleStockChange(p.id, -1)} style={{ background: '#374151', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', marginRight: '6px', fontWeight: 'bold' }}>-</button>
                          <button onClick={() => handleStockChange(p.id, 1)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== SALES TAB ==================== */}
          {activeTab === 'sales' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>TOTAL REVENUE (OCTOBER)</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#34d399', marginTop: '6px' }}>$11,689.00</div>
                </div>
                <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>COMPLETED TRANSACTIONS</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#60a5fa', marginTop: '6px' }}>34 Orders</div>
                </div>
                <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>AVERAGE BASKET SIZE</div>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: '#c084fc', marginTop: '6px' }}>$343.79</div>
                </div>
              </div>

              <div style={{ background: '#111827', borderRadius: '12px', border: '1px solid #1f2937', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#1f2937', color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '16px' }}>Transaction ID</th>
                      <th style={{ padding: '16px' }}>Customer Name</th>
                      <th style={{ padding: '16px' }}>Purchased Items</th>
                      <th style={{ padding: '16px' }}>Total Amount</th>
                      <th style={{ padding: '16px' }}>Payment Method</th>
                      <th style={{ padding: '16px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesTransactions.map((s, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #1f2937' }}>
                        <td style={{ padding: '16px', fontWeight: '700', color: '#60a5fa', fontFamily: 'monospace' }}>{s.id}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#f3f4f6' }}>{s.customer}</td>
                        <td style={{ padding: '16px', color: '#9ca3af' }}>{s.items}</td>
                        <td style={{ padding: '16px', fontWeight: '800', color: '#34d399' }}>{s.total}</td>
                        <td style={{ padding: '16px' }}><span style={{ background: '#1f2937', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', color: '#cbd5e1' }}>{s.payment}</span></td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ 
                            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                            background: s.status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : s.status === 'Pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: s.status === 'Completed' ? '#34d399' : s.status === 'Pending' ? '#fbbf24' : '#f87171',
                          }}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== PURCHASES TAB ==================== */}
          {activeTab === 'purchases' && (
            <div>
              <div style={{ background: '#111827', borderRadius: '12px', border: '1px solid #1f2937', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#1f2937', color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '16px' }}>PO Number</th>
                      <th style={{ padding: '16px' }}>Supplier Entity</th>
                      <th style={{ padding: '16px' }}>Items Ordered</th>
                      <th style={{ padding: '16px' }}>Total Cost</th>
                      <th style={{ padding: '16px' }}>Est. Delivery</th>
                      <th style={{ padding: '16px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((po, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #1f2937' }}>
                        <td style={{ padding: '16px', fontWeight: '700', color: '#c084fc', fontFamily: 'monospace' }}>{po.id}</td>
                        <td style={{ padding: '16px', fontWeight: '600', color: '#f3f4f6' }}>{po.supplier}</td>
                        <td style={{ padding: '16px', color: '#9ca3af' }}>{po.items}</td>
                        <td style={{ padding: '16px', fontWeight: '800' }}>{po.cost}</td>
                        <td style={{ padding: '16px', color: '#6b7280' }}>{po.estDelivery}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                            ● {po.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== REPORTS TAB ==================== */}
          {activeTab === 'reports' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#9ca3af' }}>Financial Breakdown Overview</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                        <span>Gross Revenue</span>
                        <span style={{ color: '#34d399', fontWeight: 'bold' }}>$11,689.00</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: '#1f2937', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '75%', height: '100%', background: '#10b981' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                        <span>Procurement Cost</span>
                        <span style={{ color: '#f87171', fontWeight: 'bold' }}>$33,700.00</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: '#1f2937', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '50%', height: '100%', background: '#ef4444' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#9ca3af' }}>Inventory Health Report</h3>
                  <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#cbd5e1' }}>
                    ✔ <b>Total Active Products:</b> {products.length} SKUs<br/>
                    ⚠ <b>Low Stock Warnings:</b> {lowStockCount} Items require restocking<br/>
                    📈 <b>Top Seller:</b> MacBook Pro 16" M3 Max<br/>
                    💼 <b>System Admin:</b> Umaima Naz (Authorized)
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
