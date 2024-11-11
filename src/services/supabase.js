import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://irpntcbyorstbkixcogb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycG50Y2J5b3JzdGJraXhjb2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4OTU3NDcsImV4cCI6MjA0MDQ3MTc0N30.z1d-x8Oe79brMw_JMGJl1BYYouYdv1H9w1Xk2h1cklo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
