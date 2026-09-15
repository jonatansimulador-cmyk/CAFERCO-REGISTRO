/* ============================================================
   Configuración de Supabase — compartida por index.html,
   registro.html y admin.html
   ============================================================ */

const SUPABASE_URL = "https://ghpbblpnngnbethpiega.supabase.co/rest/v1/";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdocGJibHBubmduYmV0aHBpZWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0OTExOTcsImV4cCI6MjEwNTA2NzE5N30.NCQnxK-YC5MJBhcOAx0pkNmqUwCU2R0EWMnX1kCUku0";

const ESTADOS = [
  "EN CONVERSACION",
  "INTERESADO",
  "COTIZACION",
  "CORDINACION DE LA VENTA",
  "SEGIMIENTO",
  "VENTA",
];

const sbHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

async function sbGet(table, query = "") {
  const res = await fetch(`${SUPABASE_URL}${table}${query}`, {
    headers: sbHeaders,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbPost(table, data) {
  const res = await fetch(`${SUPABASE_URL}${table}`, {
    method: "POST",
    headers: { ...sbHeaders, Prefer: "return=representation" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbPatch(table, query, data) {
  const res = await fetch(`${SUPABASE_URL}${table}${query}`, {
    method: "PATCH",
    headers: { ...sbHeaders, Prefer: "return=representation" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbDelete(table, query) {
  const res = await fetch(`${SUPABASE_URL}${table}${query}`, {
    method: "DELETE",
    headers: sbHeaders,
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

function formatSoles(monto) {
  const n = Number(monto) || 0;
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(n);
}

function formatFecha(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("cartera_session") || "null");
  } catch {
    return null;
  }
}

function setSession(obj) {
  localStorage.setItem("cartera_session", JSON.stringify(obj));
}

function clearSession() {
  localStorage.removeItem("cartera_session");
}
