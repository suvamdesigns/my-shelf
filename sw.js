const V="shelf-v1",PDF="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(async c=>{await c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"]);await Promise.allSettled([PDF+"pdf.min.js",PDF+"pdf.worker.min.js"].map(u=>c.add(new Request(u,{mode:"cors"}))))}))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const c=res.clone();caches.open(V).then(h=>h.put(r,c))}return res}).catch(()=>r.mode==="navigate"?caches.match("./index.html"):Response.error())))});
