import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image.name.startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create/edit cabin
  let query = supabase.from("cabins");
  //CREATE
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);
  //EDIT
  if (id)
    query = query
      .update({ ...cabin, image: imagePath })
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  //upload photo
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  //deleteCabin if error in photo upload
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(storageError.message);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);

    throw new Error(error.message);
  }
  return data;
}

export async function getCabin() {
  let { data, error } = await supabase.from("cabins").select("name");
  if (error) {
    console.error(error);

    throw new Error(error.message);
  }
  return data;
}
