'use client';

import { useState } from 'react';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { PricingSection } from '@/components/PricingSection';

export interface InvoiceData {
  // Business Details
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  
  // Client Details
  clientName: string;
  clientAddress: string;
  
  // Invoice Details
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  
  // Items
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  
  // Totals
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  
  // Notes
  notes: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'preview'>('landing');
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    clientName: '',
    clientAddress: '',
    invoiceNumber: '001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    notes: 'Payment due within 30 days'
  });

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional Invoice Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Create beautiful, professional invoices in minutes. No sign-up required. 
              Generate PDF invoices instantly and get paid faster.
            </p>
            <button 
              onClick={() => setCurrentView('form')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Create Your Invoice Now - FREE
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-gray-600">Clean, business-ready invoice designs that make you look professional</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant PDF Export</h3>
              <p className="text-gray-600">Download your invoice as a PDF immediately - no waiting, no hassle</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">No Sign-Up Required</h3>
              <p className="text-gray-600">Start creating invoices immediately. No accounts, no passwords, no forms</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Our Invoice Generator?</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">For Freelancers & Small Businesses</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Get paid faster with professional invoices</li>
                    <li>• Save time with pre-filled templates</li>
                    <li>• No monthly fees or subscription costs</li>
                    <li>• Works on any device - desktop, tablet, mobile</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">Simple & Powerful</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Automatic tax calculations</li>
                    <li>• Multiple line items support</li>
                    <li>• Custom notes and terms</li>
                    <li>• High-quality PDF output</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <PricingSection />

          {/* CTA Section */}
          <div className="text-center bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your First Invoice?</h3>
            <p className="text-gray-600 mb-6">Join thousands of freelancers and small businesses who trust our invoice generator</p>
            <button 
              onClick={() => setCurrentView('form')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Creating - It's Free!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'form') {
    return (
      <InvoiceForm 
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
        onNext={() => setCurrentView('preview')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  return (
    <InvoicePreview 
      invoiceData={invoiceData}
      onBack={() => setCurrentView('form')}
      onEdit={() => setCurrentView('form')}
    />
  );
}