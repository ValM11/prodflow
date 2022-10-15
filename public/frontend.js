const Site = (siteData) => {
    let siteInfo = `<p>${siteData.name}<br>${siteData.address.street}<br>${siteData.address.city}`;
    return siteInfo;
}

const Lines = (siteData) => {
    // Add condition if exists
    let prodLines = siteData.prodLines;
    let tableHead = Object.keys(prodLines[0]).map((elem) => '<th>'+elem+'</th>').join("");
    let tableContent = "";
    for (let i = 0; i < prodLines.length; i++) {
        let dataLine = Object.values(prodLines[i]).map((elem) => '<td>'+elem+'</td>').join("");
        tableContent += '<tr>'+dataLine+'</tr>';
    };
    let fullTable = '<tr>'+tableHead+'</tr>'+tableContent;
    return fullTable;
}

const formatAllSites = (allSites) => {
    let htmlSites = allSites.map((site) => '<option value="'+site+'">'+site+'</option>').join("");
    htmlSites = '<option disabled selected value> -- select a site -- </option>'+ htmlSites;
    return htmlSites;
};

const formatLinesFromSite = (siteData) => {
    let prodLines = siteData.prodLines;
    let htmlLines = prodLines.map((elem) => '<option value="'+elem.lineId+'">'+elem.lineId+'</option>').join("");
    htmlLines = '<option disabled selected value> -- select a line -- </option>'+ htmlLines;
    console.log(htmlLines);
    return htmlLines;
};

const formatLineToAdd = (url) => {
    htmlpost = '<form action='+url+'  target="_blank" method="POST"><label for="new-line">Line number:</label><input type="text" id="new-line" name="new-line"><input type="submit" value="Submit"></form>';
    let targetpost = document.getElementById("newLine");
    targetpost.innerHTML = htmlpost;
};

const formatLineToUpdate = (url) => {
    htmlup = '<form action='+url+'  target="_blank" method="POST"><label for="line-update">Nb units per mn:</label><input type="text" id="line-update" name="line-update"><input type="submit" value="Submit"></form>';
    let targetup = document.getElementById("nbunit");
    targetup.innerHTML = htmlup;
};

const displayHTML = (html, targetElement) => {
    let targetE = document.getElementById(targetElement);
    console.log(targetE);
    targetE.innerHTML = html;
};


const displayHTML2 = (html, targetElement) => {
    let div1 = document.createElement("div");
    div1.innerHTMl = html;
    let targetE = document.querySelector(targetElement);
    targetE.appendChild(div1);

}


