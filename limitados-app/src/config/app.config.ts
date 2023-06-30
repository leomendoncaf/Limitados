export default function useConfig() {
   const apiBaseUrl =
      process.env["API_BASE_URL"] ??
      // "https://limitados-c50f4155939c.herokuapp.com/api";
      "http://127.0.0.1:3030/api";

   return {
      apiBaseUrl,
   };
}
