
:root {
  --ink: #18231f;
  --muted: #718078;
  --line: #e1e8e4;
  --soft: #f4f7f5;
  --green: #4fb761;
  --green-dark: #258a4c;
  --navy: #122e42;
  --blue: #477cf3;
  --red: #f05252;
}

* { box-sizing: border-box; }
html, body { min-height: 100%; }
body {
  margin: 0;
  background: #f8faf9;
  color: var(--ink);
  font-family: var(--font-geist), Arial, Helvetica, sans-serif;
}
button, input, textarea { font: inherit; }
button { cursor: pointer; }

.loading-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  color: var(--muted);
}
.spinner { width: 30px; height: 30px; border: 3px solid #dfe8e3; border-top-color: var(--green); border-radius: 50%; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.logo { display: flex; align-items: center; justify-content: center; gap: 7px; }
.logo-symbol {
  width: 42px; height: 42px; display: grid; place-items: center;
  border-radius: 10px; color: white; background: linear-gradient(145deg, #2aa357, #84c945);
  font-size: 25px; font-weight: 900; font-style: italic; box-shadow: 0 7px 18px rgba(54, 155, 79, .22);
}
.logo-word { color: #173b56; font-size: 36px; font-weight: 900; letter-spacing: -.08em; }
.logo-subtitle { align-self: flex-end; margin: 0 0 7px 3px; color: var(--green-dark); font-size: 10px; font-weight: 800; letter-spacing: .13em; }
.logo-compact { justify-content: flex-start; }
.logo-compact .logo-symbol { width: 31px; height: 31px; border-radius: 8px; font-size: 19px; }
.logo-compact .logo-word { font-size: 25px; }

.login-screen { min-height: 100vh; padding: 38px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; }
.login-box { width: 100%; max-width: 450px; padding: 40px 42px 32px; border: 1px solid #e3e7e5; background: white; box-shadow: 0 18px 55px rgba(28, 55, 43, .055); }
.login-box h1 { margin: 25px 0 7px; text-align: center; font-size: 22px; font-weight: 500; }
.login-lead { margin: 0 0 25px; color: var(--muted); text-align: center; font-size: 13px; }
.login-box form > label:not(.remember-row) { display: block; margin: 15px 0 6px; color: #506159; font-size: 12px; font-weight: 700; }
.login-box input:not([type="checkbox"]) { width: 100%; height: 46px; padding: 0 13px; border: 1px solid #d6deda; border-radius: 5px; outline: none; background: #fff; }
.login-box input:focus { border-color: var(--green-dark); box-shadow: 0 0 0 3px rgba(79,183,97,.1); }
.remember-row { margin: 18px 0; display: flex; align-items: center; gap: 7px; font-size: 13px; }
.remember-row input { accent-color: var(--green); }
.primary-button { width: 100%; min-height: 46px; border: 0; border-radius: 5px; color: white; background: var(--green); font-weight: 800; transition: background .18s, transform .18s; }
.primary-button:hover { background: var(--green-dark); }
.primary-button:disabled { opacity: .6; cursor: wait; }
.forgot-button { width: 100%; margin: 19px 0 0; border: 0; color: #df3737; background: none; font-size: 12px; }
.form-error { margin: -8px 0 14px; color: #bd3030; font-size: 12px; }
.demo-note { margin-top: 24px; padding: 11px 13px; display: flex; justify-content: space-between; gap: 12px; border-radius: 6px; color: #506159; background: #f4f8f5; font-size: 11px; }
.demo-note span { color: #327c4a; font-weight: 700; }
.powered-by { margin: 16px 0 0; color: #4e5854; font-size: 13px; }.powered-by strong { color: #4380e8; font-weight: 500; }

.app-shell { min-height: 100vh; background: #fafcfb; }
.topbar { height: 60px; padding: 0 clamp(20px, 4vw, 58px); display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); background: white; }
.employee-chip { display: flex; align-items: center; gap: 10px; }
.avatar { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; color: white; background: #7e8c85; font-size: 11px; font-weight: 800; }
.employee-chip > span:nth-child(2) { display: grid; line-height: 1.2; }.employee-chip strong { font-size: 12px; }.employee-chip small { margin-top: 3px; color: var(--muted); font-size: 10px; }
.employee-chip button { margin-left: 8px; border: 0; color: #75847d; background: none; font-size: 11px; }
.tabbar { width: min(670px, calc(100% - 40px)); height: 48px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #dfe5e2; }
.tabbar button { position: relative; border: 0; color: #607067; background: transparent; font-size: 11px; font-weight: 700; }
.tabbar button span { display: block; margin-bottom: 2px; font-size: 16px; }.tabbar button.active { color: var(--blue); }.tabbar button.active::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 3px; background: var(--blue); }
.content-wrap { width: min(880px, calc(100% - 34px)); margin: 28px auto 70px; }

.section-heading { margin: 0 auto 25px; text-align: center; }.section-heading.left { margin-left: 0; text-align: left; }
.section-heading h1 { margin: 10px 0 5px; font-size: 27px; letter-spacing: -.03em; }.section-heading p { margin: 0; color: var(--muted); font-size: 13px; }
.date-pill { display: inline-block; color: var(--green-dark); font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }
.eyebrow { color: var(--green-dark); font-size: 10px; font-weight: 900; letter-spacing: .14em; }
.status-section { max-width: 760px; margin: 0 auto; }
.status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.status-card { min-height: 78px; padding: 13px 15px; display: grid; grid-template-columns: 42px 1fr 18px; gap: 12px; align-items: center; text-align: left; border: 1px solid var(--line); border-radius: 10px; color: var(--ink); background: white; transition: border .16s, box-shadow .16s, transform .16s; }
.status-card:hover { transform: translateY(-1px); box-shadow: 0 7px 20px rgba(27, 53, 42, .06); }.status-card.selected { border-color: var(--green); box-shadow: 0 0 0 3px rgba(79,183,97,.1); }
.status-card > span:nth-child(2) { display: grid; }.status-card strong { font-size: 13px; }.status-card small { margin-top: 4px; color: var(--muted); font-size: 10px; line-height: 1.35; }
.status-icon { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 10px; font-size: 12px; font-weight: 900; }.status-icon.green { color: #248747; background: #e8f7ec; }.status-icon.slate { color: #61716a; background: #edf1ef; }.status-icon.orange { color: #c87523; background: #fff2df; }.status-icon.red { color: #d24545; background: #ffebeb; }.status-icon.blue { color: #356dcf; background: #eaf1ff; }.status-icon.purple { color: #7958c9; background: #f0ebff; }.status-icon.teal { color: #25898a; background: #e5f5f5; }
.radio-dot { width: 17px; height: 17px; border: 2px solid #c7d0cc; border-radius: 50%; }.selected .radio-dot { border: 5px solid var(--green); }
.note-field { margin-top: 16px; display: grid; gap: 7px; color: #53625b; font-size: 12px; font-weight: 700; }.note-field textarea { min-height: 75px; padding: 11px; resize: vertical; border: 1px solid var(--line); border-radius: 8px; outline: none; }.note-field textarea:focus { border-color: var(--green); }
.continue-button { max-width: 300px; margin: 22px auto 0; display: block; }

.attendance-section { max-width: 700px; margin: 0 auto; }
.attendance-card, .time-summary article, .nonworking-panel, .history-table-wrap { border: 1px solid #dfe6e2; border-radius: 8px; background: white; box-shadow: 0 10px 30px rgba(30, 55, 44, .045); }
.attendance-card { padding: 22px 28px 24px; }
.card-title-row { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; }.card-title-row h1 { margin: 5px 0 0; font-size: 20px; }.work-badge { padding: 6px 10px; border-radius: 999px; color: #27894a; background: #e8f7ec; font-size: 10px; font-weight: 800; }.work-badge.done { color: #3765c9; background: #eaf1ff; }
.location-panel { margin-top: 20px; padding: 13px; display: grid; grid-template-columns: 35px 1fr auto; gap: 11px; align-items: center; border: 1px solid var(--line); border-radius: 7px; background: #f9fbfa; }.location-icon { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 8px; color: #728179; background: #ebf0ed; font-size: 20px; }.location-icon.verified { color: #218543; background: #e1f5e7; }.location-icon.outside, .location-icon.error { color: #ce3f3f; background: #fde8e8; }.location-icon.checking { animation: pulse 1s ease infinite; }
@keyframes pulse { 50% { opacity: .45; } }
.location-panel > div:nth-child(2) { display: grid; }.location-panel strong { font-size: 12px; }.location-panel span { margin-top: 3px; color: var(--muted); font-size: 10px; line-height: 1.3; }.location-panel button { min-height: 31px; padding: 0 12px; border: 1px solid #cdd9d3; border-radius: 5px; color: #2e7347; background: white; font-size: 10px; font-weight: 800; }
.clock-panel { margin: 24px 0 15px; padding-top: 20px; display: grid; justify-items: center; border-top: 1px solid var(--line); }.clock-panel strong { color: #515d58; font-size: clamp(35px, 7vw, 46px); letter-spacing: .04em; }.clock-panel span { margin-top: 3px; color: #53615a; font-size: 12px; }
.check-button { width: 72%; min-height: 48px; margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 9px; border: 0; border-radius: 5px; color: white; font-size: 18px; font-weight: 800; }.check-button.check-in { background: var(--green); }.check-button.check-out { background: #ff5157; }.check-button:disabled { opacity: .45; cursor: not-allowed; }.check-button span { font-size: 20px; }
.action-message { margin: 14px 0 0; color: #2f7f48; text-align: center; font-size: 11px; }.day-complete { padding: 13px; border-radius: 5px; color: #315f9e; background: #edf4ff; text-align: center; font-size: 12px; font-weight: 800; }
.time-summary { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }.time-summary article { padding: 18px; display: grid; justify-items: center; }.time-summary span { color: var(--muted); font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; }.time-summary strong { margin: 10px 0 4px; color: #4d5954; font-size: 27px; }.time-summary small { color: var(--muted); font-size: 10px; }
.change-status { margin: 16px auto 0; display: block; border: 0; color: #6b7a73; background: none; font-size: 11px; }

.nonworking-panel { max-width: 530px; margin: 60px auto 0; padding: 45px; text-align: center; }.success-ring { width: 55px; height: 55px; margin: 0 auto 18px; display: grid; place-items: center; border-radius: 50%; color: white; background: var(--green); font-size: 26px; }.nonworking-panel h1 { margin: 12px 0 8px; font-size: 29px; }.nonworking-panel > p:not(.date-pill) { color: var(--muted); font-size: 13px; }.recorded-note { margin: 20px 0; padding: 12px; border-radius: 6px; color: #536159; background: var(--soft); font-size: 12px; }.secondary-button { min-height: 39px; padding: 0 18px; border: 1px solid #cfd8d4; border-radius: 5px; color: #3f6250; background: white; font-size: 11px; font-weight: 800; }

.history-section { max-width: 820px; margin: 0 auto; }.history-table-wrap { overflow: hidden; }.history-table-wrap table { width: 100%; border-collapse: collapse; }.history-table-wrap th, .history-table-wrap td { padding: 14px 16px; border-bottom: 1px solid #edf1ef; text-align: left; font-size: 11px; }.history-table-wrap th { color: #69776f; background: #f7f9f8; font-size: 9px; letter-spacing: .08em; text-transform: uppercase; }.history-table-wrap tr:last-child td { border-bottom: 0; }.table-status { display: inline-block; padding: 5px 8px; border-radius: 999px; color: #327a49; background: #e8f6ec; font-size: 9px; font-weight: 800; }.status-off, .status-el, .status-sl, .status-al, .status-mc { color: #5f6d66; background: #eef2f0; }.empty-cell { padding: 40px !important; color: var(--muted); text-align: center !important; }

@media (max-width: 700px) {
  .login-screen { padding: 0; justify-content: flex-start; }.login-box { max-width: none; min-height: calc(100vh - 45px); padding: 55px 24px 25px; border: 0; box-shadow: none; }.powered-by { margin: auto 0 14px; }
  .topbar { height: 58px; padding: 0 15px; }.employee-chip > span:nth-child(2), .employee-chip button { display: none; }
  .content-wrap { width: calc(100% - 24px); margin-top: 20px; }.status-grid { grid-template-columns: 1fr; }.section-heading h1 { font-size: 23px; }
  .attendance-card { padding: 18px 14px; }.location-panel { grid-template-columns: 34px 1fr; }.location-panel button { grid-column: 1 / -1; min-height: 38px; }.check-button { width: 100%; }.time-summary { grid-template-columns: 1fr; }
  .history-table-wrap { overflow-x: auto; }.history-table-wrap table { min-width: 650px; }.demo-note { display: grid; text-align: center; }
}
