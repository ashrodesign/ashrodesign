-- Fires the notify-contact-submission Edge Function on every new lead.
-- Already applied to the live project via the Supabase MCP; kept here for reference.
--
-- Before this works, set these Edge Function secrets in the Supabase
-- Dashboard (Project Settings -> Edge Functions -> Secrets):
--   RESEND_API_KEY       - from your Resend account
--   CONTACT_NOTIFY_SECRET - must match the value stored in Vault below
--   NOTIFY_TO_EMAIL       - optional, defaults to info@ashrodesign.net
--   NOTIFY_FROM_EMAIL     - optional, defaults to onboarding@resend.dev

create extension if not exists pg_net;

-- One-time setup: store the shared secret in Vault (never in this file).
-- select vault.create_secret('<random-value>', 'contact_notify_secret');

create or replace function notify_contact_submission()
returns trigger
language plpgsql
security definer
set search_path = public, net, vault
as $$
declare
  secret_value text;
begin
  select decrypted_secret into secret_value
  from vault.decrypted_secrets
  where name = 'contact_notify_secret';

  perform net.http_post(
    url := 'https://xynurzuamtbnuvsqyhqq.supabase.co/functions/v1/notify-contact-submission',
    body := jsonb_build_object('record', to_jsonb(new)),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', secret_value
    ),
    timeout_milliseconds := 5000
  );
  return new;
end;
$$;

-- Only the trigger may invoke this function -- block direct RPC calls.
revoke execute on function notify_contact_submission() from public, anon, authenticated;

drop trigger if exists on_contact_submission_insert on contact_submissions;

create trigger on_contact_submission_insert
after insert on contact_submissions
for each row
execute function notify_contact_submission();
