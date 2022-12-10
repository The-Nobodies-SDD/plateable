import * as functions from "firebase-functions";
import {defineSecret} from "firebase-functions/params";
import axios from "axios";

import admin = require("firebase-admin")
admin.initializeApp();
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


export const getSavedRecipes =
  functions.https.onCall(async (data, context) =>{
    const userEmail:any = context.auth?.token.email;

    const userInfo =
      await admin.firestore().collection("users").doc(userEmail).get();
    const recipes = userInfo.data()?.recipes;

    return Promise.all(recipes.map(async (el:any) => {
      const recipe = await el.get();
      const id = el["_path"].segments[1];
      return {id: id, ...recipe.data()};
    }));
  });

export const getList =
  functions.https.onCall(async (data, context) =>{
    const userEmail:any = context.auth?.token.email;

    const userRef = admin.firestore().collection("users").doc(userEmail);
    const userInfo = await userRef.get();

    if (userInfo && userInfo.exists) {
      const userData:any = userInfo.data();
      return userData[data.type];
    } else {
      userRef.set({
        pantry: [],
        grocery: [],
        recipes: [],
      });
      return;
    }
  });

export const addToList =
  functions.https.onCall(async (data, context) =>{
    const userEmail:any = context.auth?.token.email;

    const userRef = admin.firestore().collection("users").doc(userEmail);
    const userInfo = await userRef.get();
    const userData:any = userInfo.data();
    const newList = userData[data.type];
    newList.push(data.item);
    userRef.set({[data.type]: newList}, {merge: true});
    return;
  });

export const deleteFromList =
  functions.https.onCall(async (data, context) =>{
    const userEmail:any = context.auth?.token.email;

    const userRef = admin.firestore().collection("users").doc(userEmail);
    const userInfo = await userRef.get();
    const userData:any = userInfo.data();
    const newList =
      userData[data.type].filter((el:any) => el.name !== data.name);

    userRef.set({[data.type]: newList}, {merge: true});
    return;
  });

export const saveRecipe =
  functions.https.onCall(async (data, context) =>{
    const userEmail:any = context.auth?.token.email;

    const userRef = admin.firestore().collection("users").doc(userEmail);
    const userInfo = await userRef.get();
    const userData:any = userInfo.data();
    const newList = userData.recipes;

    const recipeRef =
      admin.firestore().collection("recipes").doc(data.info.id.toString());
    const recipesInfo = await recipeRef.get();

    if (!recipesInfo.exists) {
      recipeRef.set({
        ...data.info, id: data.info.id.toString(),
      });
    }

    console.log(data);

    newList.push(`recipes/${data.info.id}`);
    userRef.set({recipes: newList}, {merge: true});
    return;
  });

export const unsaveRecipe =
  functions.https.onCall(async (data, context) =>{
    const userEmail:any = context.auth?.token.email;

    const userRef = admin.firestore().collection("users").doc(userEmail);
    const userInfo = await userRef.get();
    const userData:any = userInfo.data();
    const newList = userData.recipes.filter((el:any) => el.id !== data.id);

    userRef.set({recipes: newList}, {merge: true});
    return;
  });
