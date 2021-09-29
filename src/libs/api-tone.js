// import Amplify, { Predictions } from "aws-amplify";
// import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";

// try {
//   Amplify.addPluggable(new AmazonAIPredictionsProvider());
// } catch (error) {
//   console.log("Error loading AmazonAIPredictionsProvider");
//   console.log(error);
// }

export const getSentiment = (text, language = "en") => "Neutral";
// Predictions.interpret({
//   text: {
//     source: {
//       text,
//       language, // [ar, hi, ko, zh-TW, ja, zh, de, pt, en, it, fr, es]
//     },
//     type: "SENTIMENT",
//   },
// }).then(
//   ({
//     textInterpretation: {
//       sentiment: { predominant },
//     },
//   }) => predominant // between negative, neutral, positive
// );
