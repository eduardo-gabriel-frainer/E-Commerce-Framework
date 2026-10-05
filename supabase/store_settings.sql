-- Loja: permissões e armazenamento das configurações editadas no painel.

create table if not exists public.store_admins (
    user_id uuid primary key references auth.users (id) on delete cascade,
    created_at timestamptz not null default now()
);

create table if not exists public.store_settings (
    id text primary key check (id = 'default'),
    settings jsonb not null default '{}'::jsonb,
    updated_by uuid references auth.users (id) on delete set null,
    updated_at timestamptz not null default now()
);

alter table public.store_admins enable row level security;
alter table public.store_settings enable row level security;

grant select on public.store_admins to authenticated;
grant select on public.store_settings to anon, authenticated;
grant insert, update on public.store_settings to authenticated;

drop policy if exists "Admins can read their own admin record" on public.store_admins;
create policy "Admins can read their own admin record"
    on public.store_admins
    for select
    to authenticated
    using (user_id = (select auth.uid()));

drop policy if exists "Anyone can read store settings" on public.store_settings;
create policy "Anyone can read store settings"
    on public.store_settings
    for select
    to anon, authenticated
    using (true);

drop policy if exists "Store admins can insert settings" on public.store_settings;
create policy "Store admins can insert settings"
    on public.store_settings
    for insert
    to authenticated
    with check (
        exists (
            select 1
            from public.store_admins
            where user_id = (select auth.uid())
        )
    );

drop policy if exists "Store admins can update settings" on public.store_settings;
create policy "Store admins can update settings"
    on public.store_settings
    for update
    to authenticated
    using (
        exists (
            select 1
            from public.store_admins
            where user_id = (select auth.uid())
        )
    )
    with check (
        exists (
            select 1
            from public.store_admins
            where user_id = (select auth.uid())
        )
    );

-- Depois de criar o usuário em Authentication > Users, substitua o e-mail:
-- insert into public.store_admins (user_id)
-- select id from auth.users where email = 'SEU_EMAIL_DE_ADMIN';
