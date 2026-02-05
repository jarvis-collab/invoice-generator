'use client';

import { InvoiceData } from '@/app/page';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  onBack: () => void;
  onEdit: () => void;
}

export function InvoicePreview({ invoiceData, onBack, onEdit }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!invoiceRef.current) return;

    try {
      // Create canvas from the invoice element
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Download the PDF
      pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button 
                onClick={onBack}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border"
              >
                ← Back to Home
              </button>
              <button 
                onClick={onEdit}
                className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-lg border border-blue-200"
              >
                ✏️ Edit Invoice
              </button>
            </div>
            <button
              onClick={generatePDF}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              📄 Download PDF
            </button>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div ref={invoiceRef} className="p-8 bg-white">
            {/* Header */}
            <div className="border-b-2 border-gray-900 pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">INVOICE</h1>
                  <p className="text-lg text-gray-600 mt-2">#{invoiceData.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-900">{invoiceData.businessName}</h2>
                  {invoiceData.businessAddress && (
                    <div className="text-gray-600 mt-2 whitespace-pre-line">
                      {invoiceData.businessAddress}
                    </div>
                  )}
                  <div className="text-gray-600 mt-2">
                    {invoiceData.businessPhone && <div>{invoiceData.businessPhone}</div>}
                    {invoiceData.businessEmail && <div>{invoiceData.businessEmail}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
                <div className="text-gray-700">
                  <div className="font-semibold text-lg">{invoiceData.clientName}</div>
                  {invoiceData.clientAddress && (
                    <div className="mt-2 whitespace-pre-line">{invoiceData.clientAddress}</div>
                  )}
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Invoice Date:</span>
                    <span className="text-gray-900">{formatDate(invoiceData.invoiceDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Due Date:</span>
                    <span className="text-gray-900">{formatDate(invoiceData.dueDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 text-gray-700 font-semibold">Description</th>
                    <th className="text-center py-3 text-gray-700 font-semibold w-20">Qty</th>
                    <th className="text-right py-3 text-gray-700 font-semibold w-24">Rate</th>
                    <th className="text-right py-3 text-gray-700 font-semibold w-24">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 text-gray-900">{item.description}</td>
                      <td className="py-3 text-center text-gray-900">{item.quantity}</td>
                      <td className="py-3 text-right text-gray-900">${item.rate.toFixed(2)}</td>
                      <td className="py-3 text-right text-gray-900 font-semibold">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-gray-900 font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                {invoiceData.taxRate > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">Tax ({invoiceData.taxRate}%):</span>
                    <span className="text-gray-900 font-semibold">${invoiceData.taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-t-2 border-gray-900">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-gray-900">${invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoiceData.notes && (
              <div className="border-t border-gray-300 pt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
                <p className="text-gray-700 whitespace-pre-line">{invoiceData.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center mt-12 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Thank you for your business!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 text-center space-x-4">
          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            📄 Download PDF
          </button>
          <button
            onClick={onEdit}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            ✏️ Edit Invoice
          </button>
        </div>
      </div>
    </div>
  );
}