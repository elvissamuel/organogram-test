Question Time App

The home page ought to display all questions but it requires an accesstoken. Hence it checks for an accesstoken before it even sends the request, if there's no accestoken, user is redirected to the register page where they are expected to input their email to get an accesstoken.
I stored the accesstoken in localStorage so I can access it for future api calls for that particular user.
There is a create question page where the user can create new questions with multiple options.
Users can then view all questions on the home page and also delete questions if the so desire.

Stack
Nextjs
Typescript
Tailwind
React Query
Axios
React/Heroicons
Headless React