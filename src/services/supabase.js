import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qdprguanxepnwgwpokgf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4MfsmCNdiJhNhUs77gbdmA_2dTquDLU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);