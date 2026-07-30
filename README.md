# FTA Staff Attendance — Netlify + Supabase

This package contains the Netlify version of the FTA employee attendance portal.

## Included

- Employee login using Company ID, Employee ID and password
- Individual employee sessions
- The same interface and workflow as the current ChatGPT-hosted version
- Daily status: Working, Not Working, EL, SL, AL, MC and Outstation
- Optional HR note for non-working statuses
- Separate location verification before check-in
- GPS-validated check-in and check-out
- 300 m workplace boundary for FTA Broodstock, Kuching
- Recent attendance history
- Mobile and desktop layout

## Step 1 — Create the Supabase database

1. Sign in to Supabase and open the project you want to use.
2. Select **SQL Editor**.
3. Open `supabase/setup.sql` from this package.
4. Copy everything into a new query and select **Run**.
5. Go to **Project Settings → API** and copy:
   - Project URL
   - Publishable/anon key

Do not use or expose the Supabase service-role key.

## Step 2 — Upload the project to GitHub

Create a new private GitHub repository and upload all files from this folder.

## Step 3 — Deploy through Netlify

1. Open Netlify.
2. Select **Add new project → Import an existing project**.
3. Connect GitHub and select the repository.
4. Netlify should detect:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Under **Environment variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase publishable/anon key
6. Select **Deploy**.

## Initial login

- Company ID: `FTA`
- Employee ID: `FTA0001`
- Password: `FTA2026`

Change the password before using the system for real attendance.

## Adding another employee

Run this in the Supabase SQL Editor, changing the values as needed:

```sql
insert into public.employees (
  company_id, employee_id, name, entity, password_hash,
  assigned_site, site_latitude, site_longitude, radius_meters
) values (
  'FTA',
  'FTA0002',
  'Employee Name',
  'FTA',
  crypt('TemporaryPassword', gen_salt('bf')),
  'FTA Broodstock, Kuching',
  1.5505203,
  110.377341,
  300
);
```

## Security notes

- Passwords are hashed in Supabase.
- Browser users cannot directly read or edit attendance tables.
- GPS distance is calculated inside the database function, not trusted from the browser.
- HTTPS is required for reliable browser location access; Netlify provides HTTPS automatically.
