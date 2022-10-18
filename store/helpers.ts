export const setCookie = (name: string, value: string, hoursToExpire: number) => {
    if (getCookieValue(name)) return;
    const currentDate = new Date();
    const cookieExpirationDate = new Date(currentDate.getTime() + hoursToExpire * 3600 * 1000);
    document.cookie = `${name}=${value}; expires=${cookieExpirationDate}`;
};

export const removeCookie = (name: string) => setCookie(name, "", -1);

export const getCookieValue = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookieValue = cookies.find((cookie) => cookie.startsWith(`${name}=`))?.split("=")[1];
    return cookieValue;
};
