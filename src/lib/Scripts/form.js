import { invalidate } from "$app/navigation"; 

export const enhance = (form, {done, error}={})=>{
    const handleForm = async event =>{
        event.preventDefault();
        try {
            let request = await fetch(form.action, {
                method: form.method,
                headers: {
                    "accept": "application/json"
                },
                body: new FormData(form)
            });
            if (request.ok){
                done(request,new FormData(form),form);
                invalidate(form.action);
            }

            else {
                error(request,new FormData(form),form)
            }
        } catch (error) {
            error(request,new FormData(form),form)
        }
    }

    form.addEventListener("submit", handleForm);

    return {
        destroy(){
            form.removeEventListener("submit",handleForm);
        }
    }
}