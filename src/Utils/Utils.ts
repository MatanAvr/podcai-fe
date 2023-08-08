export const isValidEmail = (email:string):boolean =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const isValidEmail2 = (email:string):boolean =>  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

export const addErrorToId = (id:string) => {
    const el = document.getElementById(id)
    if(el){
        el.classList.add('error')
    }
}

export const removeErrorFromId = (id:string) => {
    const el = document.getElementById(id)
    if(el){
        el.classList.remove('error')
    }
}