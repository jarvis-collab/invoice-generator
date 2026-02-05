'use client';

import { InvoiceData } from '@/app/page';

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  setInvoiceData: (data: InvoiceData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function InvoiceForm({ invoiceData, setInvoiceData, onNext, onBack }: InvoiceFormProps) {
  const updateField = (field: keyof InvoiceData, value: any) => {
    const updated = { ...invoiceData, [field]: value };
    
    // Recalculate totals when items change
    if (field === 'items' || field === 'taxRate') {
      const subtotal = updated.items.reduce((sum, item) => sum + item.amount, 0);
      const taxAmount = subtotal * (updated.taxRate / 100);
      const total = subtotal + taxAmount;
      
      updated.subtotal = subtotal;
      updated.taxAmount = taxAmount;
      updated.total = total;
    }
    
    setInvoiceData(updated);
  };

  const addItem = () => {
    const newItems = [...invoiceData.items, { description: '', quantity: 1, rate: 0, amount: 0 }];
    updateField('items', newItems);
  };

  const removeItem = (index: number) => {
    if (invoiceData.items.length > 1) {
      const newItems = invoiceData.items.filter((_, i) => i !== index);
      updateField('items', newItems);
    }
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Calculate amount for this item
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    updateField('items', newItems);
  };

  const isFormValid = () => {
    return invoiceData.businessName && 
           invoiceData.clientName && 
           invoiceData.invoiceNumber &&
           invoiceData.items.some(item => item.description && item.quantity > 0 && item.rate > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
            <button 
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Business Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Business Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                <input
                  type="text"
                  value={invoiceData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <textarea
                  value={invoiceData.businessAddress}
                  onChange={(e) => updateField('businessAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="123 Business St, City, State 12345"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={invoiceData.businessPhone}
                    onChange={(e) => updateField('businessPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={invoiceData.businessEmail}
                    onChange={(e) => updateField('businessEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@yourcompany.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                <input
                  type="text"
                  value={invoiceData.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Address</label>
                <textarea
                  value={invoiceData.clientAddress}
                  onChange={(e) => updateField('clientAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="456 Client Ave, City, State 67890"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoice Details</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number *</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => updateField('invoiceNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => updateField('invoiceDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Items/Services</h2>
            <button
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add Item
            </button>
          </div>
          
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 border border-gray-200 rounded-lg">
                <div className="md:col-span-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Service or product description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate</label>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="text-lg font-semibold text-gray-900 py-2">
                    ${item.amount.toFixed(2)}
                  </div>
                </div>
                <div className="md:col-span-1">
                  {invoiceData.items.length > 1 && (
                    <button
                      onClick={() => removeItem(index)}
                      className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tax and Total */}
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-gray-600">Tax (%):</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={invoiceData.taxRate}
                      onChange={(e) => updateField('taxRate', Number(e.target.value))}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                      min="0"
                      step="0.01"
                    />
                    <span className="font-semibold">${invoiceData.taxAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h2>
          <textarea
            value={invoiceData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Payment terms, thank you message, or other notes..."
          />
        </div>

        {/* Continue Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onNext}
            disabled={!isFormValid()}
            className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
              isFormValid() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Preview & Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}