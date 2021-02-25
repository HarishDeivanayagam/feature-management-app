export const getToken = () => {
    let token = localStorage.getItem('auth');
    return {
        authorization: `Bearer ${token}`
    }
}

export const deleteTokens = () => {
    localStorage.clear();
}