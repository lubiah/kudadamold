"use strict";

export default function(plop){
    const today = new Date(Date.now())
const shortDate = today.toISOString().split("T")[0]
plop.setHelper("date", () => shortDate),
plop.setHelper("ISOStringDate", () => today.toISOString()),

plop.setWelcomeMessage(`
    Kudadam.com 👦
------------------------------------------
My personal website built with SvelteKit & TailwindCSS`);

    plop.setGenerator("blog",{
        description: "Generate a new blog post",
        prompts: [
            {
                type: "input",
                name: "title",
                message: "What is the title of the blog post:",
                validate: function(data){
                    let lengthOfTitle = data.split(" ").length;
                    if (lengthOfTitle < 4)
                        return "The length of the title is too short. Must be greater than four (4) words";
                    return true;
                }
            },
            {
                type: "input",
                name: "description",
                message: "Write a little about the blog post (description)",
                validate: function(data){
                    let lengthOfDescription = data.split(" ").length;
                    if (lengthOfDescription < 7)
                        return "Description must be greater than seven (7) words";
                    return true;
                }
            },
            {
                type: "list",
                name: "category",
                message: "Choose the blog post category",
                choices: [
                    {name: "Programming"},
                    {name: "Web Development"},
                    {name: "Tips And Tricks"},
                    {name: "Personal"}
                ]
            },
            {
                type: "input",
                name: "keywords",
                message: "Keywords (Separate multiple with ',')",
                filter: (data)=>{
                    return data.split(",")
                    .map(keyword=>{
                        return keyword.trim()
                    })
                },

            },
            {
                type: "input",
                name: "slug",
                message: "Enter the slug",
                validate: (slug)=>{
                    if (/^[a-z](-?[a-z])*$/.test(slug))
                        return true
                    return "Slug cannot contain spaces and other foreign characters except '-'"
                }
            },
            {
                type: "confirm",
                name: "confirmed",
                message: "Proceed to create blog post?"
            }
        ],
        actions: [
            {
                type: "add",
                path: "src/routes/blog/_blog/{{lowerCase slug}}/index.md",
                templateFile: "plop-templates/new_blog.hbs"
            }
        ]
    })

}