import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const STATUS_OPTIONS = [
  { code: "WORKING", label: "Working", description: "Check in at your assigned location", tone: "green", icon: "W" },
  { code: "OFF", label: "Not Working", description: "Rest day or scheduled off day", tone: "slate", icon: "O" },
  { code: "EL", label: "Emergency Leave", description: "Unplanned urgent leave", tone: "orange", icon: "E" },
  { code: "SL", label: "Sick Leave", description: "Unable to work due to illness", tone: "red", icon: "S" },
  { code: "AL", label: "Annual Leave", description: "Approved annual leave", tone: "blue", icon: "A" },
  { code: "MC", label: "Medical Certificate", description: "Medical leave with certificate", tone: "purple", icon: "M" },
  { code: "OUTSTATION", label: "Outstation", description: "Working away from your assigned site", tone: "teal", icon: "OS" },
];
const STATUS_LABELS = Object.fromEntries(STATUS_OPTIONS.map((item) => [item.code, item.label]));

function employeeMap(value) {
  if (!value) return null;
  return {
    companyId: value.company_id, employeeId: value.employee_id, name: value.name,
    entity: value.entity, assignedSite: value.assigned_site, radiusMeters: value.radius_meters,
  };
}
function recordMap(value) {
  if (!value) return null;
  return {
    id: value.id, workDate: value.work_date, status: value.status, note: value.note || "",
    checkInAt: value.check_in_at, checkOutAt: value.check_out_at,
    checkInDistanceMeters: value.check_in_distance_meters,
  };
}
function formatTime(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-MY", { timeZone: "Asia/Kuching", hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date(value));
}
function formatDate(value) {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00+08:00`) : value;
  return new Intl.DateTimeFormat("en-MY", { timeZone: "Asia/Kuching", weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(date);
}
function Logo({ compact = false }) {
  return <div className={`logo ${compact ? "logo-compact" : ""}`} aria-label="FTA Staff Attendance">
    <span className="logo-symbol">F</span><span className="logo-word">FTA</span>{!compact && <span className="logo-subtitle">STAFF</span>}
  </div>;
}

function App() {
  const [employee, setEmployee] = useState(undefined);
  const [today, setToday] = useState(null);
  const [history, setHistory] = useState([]);
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [view, setView] = useState("status");
  const [selectedStatus, setSelectedStatus] = useState("WORKING");
  const [note, setNote] = useState("");
  const [actionBusy, setActionBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(new Date());
  const [coordinates, setCoordinates] = useState(null);
  const [locationState, setLocationState] = useState("idle");
  const [locationMessage, setLocationMessage] = useState("Location not verified yet");
  const token = () => localStorage.getItem("fta_session");

  const loadHistory = useCallback(async () => {
    if (!supabase || !token()) return [];
    const { data } = await supabase.rpc("attendance_history", { p_token: token() });
    const rows = Array.isArray(data) ? data.map(recordMap) : [];
    setHistory(rows);
    return rows;
  }, []);

  const refreshSession = useCallback(async () => {
    if (!supabase || !token()) { setEmployee(null); return false; }
    const { data } = await supabase.rpc("get_employee_session", { p_token: token() });
    if (!data?.employee) { localStorage.removeItem("fta_session"); setEmployee(null); return false; }
    setEmployee(employeeMap(data.employee));
    setToday(recordMap(data.today));
    await loadHistory();
    setView(data.today ? "home" : "status");
    return true;
  }, [loadHistory]);

  useEffect(() => { refreshSession(); }, [refreshSession]);
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  const clock = useMemo(() => new Intl.DateTimeFormat("en-MY", { timeZone: "Asia/Kuching", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(now), [now]);

  async function login(event) {
    event.preventDefault();
    if (!supabase) return setLoginError("Supabase is not connected yet. Add the environment variables in Netlify.");
    setLoginBusy(true); setLoginError("");
    const form = new FormData(event.currentTarget);
    const { data, error } = await supabase.rpc("login_employee", {
      p_company_id: form.get("companyId"), p_employee_id: form.get("employeeId"), p_password: form.get("password"),
    });
    if (error || !data?.token) { setLoginError(error?.message || data?.error || "Unable to sign in."); setLoginBusy(false); return; }
    localStorage.setItem("fta_session", data.token);
    setEmployee(employeeMap(data.employee)); setToday(recordMap(data.today));
    await loadHistory(); setView(data.today ? "home" : "status"); setLoginBusy(false);
  }
  async function logout() {
    if (supabase && token()) await supabase.rpc("logout_employee", { p_token: token() });
    localStorage.removeItem("fta_session"); setEmployee(null); setToday(null); setHistory([]); setView("status"); setLocationState("idle");
  }
  async function submitStatus() {
    setActionBusy(true); setMessage("");
    const { data, error } = await supabase.rpc("set_daily_status", { p_token: token(), p_status: selectedStatus, p_note: note });
    if (!error && data?.today) {
      const record = recordMap(data.today); setToday(record);
      setMessage(selectedStatus === "WORKING" ? "Work status selected. Verify your location to check in." : "Your status has been recorded for today.");
      setView("home"); await loadHistory();
    } else setMessage(error?.message || data?.error || "Unable to save your status.");
    setActionBusy(false);
  }
  function getBrowserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("Location services are not supported on this device."));
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy }),
        () => reject(new Error("Please allow location access in your browser settings and try again.")),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
      );
    });
  }
  async function verifyLocation() {
    setLocationState("checking"); setLocationMessage("Checking your current location…");
    try {
      const coords = await getBrowserLocation(); setCoordinates(coords);
      const { data, error } = await supabase.rpc("verify_workplace_location", {
        p_token: token(), p_latitude: coords.latitude, p_longitude: coords.longitude,
      });
      if (!error && data?.allowed) { setLocationState("verified"); setLocationMessage(`Location verified · ${data.distance_meters} m from ${employee.assignedSite}`); }
      else { setLocationState("outside"); setLocationMessage(error?.message || data?.error || "You are outside the approved check-in area."); }
    } catch (error) { setLocationState("error"); setLocationMessage(error.message || "Unable to get your location."); }
  }
  async function attendanceAction(action) {
    setActionBusy(true); setMessage("");
    let coords = coordinates;
    if (!coords) { try { coords = await getBrowserLocation(); } catch { coords = null; } }
    if (!coords) { setMessage("Please allow location access and try again."); setActionBusy(false); return; }
    const { data, error } = await supabase.rpc("record_attendance", {
      p_token: token(), p_action: action === "check-in" ? "CHECK_IN" : "CHECK_OUT",
      p_latitude: coords.latitude, p_longitude: coords.longitude, p_accuracy: coords.accuracy || null,
    });
    if (!error && data?.today) {
      setToday(recordMap(data.today)); setMessage(action === "check-in" ? "Check-in successful." : "Check-out successful. Have a good rest!"); await loadHistory();
    } else { setMessage(error?.message || data?.error || "Unable to update your attendance."); if (data?.outside) setLocationState("outside"); }
    setActionBusy(false);
  }

  if (employee === undefined) return <main className="loading-screen"><Logo /><span className="spinner" /><p>Loading staff portal…</p></main>;
  if (!employee) return <main className="login-screen">
    <div className="login-box"><Logo /><h1>Sign in to Your Account</h1><p className="login-lead">Use your staff credentials to continue.</p>
      <form onSubmit={login}>
        <label htmlFor="companyId">Company ID</label><input id="companyId" name="companyId" placeholder="e.g. FTA" required />
        <label htmlFor="employeeId">Employee ID</label><input id="employeeId" name="employeeId" placeholder="Enter Employee ID" required />
        <label htmlFor="password">Password</label><input id="password" name="password" type="password" placeholder="Enter Password" required />
        <label className="remember-row"><input type="checkbox" name="remember" /> Remember me</label>
        {loginError && <p className="form-error" role="alert">{loginError}</p>}
        <button className="primary-button" type="submit" disabled={loginBusy}>{loginBusy ? "Signing in…" : "Login"}</button>
      </form>
      <button className="forgot-button" type="button">Forgot Password?</button>
      <div className="demo-note"><strong>Demo access</strong><span>FTA · FTA0001 · FTA2026</span></div>
    </div><p className="powered-by">Powered by <strong>FTA Digital</strong></p>
  </main>;

  return <main className="app-shell">
    <header className="topbar"><Logo compact /><div className="employee-chip">
      <span className="avatar">{employee.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
      <span><strong>{employee.name}</strong><small>{employee.employeeId} · {employee.entity}</small></span>
      <button onClick={logout}>Sign out</button>
    </div></header>
    <nav className="tabbar"><button className={view === "home" || view === "status" ? "active" : ""} onClick={() => setView(today ? "home" : "status")}><span>⌂</span>Home</button><button className={view === "history" ? "active" : ""} onClick={() => setView("history")}><span>▤</span>History</button></nav>
    <div className="content-wrap">
      {view === "status" && <section className="status-section">
        <div className="section-heading"><span className="date-pill">{formatDate(now)}</span><h1>What is your work status today?</h1><p>Select one option before proceeding to attendance.</p></div>
        <div className="status-grid">{STATUS_OPTIONS.map((option) => <button key={option.code} className={`status-card ${selectedStatus === option.code ? "selected" : ""}`} onClick={() => setSelectedStatus(option.code)}>
          <span className={`status-icon ${option.tone}`}>{option.icon}</span><span><strong>{option.label}</strong><small>{option.description}</small></span><span className="radio-dot" />
        </button>)}</div>
        {selectedStatus !== "WORKING" && <label className="note-field">Note or reason (optional)<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a short note for HR" /></label>}
        <button className="primary-button continue-button" onClick={submitStatus} disabled={actionBusy}>{actionBusy ? "Saving…" : "Continue"}</button>
      </section>}
      {view === "home" && today?.status !== "WORKING" && <section className="nonworking-panel">
        <span className="success-ring">✓</span><p className="date-pill">{formatDate(now)}</p><h1>{STATUS_LABELS[today?.status] || today?.status}</h1><p>Your work status has been recorded for today.</p>
        {today?.note && <div className="recorded-note">“{today.note}”</div>}<button className="secondary-button" onClick={() => { setSelectedStatus(today?.status || "OFF"); setView("status"); }}>Change today&apos;s status</button>
      </section>}
      {view === "home" && today?.status === "WORKING" && <section className="attendance-section">
        <div className="attendance-card"><div className="card-title-row"><div><span className="eyebrow">ATTENDANCE PORTAL</span><h1>Today&apos;s attendance</h1></div><span className={`work-badge ${today.checkOutAt ? "done" : ""}`}>{today.checkOutAt ? "Completed" : "Working"}</span></div>
          <div className="location-panel"><div className={`location-icon ${locationState}`}>◎</div><div><strong>{employee.assignedSite}</strong><span>{locationMessage}</span></div>{!today.checkInAt && <button onClick={verifyLocation} disabled={locationState === "checking"}>{locationState === "checking" ? "Checking…" : "Verify location"}</button>}</div>
          <div className="clock-panel"><strong>{clock}</strong><span>{formatDate(now)}</span></div>
          {!today.checkInAt && <button className="check-button check-in" onClick={() => attendanceAction("check-in")} disabled={actionBusy || locationState !== "verified"}><span>✓</span>{actionBusy ? "Checking in…" : "Check In"}</button>}
          {today.checkInAt && !today.checkOutAt && <button className="check-button check-out" onClick={() => attendanceAction("check-out")} disabled={actionBusy}><span>✓</span>{actionBusy ? "Checking out…" : "Check Out"}</button>}
          {today.checkOutAt && <div className="day-complete">Attendance completed for today</div>}{message && <p className="action-message">{message}</p>}
        </div>
        <div className="time-summary"><article><span>Check In</span><strong>{formatTime(today.checkInAt)}</strong><small>{today.checkInAt ? formatDate(today.workDate) : "Waiting for check-in"}</small></article><article><span>Check Out</span><strong>{formatTime(today.checkOutAt)}</strong><small>{today.checkOutAt ? formatDate(today.workDate) : "Not checked out yet"}</small></article></div>
        {!today.checkInAt && <button className="change-status" onClick={() => setView("status")}>← Change today&apos;s status</button>}
      </section>}
      {view === "history" && <section className="history-section">
        <div className="section-heading left"><span className="eyebrow">MY ATTENDANCE</span><h1>Recent records</h1><p>Your latest work statuses and check-in times.</p></div>
        <div className="history-table-wrap"><table><thead><tr><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th><th>Location</th></tr></thead><tbody>
          {history.length === 0 && <tr><td colSpan="5" className="empty-cell">No attendance records yet.</td></tr>}
          {history.map((record) => <tr key={record.id}><td>{formatDate(record.workDate)}</td><td><span className={`table-status status-${record.status.toLowerCase()}`}>{STATUS_LABELS[record.status] || record.status}</span></td><td>{formatTime(record.checkInAt)}</td><td>{formatTime(record.checkOutAt)}</td><td>{record.checkInDistanceMeters == null ? "—" : `${Math.round(record.checkInDistanceMeters)} m from site`}</td></tr>)}
        </tbody></table></div>
      </section>}
    </div>
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
