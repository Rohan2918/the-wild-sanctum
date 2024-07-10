import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(){
    const { data, error } = await supabase
    .from('cabins')
    .select('*')

    if(error){
        console.log(error);
        throw new Error('Cabins could not be loaded');
        }
        return data;
}

export async function deleteCabin(id){
    const { data,error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

    if(error){
        console.log(error);
        throw new Error('Cabins could not be deleted');
        }
        return data;
}

export async function createEditCabin(newCabin,id)
{
    console.log(newCabin,id)
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",""
    )
    const imagePath =hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1.create/edit Cabin
    let query = supabase.from("cabins");

    // A)create
    if(!id)
    query = query
    .insert([{...newCabin, image:imagePath}])
    
    // B)Edit
    if(id) 
    query = query.update({...newCabin, image:imagePath}).eq('id', id);


    const {data,error} = await query.select()
    .single();

    if(error){
        console.log(error);
        throw new Error('Cabins could not be created');
        }
        

    // 2.Upload Image
    if(hasImagePath) return data;
    const { error:storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

    // 3.Delete cabin if there was an Error uploading image
    if(storageError){
        await supabase.from('cabins').delete().eq('id', data.id);
        console.log(storageError);
        throw new Error('Cabins could not be uploaded and the cabin was not created');
    }

    return data;

}

