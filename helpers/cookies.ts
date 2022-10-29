export const setCookie = (name: string, value: string, hoursToExpire: number) => {
    if (doesCookieExists(name)) return;
    const currentDate = new Date();
    const cookieExpirationDate = new Date(currentDate.getTime() + hoursToExpire * 3600 * 1000);
    document.cookie = `${name}=${value}; Path=/; expires=${cookieExpirationDate}`;
};

export const removeCookie = (name: string) =>
    (document.cookie = `${name}=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`);

export const doesCookieExists = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? true : false;
};
