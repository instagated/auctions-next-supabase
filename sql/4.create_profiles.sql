create table profiles (
    id bigint generated by default as identity primary key,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Update updated_at field each time the record is updated
create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at before update on profiles
  for each row execute procedure moddatetime (updated_at);

-- Set row level security
alter table profiles enable row level security;

create policy "Users can insert their own profile." on profiles for
    insert with check ( auth.uid() = user_id );

create policy "Users can update their own profiles." on profiles for
    update using (auth.uid() = user_id);

-- create policy "Profiles are public." on profiles for
--     select using (true);
