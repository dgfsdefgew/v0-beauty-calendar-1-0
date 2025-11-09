-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create businesses table (multi-tenancy)
create table if not exists public.businesses (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  business_name text not null,
  address text,
  phone text,
  email text,
  website text,
  rfc text,
  logo_url text,
  subscription_status text not null default 'trial' check (subscription_status in ('trial', 'active', 'cancelled', 'expired')),
  subscription_plan text check (subscription_plan in ('monthly', 'yearly', 'lifetime')),
  subscription_amount numeric,
  trial_ends_at timestamp with time zone,
  subscription_started_at timestamp with time zone,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create trial tracking table for fraud detection
create table if not exists public.trial_tracking (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  ip_address text,
  user_agent text,
  trial_started_at timestamp with time zone default now(),
  business_id uuid references public.businesses(id) on delete cascade
);

-- Create user profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text default 'owner' check (role in ('owner', 'admin', 'staff')),
  created_at timestamp with time zone default now()
);

-- Create services table
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  name text not null,
  category text not null,
  description text,
  duration integer not null, -- in minutes
  price numeric not null,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create products table
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  name text not null,
  category text not null,
  description text,
  price numeric not null,
  cost numeric,
  stock integer default 0,
  low_stock_alert integer default 10,
  sku text,
  barcode text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create stylists/staff table
create table if not exists public.stylists (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  name text not null,
  specialties text[] default '{}',
  bio text,
  photo_url text,
  email text,
  phone text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create clients table
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  name text not null,
  email text,
  phone text,
  birthday date,
  notes text,
  total_visits integer default 0,
  total_spent numeric default 0,
  created_at timestamp with time zone default now()
);

-- Create appointments table
create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  client_id uuid references public.clients(id) on delete cascade not null,
  stylist_id uuid references public.stylists(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  status text default 'scheduled' check (status in ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')),
  notes text,
  created_at timestamp with time zone default now()
);

-- Create sales table for POS
create table if not exists public.sales (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  client_id uuid references public.clients(id) on delete set null,
  sale_date timestamp with time zone default now(),
  subtotal numeric not null,
  tax numeric not null,
  total numeric not null,
  payment_method text not null check (payment_method in ('cash', 'credit', 'transferencia')),
  notes text,
  created_at timestamp with time zone default now()
);

-- Create sale items table
create table if not exists public.sale_items (
  id uuid primary key default uuid_generate_v4(),
  sale_id uuid references public.sales(id) on delete cascade not null,
  item_type text not null check (item_type in ('product', 'service')),
  item_id uuid not null, -- references either products or services
  item_name text not null,
  quantity integer not null default 1,
  unit_price numeric not null,
  total_price numeric not null
);

-- Enable Row Level Security on all tables
alter table public.businesses enable row level security;
alter table public.trial_tracking enable row level security;
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.stylists enable row level security;
alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.sales enable row level security;
alter table public.sale_items enable row level security;

-- RLS Policies for businesses
create policy "Users can view their own business"
  on public.businesses for select
  using (owner_id = auth.uid());

create policy "Users can create their own business"
  on public.businesses for insert
  with check (owner_id = auth.uid());

create policy "Users can update their own business"
  on public.businesses for update
  using (owner_id = auth.uid());

-- RLS Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (id = auth.uid());

create policy "Users can create their own profile"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "Users can update their own profile"
  on public.profiles for update
  using (id = auth.uid());

-- RLS Policies for services (scoped to business)
create policy "Users can view services from their business"
  on public.services for select
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can create services for their business"
  on public.services for insert
  with check (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can update services for their business"
  on public.services for update
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can delete services from their business"
  on public.services for delete
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

-- RLS Policies for products (scoped to business)
create policy "Users can view products from their business"
  on public.products for select
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can create products for their business"
  on public.products for insert
  with check (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can update products for their business"
  on public.products for update
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can delete products from their business"
  on public.products for delete
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

-- RLS Policies for stylists (scoped to business)
create policy "Users can view stylists from their business"
  on public.stylists for select
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can create stylists for their business"
  on public.stylists for insert
  with check (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can update stylists for their business"
  on public.stylists for update
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can delete stylists from their business"
  on public.stylists for delete
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

-- RLS Policies for clients (scoped to business)
create policy "Users can view clients from their business"
  on public.clients for select
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can create clients for their business"
  on public.clients for insert
  with check (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can update clients for their business"
  on public.clients for update
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can delete clients from their business"
  on public.clients for delete
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

-- RLS Policies for appointments (scoped to business)
create policy "Users can view appointments from their business"
  on public.appointments for select
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can create appointments for their business"
  on public.appointments for insert
  with check (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can update appointments for their business"
  on public.appointments for update
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can delete appointments from their business"
  on public.appointments for delete
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

-- RLS Policies for sales (scoped to business)
create policy "Users can view sales from their business"
  on public.sales for select
  using (business_id in (select id from public.businesses where owner_id = auth.uid()));

create policy "Users can create sales for their business"
  on public.sales for insert
  with check (business_id in (select id from public.businesses where owner_id = auth.uid()));

-- RLS Policies for sale_items
create policy "Users can view sale_items from their business"
  on public.sale_items for select
  using (sale_id in (select id from public.sales where business_id in (select id from public.businesses where owner_id = auth.uid())));

create policy "Users can create sale_items for their business"
  on public.sale_items for insert
  with check (sale_id in (select id from public.sales where business_id in (select id from public.businesses where owner_id = auth.uid())));

-- Trial tracking policies (public read for fraud detection)
create policy "Anyone can insert trial tracking"
  on public.trial_tracking for insert
  with check (true);

create policy "Users can view their own trial tracking"
  on public.trial_tracking for select
  using (email = (select email from auth.users where id = auth.uid()));

-- Create function to automatically create profile after signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create trigger for businesses updated_at
drop trigger if exists businesses_updated_at on public.businesses;
create trigger businesses_updated_at
  before update on public.businesses
  for each row
  execute function public.handle_updated_at();

-- Create indexes for performance
create index if not exists businesses_owner_id_idx on public.businesses(owner_id);
create index if not exists profiles_business_id_idx on public.profiles(business_id);
create index if not exists services_business_id_idx on public.services(business_id);
create index if not exists products_business_id_idx on public.products(business_id);
create index if not exists stylists_business_id_idx on public.stylists(business_id);
create index if not exists clients_business_id_idx on public.clients(business_id);
create index if not exists appointments_business_id_idx on public.appointments(business_id);
create index if not exists appointments_date_idx on public.appointments(appointment_date);
create index if not exists sales_business_id_idx on public.sales(business_id);
create index if not exists sales_date_idx on public.sales(sale_date);
create index if not exists trial_tracking_email_idx on public.trial_tracking(email);
