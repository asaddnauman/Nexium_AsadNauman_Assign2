import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "your-anon-key";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveToSupabase(url: string, summary: string) {
  await supabase.from("summaries").insert([{ url, summary }]);
}
