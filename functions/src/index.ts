import * as functions from "firebase-functions";
import {defineSecret} from "firebase-functions/params";
import axios from 'axios';
const spoonApiKey = defineSecret("Spoonacular_API_Key");

// format of data that is received from api
// type RecipeReturnType = {
//   id: string,
//   title: string,
//   image: string,
//   missingIng: string[]
// }

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// export const helloWorld = functions.https.onCall((request, response) =>{
//   functions.logger.info("Hello logs!", {structuredData: true});
//   return ("Hello from Firebase!");
// });

// export const getApiKey =
//   functions.runWith({enforceAppCheck: false, secrets: [spoonApiKey]})
//       .https.onCall((data, context) =>{
//         if (context.app == undefined) {
//           throw new functions.https.HttpsError(
//               "failed-precondition",
//               "The function must be called from an App Check verified app.");
//         }
//         return spoonApiKey.value();
//       });


// export const getApiKey =
//   functions.runWith({secrets: [spoonApiKey]})
//       .https.onCall((data, context) =>{
//         const apiKey = spoonApiKey.value();
      // });

export const searchRecipes = 
  functions.runWith({secrets: [spoonApiKey]})
      .https.onCall(async (data, context) =>{
        const apiKey = spoonApiKey.value();

        // configuration options for api call
        const options = {
          method: 'GET',
          url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
          params: {
            query: data.query,
          },
          headers: {
            "accept-encoding": "gzip, deflate",
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
          }
        };

        // gets the data and sets recipe state to result
        const result = await axios.request(options);
        const results:[] = result.data.results
        return results;
        
      });