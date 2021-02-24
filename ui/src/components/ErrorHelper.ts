export const getError = (errType:string):string => {
    let myErr:string = "";
    switch(errType) {
        case "required":
            myErr = "This is a required field";
            break;
        case "minLength":
            myErr = "This field requires more characters";
            break;
        case "maxLength":
            myErr = "The text is too long";
            break;
        case "pattern":
            myErr = "Invalid text";
            break;            
        default:
            myErr = errType;
            break;
    }
    return myErr;
}
