import { MongoClient } from "mongodb";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_ATLAS_CLUSTER_URI;
const client = new MongoClient(url);


async function generate_embedding(text: string) {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    const embedding = openai.embeddings;
    const result = await embedding.create({ input: text, model: "text-embedding-ada-002" });
    return result.data[0].embedding;    
}


async function doSearch(query: string) {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(process.env.MONGODB_DB_NAME ?? 'govgpt');
  const collection = db.collection(process.env.MONGODB_COLLECTION_NAME || "embeddings");
     

   const res = collection.aggregate([
     {
       $search: {
         index: process.env.MONGODB_INDEX_NAME || "vector_search",
         knnBeta: {
           vector: await generate_embedding(query),
           k: 10,
           path: process.env.MONGODB_FIELD_NAME || "embedding",
         },
       },
     },
     {
       $project: {
         _id: 0,
         loc: 1,
         text: 1,
         score: { $meta: "searchScore" },
       },
     },
   ]);
  
  const array = await res.toArray();


  return array;


}

export default doSearch;