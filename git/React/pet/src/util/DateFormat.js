
export const agoDate = (date, ago) => {
    let agoDate = new Date(date);
    agoDate.setDate(date.getDate() - ago);
    return agoDate.toISOString().substring(0,10);
};