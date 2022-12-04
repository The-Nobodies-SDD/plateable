import * as functions from "firebase-functions";
import {defineSecret} from "firebase-functions/params";
import axios from "axios";
const spoonApiKey = defineSecret("Spoonacular_API_Key");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// export const helloWorld = functions.https.onCall((request, response) =>{
//   functions.logger.info("Hello logs!", {structuredData: true});
//   return ("Hello from Firebase!");
// });

export const searchRecipes =
  functions.runWith({secrets: [spoonApiKey]})
      .https.onCall(async (data, context) =>{
        const apiKey = spoonApiKey.value();
        const host = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
        // configuration options for api call
        const options = {
          method: "GET",
          url: `https://${host}/recipes/complexSearch`,
          params: {
            query: data.query,
          },
          headers: {
            "accept-encoding": "gzip, deflate",
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": host,
          },
        };

        // gets the data and sets recipe state to result
        const result = await axios.request(options);
        const results:[] = result.data.results;
        return results;
      });

export const generateRecipes =
  functions.runWith({secrets: [spoonApiKey]})
      .https.onCall(async (data, context) =>{
        const apiKey = spoonApiKey.value();

        const host = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
        // configures api call
        const options = {
          method: "GET",
          url: `https://${host}/recipes/findByIngredients`,
          params: {
            ingredients: data.ingredients,
            number: "5",
            ignorePantry: "true",
            ranking: "1",
          },
          headers: {
            "accept-encoding": "gzip, deflate",
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": host,
          },
        };

        // gets the data and sets recipe state to result
        const result = await axios.request(options);
        const results:[] = result.data;

        return results;
      });


export const getRecipeDetails =
  functions.runWith({secrets: [spoonApiKey]})
      .https.onCall(async (data, context) =>{
        const apiKey = spoonApiKey.value();

        const host = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

        // configures api call
        const options = {
          method: "GET",
          url: `https://${host}/recipes/${data.id}/information`,
          headers: {
            "accept-encoding": "gzip, deflate",
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": host,
          },
        };

        // gets the data and sets recipe state to result
        const result = await axios.request(options);

        return result.data;
      });
