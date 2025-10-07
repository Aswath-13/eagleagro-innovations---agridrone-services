import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type Enquiry = {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  message: string;
  date: string;
};

const SHEET_ID = 'YOUR_SHEET_ID'; // <<-- put your Google Spreadsheet ID here
const SHEET_NAME = 'neyan enquiry'; // your tab name (exact)
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
  SHEET_NAME
)}`;
const SHEET_OPEN_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

const Admin: React.FC = () => {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Fetch & parse Google "gviz" JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(GVIZ_URL, { cache: 'no-store' });
        const text = await res.text();

        // gviz wraps JSON like: /*O_o*/google.visualization.Query.setResponse({...});
        const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf(')'));
        const gviz = JSON.parse(jsonStr);

        const parsed: Enquiry[] =
          (gviz?.table?.rows ?? [])
            .map((r: any) => (r?.c ?? []).map((c: any) => (c ? c.v : '')))
            .map((cells: any[]) => ({
              name: String(cells[0] ?? ''),
              email: String(cells[1] ?? ''),
              company: String(cells[2] ?? ''),
              inquiryType: String(cells[3] ?? ''),
              message: String(cells[4] ?? ''),
              date: String(cells[5] ?? ''),
            }))
            // If the first row is a header (e.g., "Name","Email"...), skip it
            .filter((r: Enquiry, idx: number, arr: Enquiry[]) => {
              if (idx === 0) {
                const looksHeader =
                  r.name.toLowerCase() === 'name' ||
                  r.email.toLowerCase() === 'email';
                return !looksHeader;
              }
              return true;
            }) ?? [];

        setRows(parsed);
      } catch (e: any) {
        console.error(e);
        setErr('Failed to load enquiries. Check publish settings & Sheet ID.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filters + search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((r) =>
        typeFilter === 'All' ? true : r.inquiryType === typeFilter
      )
      .filter((r) =>
        q
          ? [r.name, r.email, r.company, r.inquiryType, r.message]
              .join(' ')
              .toLowerCase()
              .includes(q)
          : true
      )
      .sort((a, b) => {
        const da = new Date(a.date).getTime() || 0;
        const db = new Date(b.date).getTime() || 0;
        return db - da; // newest first
      });
  }, [rows, query, typeFilter]);

  const uniqueTypes = useMemo(() => {
    const s = new Set<string>();
    rows.forEach((r) => r.inquiryType && s.add(r.inquiryType));
    return ['All', ...Array.from(s)];
  }, [rows]);

  const exportCsv = () => {
    const header = ['Name', 'Email', 'Company', 'Inquiry Type', 'Message', 'Date'];
    const lines = [header, ...filtered.map((r) => [
      r.name, r.email, r.company, r.inquiryType, r.message, r.date
    ])];

    // Minimal CSV escape
    const csv = lines
      .map((row) =>
        row
          .map((cell) => {
            const s = String(cell ?? '');
            const needsQuote = /[",\n]/.test(s);
            const escaped = s.replace(/"/g, '""');
            return needsQuote ? `"${escaped}"` : escaped;
          })
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmails = async () => {
    const emails = filtered.map((r) => r.email).filter(Boolean);
    try {
      await navigator.clipboard.writeText(emails.join(', '));
      alert('Emails copied to clipboard.');
    } catch {
      alert('Copy failed. Select and copy manually:\n' + emails.join(', '));
    }
  };

  return (
    <section id="admin" className="py-16 md:py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="mb-6 flex items-center justify-between gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-light-text">
              Enquiries Admin
            </h1>
            <p className="text-light-text-secondary mt-1">
              Source:&nbsp;
              <a
                href={SHEET_OPEN_URL}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Open Google Sheet
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300"
            >
              Refresh
            </button>
            <button
              onClick={exportCsv}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
            >
              Export CSV
            </button>
            <button
              onClick={copyEmails}
              className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
            >
              Copy Emails
            </button>
          </div>
        </motion.div>

        <div className="mb-4 flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search name, email, company, message…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-md"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-md bg-white"
          >
            {uniqueTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-light-text-secondary">Loading enquiries…</p>
        )}
        {err && (
          <p className="text-red-600">{err}</p>
        )}

        {!loading && !err && (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-light-text-secondary">
                      No enquiries found.
                    </td>
                  </tr>
                )}
                {filtered.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3 break-all">
                      {r.email ? (
                        <a href={`mailto:${r.email}`} className="text-blue-600 underline">{r.email}</a>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3">{r.company || '—'}</td>
                    <td className="px-4 py-3">{r.inquiryType || '—'}</td>
                    <td className="px-4 py-3 max-w-xl whitespace-pre-wrap">{r.message}</td>
                    <td className="px-4 py-3">
                      {r.date ? new Date(r.date).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !err && (
          <p className="text-xs text-light-text-secondary mt-3">
            Showing {filtered.length} of {rows.length} enquiries.
          </p>
        )}
      </div>
    </section>
  );
};

export default Admin;
