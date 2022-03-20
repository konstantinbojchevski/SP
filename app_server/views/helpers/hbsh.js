const hbs = require("hbs");

hbs.registerHelper("calcAge", (dateString) => {
    const date = new Date(dateString);
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    const currentTime = new Date();
    const cd = currentTime.getDate();
    const cm = currentTime.getMonth();
    const cy = currentTime.getFullYear();

    let god = cy - y;

    if(cm > m)
        god++;
    else if(cm === m)
        if(cd >= d)
            god++;

    return god;
});

hbs.registerHelper("dateFormat", (dateString) => {
    const date = new Date(dateString);
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return `${d}. ${m}. ${y}`;
});

hbs.registerHelper('dateForm', (dateString) => {
    const date = new Date(dateString);
    let d = date.getDate();
    let m = date.getMonth() + 1;
    if(m < 10) {
        m = "0" + m.toString();
    }
    if(d < 10) {
        d = "0" + d.toString();
    }
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
})

hbs.registerHelper("capital", (breed) => {
    let breedCapital = breed.charAt(0).toUpperCase() + breed.slice(1);;

    return breedCapital;
})

hbs.registerHelper("task", (task) => {
    if(task==1)
        return "All-day care";
    if(task==2)
        return "Walking";
    if(task==3)
        return "Feeding";

})