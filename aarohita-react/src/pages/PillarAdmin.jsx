import React, { useState, useEffect } from 'react';

const DEFAULT_PILLARS = [
  'app-development',
  'web-development',
  'iot-development',
  'ai-ml-projects',
];

export default function PillarAdmin() {
  const [pillar, setPillar] = useState(DEFAULT_PILLARS[0]);
  const [slug, setSlug] = useState('new-article');
  const [html, setHtml] = useState('');
  const [code, setCode] = useState('');
  const [serverUrl, setServerUrl] = useState('http://localhost:5173');
  const [status, setStatus] = useState(null);
  const REQUIRED_PIN = '0960';

  useEffect(() => {
    const saved = localStorage.getItem('pillar-admin-draft');
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setPillar(d.pillar || DEFAULT_PILLARS[0]);
        setSlug(d.slug || 'new-article');
        setHtml(d.html || '');
        setServerUrl(d.serverUrl || 'http://localhost:5173');
      } catch (e) {}
    }
  }, []);

  function saveDraft() {
    // Intentionally do not persist the PIN in localStorage for safety.
    localStorage.setItem('pillar-admin-draft', JSON.stringify({ pillar, slug, html, serverUrl }));
    setStatus({ ok: true, msg: 'Draft saved to localStorage.' });
  }

  async function publish() {
    setStatus({ ok: null, msg: 'Publishing...' });
    try {
      const endpoint = (serverUrl || 'http://localhost:4000').replace(/\/$/, '') + '/publish';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pillar, slug, html, code }),
      });
      const j = await res.json();
      if (res.ok) {
        setStatus({ ok: true, msg: j.message || 'Published.' });
      } else {
        setStatus({ ok: false, msg: j.error || 'Publish failed.' });
      }
    } catch (err) {
      setStatus({ ok: false, msg: String(err) });
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-28">
      <h1 className="text-2xl font-bold mb-4">Pillar Editor (Admin)</h1>
      <p className="text-sm text-slate-600 mb-6">Paste your pillar HTML content here and publish to public/pillars/{'{pillar}'} directory on your local machine running the publish server.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <input
                    list="pillars-list"
                    value={pillar}
                    onChange={(e) => setPillar(e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="pillar-slug (e.g. web-development)"
                  />
                  <datalist id="pillars-list">
                    {DEFAULT_PILLARS.map(p => <option key={p} value={p} />)}
                  </datalist>
                  <div className="text-xs text-slate-500 mt-1">Tip: type a new pillar slug to create a pillar folder when you publish, or pick an existing one from the list.</div>
                  <div className="mt-2">
                    <input
                      value={serverUrl}
                      onChange={(e) => setServerUrl(e.target.value)}
                      className="p-2 border rounded w-full"
                      placeholder="Publish server URL (e.g. http://localhost:4000)"
                    />
                    <div className="text-xs text-slate-500 mt-1">Set the publish server URL (where /publish is hosted).</div>
                  </div>
                </div>

                <input value={slug} onChange={(e) => setSlug(e.target.value)} className="p-2 border rounded" placeholder="filename-slug" />

                <div className="flex flex-col">
                  <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="p-2 border rounded mb-2"
                      placeholder="Enter PIN"
                      type="password"
                    />
                    <div className="text-xs text-slate-500 mb-2">
                      {code === '' && 'Enter the PIN to enable publishing.'}
                      {code !== '' && code !== REQUIRED_PIN && 'PIN entered is incorrect.'}
                      {code === REQUIRED_PIN && 'PIN accepted — you can publish.'}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveDraft} className="px-3 py-2 bg-gray-100 rounded">Save draft</button>
                      <button
                        onClick={publish}
                        className={`px-3 py-2 text-white rounded ${code === REQUIRED_PIN ? 'bg-blue-600' : 'bg-slate-300 cursor-not-allowed'}`}
                        disabled={code !== REQUIRED_PIN}
                      >
                        Publish (requires local server)
                      </button>
                    </div>
                </div>
              </div>

      <textarea value={html} onChange={(e) => setHtml(e.target.value)} rows={20} className="w-full p-3 border rounded font-mono text-sm" placeholder="Paste full HTML for the pillar subpage here (including &lt;article&gt; content)"></textarea>

      <div className="mt-4">
        <strong>Preview path:</strong> <span className="font-mono">/pillars/{pillar}/{slug}.html</span>
      </div>

      {status && (
        <div className={`mt-4 p-3 rounded ${status.ok ? 'bg-green-100 text-green-800' : status.ok===false ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {status.msg}
        </div>
      )}

      <div className="mt-8 text-sm text-slate-600">
        <p>Notes:</p>
        <ol className="list-decimal ml-6">
          <li>The publish server must be started locally: <code>npm run publish-server</code> (or <code>node ./scripts/publish-pillar-server.cjs</code>) from the <code>aarohita-react</code> folder.</li>
          <li>The server will write files to <code>public/pillars/{'{pillar}'}</code>. This is intended for local editing and publishing.</li>
          <li>To have a pillar show up in site navigation and the Pillar index, add an entry to <code>src/data/pillars.js</code> with metadata (title, description, pages). You can publish pages first (they'll live under <code>public/pillars/</code>) and then register the pillar in <code>pillars.js</code> later.</li>
        </ol>
      </div>
    </div>
  );
}
