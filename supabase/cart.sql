-- Carrinho de compras para visitantes autenticados anonimamente pelo Supabase.
-- Ative Anonymous sign-ins em Authentication > Sign In / Providers antes de usar.

create table if not exists public.cart_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    product_id bigint not null,
    product_name text not null,
    product_description text not null default '',
    product_price numeric(12, 2) not null check (product_price >= 0),
    product_image text,
    quantity integer not null default 1 check (quantity between 1 and 99),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint cart_items_user_product_unique unique (user_id, product_id)
);

create index if not exists cart_items_user_id_idx
    on public.cart_items (user_id);

alter table public.cart_items enable row level security;

grant select, insert, update, delete on public.cart_items to authenticated;

drop policy if exists "Visitors can read their own cart" on public.cart_items;
create policy "Visitors can read their own cart"
    on public.cart_items
    for select
    to authenticated
    using (user_id = (select auth.uid()));

drop policy if exists "Visitors can add items to their own cart" on public.cart_items;
create policy "Visitors can add items to their own cart"
    on public.cart_items
    for insert
    to authenticated
    with check (user_id = (select auth.uid()));

drop policy if exists "Visitors can update their own cart" on public.cart_items;
create policy "Visitors can update their own cart"
    on public.cart_items
    for update
    to authenticated
    using (user_id = (select auth.uid()))
    with check (user_id = (select auth.uid()));

drop policy if exists "Visitors can remove items from their own cart" on public.cart_items;
create policy "Visitors can remove items from their own cart"
    on public.cart_items
    for delete
    to authenticated
    using (user_id = (select auth.uid()));
