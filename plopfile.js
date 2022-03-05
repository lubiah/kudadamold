"use strict";
export default function(plop){
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
            }
        ],
        actions: [
            {
                type: "add",
                
            }
        ]
    })

}