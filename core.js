(function (root) {
  var TEXT = {
    en: { invoice: 'Invoice', quote: 'Quote', no: 'No.', date: 'Date', due: 'Due', to: 'Bill to', pay: 'Payment details', desc: 'Description', qty: 'Qty', rate: 'Rate', amount: 'Amount', sub: 'Subtotal', tax: 'Tax', disc: 'Discount', total: 'Total', notes: 'Notes', add: '+ Add line' },
    ar: { invoice: 'فاتورة', quote: 'عرض سعر', no: 'رقم', date: 'التاريخ', due: 'الاستحقاق', to: 'فاتورة إلى', pay: 'بيانات الدفع', desc: 'الوصف', qty: 'الكمية', rate: 'السعر', amount: 'الإجمالي', sub: 'المجموع الفرعي', tax: 'ضريبة', disc: 'خصم', total: 'الإجمالي النهائي', notes: 'ملاحظات', add: '+ إضافة بند' }
  };
  function calc(rows, tax, disc) {
    var sub = rows.reduce(function (s, r) { return s + (+r.q || 0) * (+r.r || 0); }, 0);
    var d = sub * ((+disc || 0) / 100), after = sub - d, t = after * ((+tax || 0) / 100);
    return { sub: round(sub), discount: round(d), tax: round(t), total: round(after + t) };
  }
  function round(n) { return Math.round(n * 100) / 100; }
  function money(n, cur, lang) {
    try { return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { style: 'currency', currency: cur }).format(n); }
    catch (e) { return cur + ' ' + n.toFixed(2); }
  }
  var api = { TEXT: TEXT, calc: calc, money: money };
  if (typeof module !== 'undefined') module.exports = api; else root.InvoiceNow = api;
})(this);
